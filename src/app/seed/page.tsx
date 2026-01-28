/**
 * Database Seed Page - Development Only
 * Made by AMST → https://ataberkdudu.info
 */

'use client';

import { useState } from 'react';

export default function SeedPage() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const seedAdmin = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'admin@example.com',
          password: 'admin123',
          name: 'Admin User'
        })
      });
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult('Error: ' + (error as Error).message);
    }
    setLoading(false);
  };

  const seedSeminar = async () => {
    setLoading(true);
    try {
      // First login to get session
      const response = await fetch('/api/seminars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Örnek Seminer 2026',
          description: 'Bu bir örnek seminerdir. Instagram story üzerinden gelen kullanıcılar için hazırlanmıştır.',
          date: '2026-03-15',
          time: '14:00',
          location: 'Online',
          contactPhone: '05551234567',
          contactWhatsapp: '905551234567',
          maxCapacity: '100'
        })
      });
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult('Error: ' + (error as Error).message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Database Seed (Development)</h1>
        
        <div className="space-y-4">
          <button
            onClick={seedAdmin}
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Create Admin User'}
          </button>

          <button
            onClick={seedSeminar}
            disabled={loading}
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Create Sample Seminar (Requires Login)'}
          </button>
        </div>

        <div className="mt-6 p-4 bg-gray-800 text-green-400 rounded-lg font-mono text-sm">
          <pre>{result || 'Click a button to seed the database'}</pre>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 text-yellow-800 rounded-lg">
          <h3 className="font-bold mb-2">Admin Credentials:</h3>
          <p>Email: admin@example.com</p>
          <p>Password: admin123</p>
        </div>

        <div className="mt-4">
          <a href="/admin/login" className="text-blue-600 hover:underline">
            → Go to Admin Login
          </a>
        </div>
      </div>
    </div>
  );
}
