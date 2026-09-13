import prisma from '../utils/prisma.js';
export const audit = (userId, action, entity, entityId) => prisma.auditLog.create({ data: { userId, action, entity, entityId } });
