const { verifyToken } = require('../utils/jwt');

exports.authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Non authentifié' });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ error: 'Token invalide' });
  }

  req.userId = decoded.userId;
  req.userEmail = decoded.email;
  req.userRole = decoded.role;

  next();
};

exports.requireRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      return res.status(403).json({ error: 'Accès non autorisé' });
    }
    next();
  };
};