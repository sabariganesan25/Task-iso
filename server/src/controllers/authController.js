import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma.js';
import { asyncHandler } from '../utils/asyncHandler.js';
const safeUser = { id: true, fullName: true, email: true, createdAt: true };
const tokenFor = (id) => jwt.sign({ userId: id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
export const register = asyncHandler(async (req, res) => { const existing = await prisma.user.findUnique({ where: { email: req.body.email } }); if (existing) return res.status(409).json({ message: 'An account with this email already exists' }); const password = await bcrypt.hash(req.body.password, 12); const user = await prisma.user.create({ data: { fullName: req.body.fullName, email: req.body.email, password }, select: safeUser }); res.status(201).json({ user, token: tokenFor(user.id) }); });
export const login = asyncHandler(async (req, res) => { const record = await prisma.user.findUnique({ where: { email: req.body.email } }); if (!record || !(await bcrypt.compare(req.body.password, record.password))) return res.status(401).json({ message: 'Invalid email or password' }); const user = { id: record.id, fullName: record.fullName, email: record.email, createdAt: record.createdAt }; res.json({ user, token: tokenFor(user.id) }); });
export const logout = (req, res) => res.status(204).send();
