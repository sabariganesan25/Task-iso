export const notFound = (req, res) => res.status(404).json({ message: 'Route not found' });
export const errorHandler = (err, req, res, _next) => { console.error(err); const status = err.status || 500; res.status(status).json({ message: status === 500 && process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message || 'Internal server error' }); };
