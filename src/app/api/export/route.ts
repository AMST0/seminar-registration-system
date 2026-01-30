/**
 * Excel Export API - All Registrations with Censorship Option
 * Made by AMST → https://ataberkdudu.info
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import * as XLSX from 'xlsx';

// Sansürleme fonksiyonu
function censorText(text: string): string {
  if (!text || text.length < 2) return text;
  
  // İsim için: İlk harf + yıldızlar
  const words = text.split(' ');
  return words.map(word => {
    if (word.length <= 1) return word;
    return word[0] + '*'.repeat(word.length - 1);
  }).join(' ');
}

function censorEmail(email: string): string {
  if (!email) return email;
  const [localPart, domain] = email.split('@');
  if (!domain) return email;
  
  const censoredLocal = localPart.length <= 2 
    ? localPart[0] + '*' 
    : localPart[0] + '*'.repeat(localPart.length - 2) + localPart[localPart.length - 1];
  
  return `${censoredLocal}@${domain}`;
}

function censorPhone(phone: string): string {
  if (!phone) return phone;
  // Sadece rakamları al
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 4) return phone;
  
  // Son 4 haneyi göster, gerisini yıldızla
  return '*'.repeat(digits.length - 4) + digits.slice(-4);
}

export async function GET(request: NextRequest) {
  try {
    // Auth kontrolü
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const seminarId = searchParams.get('seminarId'); // Belirli seminer için (opsiyonel)
    const censored = searchParams.get('censored') === 'true'; // Sansürlü mü?
    const dateFrom = searchParams.get('dateFrom'); // Başlangıç tarihi (opsiyonel)
    const dateTo = searchParams.get('dateTo'); // Bitiş tarihi (opsiyonel)

    // Query oluştur
    const whereClause: Record<string, unknown> = {};
    
    if (seminarId) {
      whereClause.seminarId = seminarId;
    }

    if (dateFrom || dateTo) {
      whereClause.createdAt = {};
      if (dateFrom) {
        (whereClause.createdAt as Record<string, Date>).gte = new Date(dateFrom);
      }
      if (dateTo) {
        const endDate = new Date(dateTo);
        endDate.setHours(23, 59, 59, 999);
        (whereClause.createdAt as Record<string, Date>).lte = endDate;
      }
    }

    // Kayıtları getir
    const registrations = await prisma.registration.findMany({
      where: whereClause,
      include: {
        seminar: {
          select: {
            title: true,
            date: true,
            time: true,
            location: true,
          }
        }
      },
      orderBy: [
        { seminar: { date: 'desc' } },
        { createdAt: 'desc' }
      ]
    });

    // Excel verisi hazırla
    const excelData = registrations.map((reg, index) => ({
      'No': index + 1,
      'Seminer Adı': reg.seminar.title,
      'Seminer Tarihi': new Date(reg.seminar.date).toLocaleDateString('tr-TR'),
      'Seminer Saati': reg.seminar.time || '-',
      'Konum': reg.seminar.location || '-',
      'Ad Soyad': censored ? censorText(reg.fullName) : reg.fullName,
      'E-posta': censored ? censorEmail(reg.email) : reg.email,
      'Telefon': censored ? censorPhone(reg.phone) : reg.phone,
      'Kayıt Tarihi': new Date(reg.createdAt).toLocaleDateString('tr-TR'),
      'Kayıt Saati': new Date(reg.createdAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      'KVKK Onayı': 'Evet', // Kayıt yapabilmek için KVKK onayı zorunlu
    }));

    // Excel oluştur
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    
    // Sütun genişlikleri
    worksheet['!cols'] = [
      { wch: 5 },   // No
      { wch: 30 },  // Seminer Adı
      { wch: 15 },  // Seminer Tarihi
      { wch: 10 },  // Seminer Saati
      { wch: 25 },  // Konum
      { wch: 25 },  // Ad Soyad
      { wch: 30 },  // E-posta
      { wch: 18 },  // Telefon
      { wch: 15 },  // Kayıt Tarihi
      { wch: 12 },  // Kayıt Saati
      { wch: 12 },  // KVKK Onayı
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Kayıtlar');

    // Buffer'a yaz
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    // Dosya adı oluştur
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const censoredStr = censored ? '_sansurlu' : '';
    const seminarStr = seminarId ? '_tekil' : '_tum_kayitlar';
    const fileName = `seminer_kayitlari${seminarStr}${censoredStr}_${dateStr}.xlsx`;

    // Response döndür
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    });

  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json(
      { error: 'Export işlemi başarısız' },
      { status: 500 }
    );
  }
}
