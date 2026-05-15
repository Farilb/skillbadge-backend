const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Générer un hash de transaction simulé
const randomTx = () => '0x' + Math.random().toString(36).substr(2, 8) + '...' + Math.random().toString(36).substr(2, 4);
const randomBlock = () => 14870000 + Math.floor(Math.random() * 50000);

// Obtenir tous les badges
// exports.getAllBadges = async (req, res) => {
//   try {
//     const badges = await prisma.badge.findMany({
//       include: { badgeType: true }
//     });
//     res.json({ success: true, data: badges });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// Obtenir les types de badges
exports.getBadgeTypes = async (req, res) => {
  try {
    const badgeTypes = await prisma.badgeType.findMany();
    res.json({ success: true, data: badgeTypes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtenir les badges par wallet
exports.getBadgesByWallet = async (req, res) => {
  try {
    const { walletAddress } = req.params;
    
    const badges = await prisma.badge.findMany({
      where: { studentWallet: walletAddress, revoked: false },
      include: { badgeType: true }
    });
    
    res.json({ success: true, data: badges });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Créer un type de badge
exports.createBadgeType = async (req, res) => {
  try {
    const { name, level, org, domain, emoji } = req.body;
    const issuerId = req.userId;

    const newBadgeType = await prisma.badgeType.create({
      data: {
        name,
        level,
        org: org || 'Centre de formation',
        domain: domain || 'general',
        emoji: emoji || '🏅',
        issuerId
      }
    });

    res.status(201).json({ success: true, data: newBadgeType });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Attribuer un badge
exports.assignBadge = async (req, res) => {
  try {
    const { badgeTypeId, student, studentWallet } = req.body;
    const issuerId = req.userId;

    const newBadge = await prisma.badge.create({
      data: {
        badgeTypeId,
        student,
        studentWallet: studentWallet || '0x' + Math.random().toString(36).substr(2, 40),
        tx: randomTx(),
        block: randomBlock(),
        issuerId
      },
      include: { badgeType: true }
    });

    res.status(201).json({ success: true, data: newBadge });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Révoquer un badge
exports.revokeBadge = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await prisma.badge.update({
      where: { id },
      data: { revoked: true }
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un badge
exports.deleteBadge = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.badge.delete({ where: { id } });

    res.json({ success: true, message: 'Badge supprimé' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllBadges = async (req, res) => {
  try {
    console.log('🔍 Récupération des badges...');
    const badges = await prisma.badge.findMany({
      include: { badgeType: true }
    });
    console.log(`📊 ${badges.length} badges trouvés`);
    res.json({ success: true, data: badges });
  } catch (error) {
    console.error('❌ Erreur:', error);
    res.status(500).json({ error: error.message });
  }
};