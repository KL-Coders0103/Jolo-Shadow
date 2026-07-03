import { z } from 'zod';

export const uploadDocumentSchema = z.object({
  body: z.object({
    title: z.string().min(2, "Document title must be at least 2 characters"),
    type: z.enum(['PDF', 'DOCX', 'TXT', 'FAQ', 'SOP']),
    category: z.string().optional(),
    tags: z.union([z.string(), z.array(z.string())]).optional(),
  })
});

export const updateDocumentSchema = z.object({
  body: z.object({
    title: z.string().min(2).optional(),
    category: z.string().optional(),
    status: z.enum(['UPLOADING', 'PROCESSING', 'ACTIVE', 'ARCHIVED', 'FAILED']).optional(),
  })
});

export const searchKnowledgeSchema = z.object({
  body: z.object({
    query: z.string().min(3, "Search query must be at least 3 characters"),
    limit: z.number().int().min(1).max(20).optional().default(5),
  })
});