// Quick seed script using fetch
const seedAdmin = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/admin/seed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@example.com',
        password: 'admin123',
        name: 'Admin User'
      })
    });
    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};

seedAdmin();
