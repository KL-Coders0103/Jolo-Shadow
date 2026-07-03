import { prisma } from '../config/db';
import { KnowledgeService } from './knowledgeService';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy-key');

export class ChatService {
  
  static async createSession(companyId: string, userId: string, title: string) {
    return prisma.chatSession.create({
      data: { companyId, userId, title }
    });
  }

  static async getSessions(userId: string) {
    return prisma.chatSession.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      select: { id: true, title: true, updatedAt: true }
    });
  }

  static async getSessionMessages(sessionId: string, userId: string) {
    const session = await prisma.chatSession.findFirst({
      where: { id: sessionId, userId }
    });
    if (!session) throw new Error("Chat session not found");

    return prisma.chatMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' },
      select: { id: true, role: true, content: true, createdAt: true }
    });
  }

  static async sendMessage(companyId: string, userId: string, sessionId: string, message: string) {
    const session = await prisma.chatSession.findFirst({
      where: { id: sessionId, userId, companyId }
    });
    if (!session) throw new Error("Chat session not found");

    await prisma.chatMessage.create({
      data: { sessionId, role: 'USER', content: message }
    });

    const contextResults: any = await KnowledgeService.semanticSearch(companyId, message, 3);
    const contextText = contextResults.map((r: any) => r.content).join('\n\n---\n\n');

    const history = await prisma.chatMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' },
      take: 10
    });

    const formattedHistory = history
      .filter(msg => msg.role !== 'SYSTEM') 
      .map(msg => ({
        role: msg.role === 'USER' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

    const systemPrompt = `You are a highly intelligent, professional, and secure AI Copilot for this company. 
    You must answer the user's questions relying PRIMARILY on the provided Company Knowledge Context below.
    If the answer cannot be found in the context or standard professional knowledge, politely state that you do not have that specific company information. Do not hallucinate company policies.
    
    COMPANY KNOWLEDGE CONTEXT:
    ${contextText}`;

    // STEP D: Execute AI Call
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: systemPrompt
    });

    const chat = model.startChat({ 
      history: formattedHistory.slice(0, -1) 
    });
    
    const result = await chat.sendMessage(message);
    const aiResponse = result.response.text();

    const savedAiMessage = await prisma.chatMessage.create({
      data: { sessionId, role: 'MODEL', content: aiResponse }
    });

    await prisma.chatSession.update({
      where: { id: sessionId },
      data: { updatedAt: new Date() }
    });

    return savedAiMessage;
  }
}