/**
 * Admin Dashboard Page
 * Made by AMST → https://ataberkdudu.info
 */

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import AdminDashboard from './AdminDashboard';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/admin/login');
  }

  const seminars = await prisma.seminar.findMany({
    include: {
      _count: {
        select: { registrations: true },
      },
      registrations: {
        orderBy: { createdAt: 'desc' },
        take: 5,
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const stats = {
    totalSeminars: seminars.length,
    activeSeminars: seminars.filter(s => s.isActive).length,
    totalRegistrations: seminars.reduce((acc, s) => acc + s._count.registrations, 0),
  };

  return (
    <>
      {/* 
        █████╗ ███╗   ███╗███████╗████████╗
       ██╔══██╗████╗ ████║██╔════╝╚══██╔══╝
       ███████║██╔████╔██║███████╗   ██║
       ██╔══██║██║╚██╔╝██║╚════██║   ██║
       ██║  ██║██║ ╚═╝ ██║███████║   ██║
       ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝   ╚═╝
      */}
      <AdminDashboard seminars={seminars} stats={stats} />
    </>
  );
}
