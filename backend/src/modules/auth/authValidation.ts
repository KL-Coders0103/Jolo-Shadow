import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    firstName: z
      .string()
      .min(2),

    lastName: z
      .string()
      .min(2),

    email: z.email(),

    password: z
      .string()
      .min(8)
      .max(50),

    companyName: z
      .string()
      .min(2),

    industry: z
      .string()
      .min(2),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.email(),

    password: z
      .string()
      .min(8),
  }),
});

export const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken:
      z.string().min(1),
  }),
});

export const verifyEmailSchema = z.object({
  body: z.object({
    token: z.string(),    
  }),
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.email(),
  }), 
});

export const resetPasswordSchema = z.object({
  body: z.object({
    token: z.string(),
      password: z
        .string()
        .min(8),
  }),
});

export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword:
      z.string(),

    newPassword:
      z.string().min(8),
  }),
});