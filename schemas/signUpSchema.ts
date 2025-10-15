import { z } from 'zod';

export const usernameValidationSchema = z
.string()
.min(3, { message: 'Username must be at least 3 characters long' })
.max(20, { message: 'Username must be at most 20 characters long' })
.regex(/^[a-zA-Z0-9_]+$/, 'Username must not contain special characters')

export const signUpSchema = z.object({
    username: usernameValidationSchema,
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }).max(100, { message: 'Password must be no more than 100 characters long'}),
})