import { z } from 'zod';
const nonEmpty = z.string().trim().min(1, 'Required');
const optionalDate = z.string().datetime({ offset: true }).or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date')).optional().nullable();
export const registerSchema = z.object({ fullName: nonEmpty.max(100), email: z.string().email(), password: z.string().min(8, 'Password must be at least 8 characters') });
export const loginSchema = z.object({ email: z.string().email(), password: nonEmpty });
export const projectSchema = z.object({ name: nonEmpty.max(150), description: z.string().trim().max(2000).optional().nullable(), status: z.enum(['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED']).default('NOT_STARTED'), startDate: optionalDate, endDate: optionalDate }).refine((d) => !(d.startDate && d.endDate) || new Date(d.endDate) >= new Date(d.startDate), { message: 'End date must be after start date', path: ['endDate'] });
export const taskSchema = z.object({ name: nonEmpty.max(150), description: z.string().trim().max(2000).optional().nullable(), priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'), status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']).default('PENDING'), dueDate: optionalDate, projectId: nonEmpty });
export const validate = (schema) => (req, res, next) => { const result = schema.safeParse(req.body); if (!result.success) return res.status(400).json({ message: 'Validation failed', errors: result.error.flatten().fieldErrors }); req.body = result.data; next(); };
