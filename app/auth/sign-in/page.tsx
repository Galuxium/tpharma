// app/lib/signin/zodSchemas.ts
import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string()
    .email()
    .messages({
      'zod.email': 'Please enter a valid email address',
    })
    .required('Email is required'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required')
});