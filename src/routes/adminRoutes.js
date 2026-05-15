const express = require('express');
const { authMiddleware, requireRole } = require('../middleware/authMiddleware');
const { 
  approveFormateur, 
  getPendingFormateurs,
  generateApprenantWallet
} = require('../controllers/authController');

const router = express.Router();

// Toutes ces routes nécessitent d'être ADMIN
router.use(authMiddleware, requireRole(['ADMIN']));

router.get('/pending-formateurs', getPendingFormateurs);
router.put('/approve-formateur/:userId', approveFormateur);
router.put('/generate-wallet/:userId', generateApprenantWallet);

module.exports = router;