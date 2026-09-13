import jwt from 'jsonwebtoken';
export const requireAuth = (req, res, next) => { const token = req.headers.authorization?.replace(/^Bearer\s+/i, ''); if (!token) return res.status(401).json({ message: 'Authentication required' }); try { req.userId = jwt.verify(token, process.env.JWT_SECRET).userId; next(); } catch { res.status(401).json({ message: 'Invalid or expired token' }); } };
