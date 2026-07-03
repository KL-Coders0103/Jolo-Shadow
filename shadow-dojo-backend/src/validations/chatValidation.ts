import { z } from 'zod';

export const createSessionSchema = z.object({
  body: z.object({
    title: z.string().min(2, "Title must be at least 2 characters").max(100).optional().default("New Conversation")
  })
});

export const sendMessageSchema = z.object({
  params: z.object({
    sessionId: z.string().uuid("Invalid Session ID")
  }),
  body: z.object({
    message: z.string().min(1, "Message cannot be empty")
  })
});