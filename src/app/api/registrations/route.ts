/**
 * Seminar Registration API
 * Made by AMST → https://ataberkdudu.info
 */

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { isValidEmail, isValidPhone } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, phone, email, seminarId } = body;

    // Validation
    if (!fullName || !phone || !email || !seminarId) {
      return NextResponse.json(
        { error: 'Tüm alanları doldurunuz.' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Geçerli bir email adresi giriniz.' },
        { status: 400 }
      );
    }

    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { error: 'Geçerli bir telefon numarası giriniz.' },
        { status: 400 }
      );
    }

    // Check if seminar exists and is active
    const seminar = await prisma.seminar.findUnique({
      where: { id: seminarId },
      include: { _count: { select: { registrations: true } } },
    });

    if (!seminar) {
      return NextResponse.json(
        { error: 'Seminer bulunamadı.' },
        { status: 404 }
      );
    }

    if (!seminar.isActive) {
      return NextResponse.json(
        { error: 'Bu seminer artık aktif değil.' },
        { status: 400 }
      );
    }

    // Check capacity
    if (seminar.maxCapacity && seminar._count.registrations >= seminar.maxCapacity) {
      return NextResponse.json(
        { error: 'Seminer kapasitesi dolmuştur.' },
        { status: 400 }
      );
    }

    // Check for duplicate registration
    const existingRegistration = await prisma.registration.findUnique({
      where: {
        email_seminarId: {
          email,
          seminarId,
        },
      },
    });

    if (existingRegistration) {
      return NextResponse.json(
        { error: 'Bu email adresi ile zaten kayıt yapılmış.' },
        { status: 400 }
      );
    }

    // Create registration
    const registration = await prisma.registration.create({
      data: {
        fullName,
        phone,
        email,
        seminarId,
        status: 'confirmed',
      },
    });

    // Console log for notification (as per requirements)
    console.log(`📝 Yeni Kayıt: ${fullName} - ${email} - Seminer: ${seminar.title}`);

    return NextResponse.json({
      success: true,
      message: 'Kayıt başarıyla tamamlandı!',
      registration: {
        id: registration.id,
        fullName: registration.fullName,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Bir hata oluştu. Lütfen tekrar deneyiniz.' },
      { status: 500 }
    );
  }
}
