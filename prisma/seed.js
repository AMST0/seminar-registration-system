// Direct database seed using Prisma
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function main() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🌱 Seeding database...');
    
    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    // Create or update admin
    const admin = await prisma.admin.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        email: 'admin@example.com',
        password: hashedPassword,
        name: 'Admin User',
      },
    });
    
    console.log('✅ Admin created:', admin.email);
    
    // Create sample seminar
    const seminar = await prisma.seminar.upsert({
      where: { slug: 'ornek-seminer-2026' },
      update: {},
      create: {
        slug: 'ornek-seminer-2026',
        title: 'Örnek Seminer 2026',
        description: 'Bu bir örnek seminerdir.',
        date: new Date('2026-03-15'),
        time: '14:00',
        location: 'Online',
        contactPhone: '05551234567',
        contactWhatsapp: '905551234567',
        isActive: true,
        maxCapacity: 100,
      },
    });
    
    console.log('✅ Seminar created:', seminar.title);
    console.log('   URL: /s/' + seminar.slug);
    
    console.log('\n🎉 Done!');
    console.log('\n📝 Admin Login:');
    console.log('   Email: admin@example.com');
    console.log('   Password: admin123');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
