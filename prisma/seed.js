const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@skillbadge.bf';
  
  // Vérifier si l'admin existe déjà
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });
  
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('Admin2026', 10);
    
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: 'Administrateur',
        role: 'ADMIN',
        isApproved: true
      }
    });
    
    console.log('✅ Compte administrateur créé');
    console.log('📧 Email: admin@skillbadge.bf');
    console.log('🔑 Mot de passe: Admin2026');
  } else {
    console.log('⚠️ Compte administrateur existe déjà');
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());