import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const BASE_URL = 'http://localhost:3000/api';

// Utils
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const log = (msg, type = 'INFO') => console.log(`[${type}] ${msg}`);

async function runTests() {
  log('Starting Test Scenarios...');
  log('Checking server availability...');

  try {
    const healthCheck = await fetch(`${BASE_URL}/../`); // check home page or just assume
  } catch (e) {
    log('⚠️  Could not connect to server. Make sure "npm run dev" is running!', 'WARNING');
    // We continue, but it will likely fail.
  }

  // --- SETUP ---
  log('Setting up test data...', 'SETUP');

  // Create a test seminar with Capacity 1
  const testSlug = `test-seminar-${Date.now()}`;
  let seminar;

  try {
      seminar = await prisma.seminar.create({
        data: {
          title: 'Test Seminar Capacity',
          slug: testSlug,
          description: 'Automated test seminar',
          date: new Date(Date.now() + 86400000), // Tomorrow
          isActive: true,
          maxCapacity: 1,
          contactEmail: 'test@example.com'
        }
      });
      log(`Created Seminar: ${seminar.title} (${seminar.id})`);
  } catch (e) {
      log(`Setup failed: ${e.message}`, 'CRITICAL');
      return;
  }

  try {
    // --- TEST 1: Valid Registration ---
    log('Test 1: Valid Registration', 'TEST');
    const user1 = {
      fullName: 'Test User 1',
      email: 'user1@test.com',
      phone: '5551234567', // Should match regex (10 digits)
      seminarId: seminar.id
    };

    let res = await fetch(`${BASE_URL}/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user1)
    });

    let data = await res.json();
    if (res.status === 200 && data.success) {
      log('✅ Test 1 Passed: User 1 registered.');
    } else {
      log(`❌ Test 1 Failed: ${JSON.stringify(data)}`, 'ERROR');
    }

    // --- TEST 2: Duplicate Registration ---
    log('Test 2: Duplicate Registration', 'TEST');
    res = await fetch(`${BASE_URL}/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user1)
    });
    data = await res.json();

    // Status 400 expected
    if (res.status === 400 && data.error && data.error.includes('zaten kayıt yapılmış')) {
         log('✅ Test 2 Passed: Duplicate prevented.');
    } else {
         log(`❌ Test 2 Failed: Status ${res.status}, Msg: ${data.error}`, 'ERROR');
    }

    // --- TEST 3: Capacity Limit ---
    log('Test 3: Capacity Limit', 'TEST');
    const user2 = {
      fullName: 'Test User 2',
      email: 'user2@test.com',
      phone: '5559876543',
      seminarId: seminar.id
    };

    res = await fetch(`${BASE_URL}/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user2)
      });
      data = await res.json();

    if (res.status === 400 && data.error && data.error.includes('kapasitesi dolmuştur')) {
        log('✅ Test 3 Passed: Capacity limit enforced.');
    } else {
        log(`❌ Test 3 Failed: Status ${res.status}, Msg: ${data.error}`, 'ERROR');
    }

    // --- TEST 4: Validation (Invalid Phone) ---
    log('Test 4: Invalid Phone', 'TEST');
    const userInvalid = {
        fullName: 'Invalid User',
        email: 'invalid@test.com',
        phone: '123', // Invalid
        seminarId: seminar.id
    };

    res = await fetch(`${BASE_URL}/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInvalid)
    });
    data = await res.json();

    if (res.status === 400 && data.error && data.error.includes('Geçerli bir telefon')) {
        log('✅ Test 4 Passed: Invalid phone rejected.');
    } else {
        log(`❌ Test 4 Failed: Status ${res.status}, Msg: ${data.error}`, 'ERROR');
    }

    // --- TEST 5: Inactive Seminar ---
    log('Test 5: Inactive Seminar', 'TEST');

    // Create inactive seminar
    const inactiveSeminar = await prisma.seminar.create({
        data: {
          title: 'Inactive Test Seminar',
          slug: `inactive-${Date.now()}`,
          date: new Date(),
          isActive: false,
          maxCapacity: 10
        }
    });

    const user3 = {
        fullName: 'Test User 3',
        email: 'user3@test.com',
        phone: '5551112233',
        seminarId: inactiveSeminar.id
    };

    res = await fetch(`${BASE_URL}/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user3)
    });
    data = await res.json();

    if (res.status === 400 && data.error && data.error.includes('aktif değil')) {
        log('✅ Test 5 Passed: Inactive seminar rejected.');
    } else {
        log(`❌ Test 5 Failed: Status ${res.status}, Msg: ${data.error}`, 'ERROR');
    }

    // Clean up inactive seminar
    await prisma.seminar.delete({ where: { id: inactiveSeminar.id } });


  } catch (e) {
    log(`Test Suite Error: ${e.message}`, 'CRITICAL');
    console.error(e);
  } finally {
    // --- CLEANUP ---
    log('Cleaning up...', 'cleanup');
    if (seminar) {
        // Delete registrations first if cascade is not set (Schema says onDelete: Cascade, but safe to check)
        // Actually schema says Cascade.
        await prisma.seminar.delete({ where: { id: seminar.id } });
    }
    await prisma.$disconnect();
    log('Done.');
  }
}

runTests();
