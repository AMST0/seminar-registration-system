import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const BASE_URL = 'http://localhost:3000';

async function runTests() {
  console.log('🚀 Starting Scenario Tests...\n');

  // 1. Check Public Seminar Page
  console.log('1️⃣  Checking Public Seminar Page...');
  try {
    const res = await fetch(`${BASE_URL}/s/ornek-seminer-2026`);
    if (res.status === 200) {
      console.log('✅ Page is accessible (200 OK)');
    } else {
      console.error(`❌ Failed to access page. Status: ${res.status}`);
      process.exit(1);
    }
  } catch (e) {
    console.error('❌ Network error:', e.message);
    process.exit(1);
  }

  // 2. Test Registration (Validation Failures)
  console.log('\n2️⃣  Testing Validation (Negative Cases)...');

  // Case A: Missing Fields
  const resMissing = await fetch(`${BASE_URL}/api/registrations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      seminarId: 'dummy-id', // Will be ignored if valid ID is looked up dynamically or mocked?
      // Actually we need a valid seminar ID.
    })
  });

  if (resMissing.status === 400) {
    console.log('✅ Correctly rejected missing seminarId');
  } else {
    console.warn('⚠️  Unexpected response for missing seminarId:', resMissing.status);
  }

  // We need the seminar ID first.
  const seminar = await prisma.seminar.findFirst({ where: { slug: 'ornek-seminer-2026' } });
  if (!seminar) {
    console.error('❌ Seminar not found in DB!');
    process.exit(1);
  }

  const resVal = await fetch(`${BASE_URL}/api/registrations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      seminarId: seminar.id,
      fullName: '', // Empty
      phone: '',
      email: 'bad-email',
      kvkkAccepted: false
    })
  });

  if (resVal.status !== 200) { // Assuming API returns 400 or 500 on error, or maybe 200 with error field?
    // Let's check response body
    // Wait, if nextjs api throws error, it might be 400 or 500.
    // Let's assume correct behavior is NOT 200 OK for success if it failed?
    // Or if it returns JSON with error.
    console.log(`ℹ️  Validation Request Status: ${resVal.status}`);
    const data = await resVal.json();
    if (data.error) {
      console.log('✅ Correctly rejected invalid data:', data.error);
    } else {
      console.warn('⚠️  Unexpected response for invalid data:', data);
    }
  }

  // 3. Test Registration (Success Case)
  console.log('\n3️⃣  Testing Valid Registration...');
  const testUser = {
    fullName: 'Test User',
    phone: '05551234567',
    email: `test-${Date.now()}@example.com`,
    seminarId: seminar.id,
    kvkkAccepted: true
  };

  const resSuccess = await fetch(`${BASE_URL}/api/registrations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testUser)
  });

  if (resSuccess.ok) {
     const data = await resSuccess.json();
     console.log('✅ Registration API Success:', data);
  } else {
     const text = await resSuccess.text();
     console.error('❌ Registration Failed:', text);
  }

  // 4. Verify in Database
  console.log('\n4️⃣  Verifying Data in Database...');
  const reg = await prisma.registration.findFirst({
    where: { email: testUser.email }
  });

  if (reg) {
    console.log('✅ Record found in DB:', reg.id);
    console.log(`   Name: ${reg.fullName}`);
    console.log(`   Status: ${reg.status}`);
  } else {
    console.error('❌ Record NOT found in DB!');
  }

  console.log('\n🎉 Tests Completed.');
}

runTests()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
