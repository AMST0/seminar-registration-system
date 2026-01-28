/**
 * Seminars API
 * Made by AMST → https://ataberkdudu.info
 */

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { generateUniqueSlug } from '@/lib/utils';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET all seminars (for admin)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const seminars = await prisma.seminar.findMany({
      include: {
        _count: {
          select: { registrations: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ seminars });
  } catch (error) {
    console.error('Get seminars error:', error);
    return NextResponse.json(
      { error: 'Seminerler yüklenirken bir hata oluştu.' },
      { status: 500 }
    );
  }
}

// POST create new seminar
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check active seminar count (max 10)
    const activeSeminarCount = await prisma.seminar.count({
      where: { isActive: true },
    });

    if (activeSeminarCount >= 10) {
      return NextResponse.json(
        { error: 'Maksimum 10 aktif seminer oluşturabilirsiniz.' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const {
      title,
      description,
      date,
      time,
      location,
      backgroundImage,
      contactPhone,
      contactEmail,
      contactWhatsapp,
      maxCapacity,
    } = body;

    if (!title || !date) {
      return NextResponse.json(
        { error: 'Başlık ve tarih zorunludur.' },
        { status: 400 }
      );
    }

    const slug = generateUniqueSlug(title);

    const seminar = await prisma.seminar.create({
      data: {
        slug,
        title,
        description,
        date: new Date(date),
        time,
        location,
        backgroundImage,
        contactPhone,
        contactEmail,
        contactWhatsapp,
        maxCapacity: maxCapacity ? parseInt(maxCapacity) : null,
      },
    });

    console.log(`✨ Yeni Seminer Oluşturuldu: ${title} - URL: /s/${slug}`);

    return NextResponse.json({
      success: true,
      seminar,
    });
  } catch (error) {
    console.error('Create seminar error:', error);
    return NextResponse.json(
      { error: 'Seminer oluşturulurken bir hata oluştu.' },
      { status: 500 }
    );
  }
}
