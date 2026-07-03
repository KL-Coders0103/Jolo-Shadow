import { prisma } from '../config/db';
import { AIService } from './aiService';
import { ChunkingService } from './chunkingService';
import { DocumentType } from '../generated/prisma/client';

const pdfParse = require('pdf-parse');

export class KnowledgeService {
  
  static async processAndStoreDocument(companyId: string, data: { title: string, type: DocumentType, category?: string }, fileBuffer: Buffer) {
    const document = await prisma.knowledgeDocument.create({
      data: {
        companyId,
        title: data.title,
        type: data.type,
        category: data.category,
        status: 'PROCESSING'
      }
    });

    try {
      let rawText = '';
      if (data.type === 'PDF') {
        const pdfData = await pdfParse(fileBuffer);
        rawText = pdfData.text;
      } else if (data.type === 'TXT') {
        rawText = fileBuffer.toString('utf-8');
      } else {
        throw new Error("Unsupported document type for extraction");
      }

      const chunks = ChunkingService.splitText(rawText);

      for (let i = 0; i < chunks.length; i++) {
        const content = chunks[i];
        if (content.trim().length < 10) continue; 

        const embedding = await AIService.generateEmbedding(content);

        await prisma.$executeRaw`
          INSERT INTO "KnowledgeChunk" ("id", "documentId", "content", "chunkIndex", "embedding", "createdAt")
          VALUES (
            gen_random_uuid(), 
            ${document.id}, 
            ${content}, 
            ${i}, 
            ${embedding}::vector, 
            NOW()
          );
        `;
      }

      await prisma.knowledgeDocument.update({
        where: { id: document.id },
        data: { status: 'ACTIVE' }
      });

      return { message: "Document processed and vectorized successfully", documentId: document.id };

    } catch (error) {
      await prisma.knowledgeDocument.update({
        where: { id: document.id },
        data: { status: 'FAILED' }
      });
      throw error;
    }
  }

  static async semanticSearch(companyId: string, query: string, limit = 5) {
    const queryVector = await AIService.generateEmbedding(query);

    const results = await prisma.$queryRaw`
      SELECT 
        kc."content",
        kd."title",
        kd."category",
        1 - (kc."embedding" <=> ${queryVector}::vector) as similarity
      FROM "KnowledgeChunk" kc
      JOIN "KnowledgeDocument" kd ON kc."documentId" = kd."id"
      WHERE kd."companyId" = ${companyId} AND kd."status" = 'ACTIVE'
      ORDER BY kc."embedding" <=> ${queryVector}::vector
      LIMIT ${limit};
    `;

    return results;
  }
}