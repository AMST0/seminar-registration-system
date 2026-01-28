/**
 * Single Seminar API
 * Made by AMST → https://ataberkdudu.info
 */

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface Params {
  params: Promise<{ id: string }>;
}

// GET single seminar
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    
    const seminar = await prisma.seminar.findUnique({
      where: { id },
      include: {
        registrations: {
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: { registrations: true },
        },
      },
    });

    if (!seminar) {
      return NextResponse.json(
        { error: 'Seminer bulunamadı.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ seminar });
  } catch (error) {
    console.error('Get seminar error:', error);
    return NextResponse.json(
      { error: 'Seminer yüklenirken bir hata oluştu.' },
      { status: 500 }
    );
  }
}

// PUT update seminar
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
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
      isActive,
    } = body;

    const seminar = await prisma.seminar.update({
      where: { id },
      data: {
        title,
        description,
        date: date ? new Date(date) : undefined,
        time,
        location,
        backgroundImage,
        contactPhone,
        contactEmail,
        contactWhatsapp,
        maxCapacity: maxCapacity ? parseInt(maxCapacity) : null,
        isActive,
      },
    });

    return NextResponse.json({
      success: true,
      seminar,
    });
  } catch (error) {
    console.error('Update seminar error:', error);
    return NextResponse.json(
      { error: 'Seminer güncellenirken bir hata oluştu.' },
      { status: 500 }
    );
  }
}

// DELETE seminar
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;

    await prisma.seminar.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Seminer silindi.',
    });
  } catch (error) {
    console.error('Delete seminar error:', error);
    return NextResponse.json(
      { error: 'Seminer silinirken bir hata oluştu.' },
      { status: 500 }
    );
  }
}
