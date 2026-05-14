const express = require('express');
const { authMiddleware, requireRole } = require('../middleware/authMiddleware');
const {
  getAllBadges,
  getBadgeTypes,
  getBadgesByWallet,
  createBadgeType,
  assignBadge,
  revokeBadge,
  deleteBadge
} = require('../controllers/badgeController');

const router = express.Router();

// Routes publiques
router.get('/', getAllBadges);
router.get('/types', getBadgeTypes);
router.get('/wallet/:walletAddress', getBadgesByWallet);

// Routes protégées (formateur uniquement)
router.post('/types', authMiddleware, requireRole(['FORMATEUR', 'ADMIN']), createBadgeType);
router.post('/assign', authMiddleware, requireRole(['FORMATEUR', 'ADMIN']), assignBadge);
router.put('/:id/revoke', authMiddleware, requireRole(['FORMATEUR', 'ADMIN']), revokeBadge);
router.delete('/:id', authMiddleware, requireRole(['FORMATEUR', 'ADMIN']), deleteBadge);

module.exports = router;