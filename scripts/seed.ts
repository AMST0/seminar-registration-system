/**
 * Database Seed Script
 * Made by AMST → https://ataberkdudu.info
 * 
 * Run with: npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/seed.ts
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {

  console.log('🌱 Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
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
      description: 'Bu bir örnek seminerdir. Instagram story üzerinden gelen kullanıcılar için hazırlanmıştır.',
      date: new Date('2026-03-15'),
      time: '14:00',
      location: 'Online',
      contactPhone: '05551234567',
      contactWhatsapp: '905551234567',
      isActive: true,
      maxCapacity: 100,
    },
  });

  console.log('✅ Sample seminar created:', seminar.title);
  console.log('   URL: /s/' + seminar.slug);

  console.log('\n🎉 Seeding complete!');
  console.log('\n📝 Admin Login:');
  console.log('   Email: admin@example.com');
  console.log('   Password: admin123');

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
