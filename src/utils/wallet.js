const { ethers } = require('ethers');

// Générer un wallet Ethereum (pour Polygon)
function generateWallet() {
  const wallet = ethers.Wallet.createRandom();
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
    mnemonic: wallet.mnemonic?.phrase
  };
}

// Stocker uniquement l'adresse en base (la clé privée est donnée à l'utilisateur)
function getWalletAddress() {
  const wallet = generateWallet();
  return wallet.address;
}

module.exports = { generateWallet, getWalletAddress };