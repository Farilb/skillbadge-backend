const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');
const { getWalletAddress } = require('../utils/wallet');

const prisma = new PrismaClient();

// Inscription (publique) – en attente de validation
exports.register = async (req, res) => {
  try {
    const { email, password, name, role, institute } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email déjà utilisé' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Générer un wallet pour l'apprenant
    const walletAddress = role === 'APPRENANT' ? getWalletAddress() : null;
    
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || 'APPRENANT',
        institute: role === 'FORMATEUR' ? institute : null,
        walletAddress,
        isApproved: role === 'APPRENANT' ? true : false // Apprenant direct, formateur en attente
      },
      select: { 
        id: true, 
        email: true, 
        name: true, 
        role: true, 
        institute: true,
        walletAddress: true,
        isApproved: true 
      }
    });

    // Si c'est un apprenant, il peut se connecter directement
    if (user.role === 'APPRENANT') {
      const token = generateToken(user.id, user.email, user.role);
      return res.status(201).json({ success: true, data: user, token });
    }

    // Formateur : en attente de validation admin
    res.status(201).json({ 
      success: true, 
      data: user, 
      message: 'Compte créé. En attente de validation par un administrateur.' 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Connexion
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    // Vérifier si le compte est approuvé (pour les formateurs)
    if (user.role === 'FORMATEUR' && !user.isApproved) {
      return res.status(401).json({ error: 'Compte en attente de validation par l\'administrateur' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    const token = generateToken(user.id, user.email, user.role);

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        institute: user.institute,
        walletAddress: user.walletAddress
      },
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ADMIN : Approuver un formateur
exports.approveFormateur = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Vérifier que l'utilisateur actuel est admin
    if (req.userRole !== 'ADMIN') {
      return res.status(403).json({ error: 'Accès non autorisé' });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { isApproved: true },
      select: { id: true, email: true, name: true, role: true, institute: true, isApproved: true }
    });

    res.json({ success: true, data: user, message: 'Formateur approuvé' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ADMIN : Lister les formateurs en attente
exports.getPendingFormateurs = async (req, res) => {
  try {
    if (req.userRole !== 'ADMIN') {
      return res.status(403).json({ error: 'Accès non autorisé' });
    }

    const users = await prisma.user.findMany({
      where: { role: 'FORMATEUR', isApproved: false },
      select: { id: true, email: true, name: true, institute: true, createdAt: true }
    });

    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ADMIN : Générer un wallet pour un apprenant (si besoin)
exports.generateApprenantWallet = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (req.userRole !== 'ADMIN') {
      return res.status(403).json({ error: 'Accès non autorisé' });
    }

    const walletAddress = getWalletAddress();
    
    const user = await prisma.user.update({
      where: { id: userId },
      data: { walletAddress },
      select: { id: true, name: true, email: true, walletAddress: true }
    });

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};