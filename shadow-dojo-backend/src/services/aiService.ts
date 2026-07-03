import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy-key');

export class AIService {
  

  static async generateEmbedding(text: string): Promise<number[]> {
    try {
      const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
      const result = await model.embedContent(text);
      return result.embedding.values; 
    } catch (error) {
      console.error("Embedding generation failed:", error);
      throw new Error("Failed to generate AI embeddings");
    }
  }
}