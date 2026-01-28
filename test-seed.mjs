// Test script
fetch('http://localhost:3000/api/admin/seed', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User'
  })
})
.then(r => r.json())
.then(d => console.log('SUCCESS:', JSON.stringify(d, null, 2)))
.catch(e => console.error('ERROR:', e.message));
