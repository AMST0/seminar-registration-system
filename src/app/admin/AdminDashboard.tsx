/**
 * Admin Dashboard Client Component - Sharp Modern Design
 * Made by AMST → https://ataberkdudu.info
 */

'use client';

import { useState, useRef } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { formatDate } from '@/lib/utils';
import ImageCropper from '@/components/ImageCropper';

interface Seminar {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  date: Date;
  time: string | null;
  location: string | null;
  isActive: boolean;
  backgroundImage: string | null;
  contactPhone: string | null;
  contactEmail: string | null;
  contactWhatsapp: string | null;
  maxCapacity: number | null;
  _count: {
    registrations: number;
  };
  registrations: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    createdAt: Date;
  }[];
}

interface Stats {
  totalSeminars: number;
  activeSeminars: number;
  totalRegistrations: number;
}

interface AdminDashboardProps {
  seminars: Seminar[];
  stats: Stats;
}

export default function AdminDashboard({ seminars: initialSeminars, stats }: AdminDashboardProps) {
  const [seminars, setSeminars] = useState(initialSeminars);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedSeminar, setSelectedSeminar] = useState<Seminar | null>(null);
  const [showRegistrations, setShowRegistrations] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm('Bu semineri silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch('/api/seminars/' + id, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSeminars(seminars.filter(s => s.id !== id));
        router.refresh();
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      const response = await fetch('/api/seminars/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive }),
      });

      if (response.ok) {
        setSeminars(seminars.map(s => 
          s.id === id ? { ...s, isActive: !isActive } : s
        ));
        router.refresh();
      }
    } catch (error) {
      console.error('Toggle error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col">
      {/* Header - Sharp & Mobile Optimized */}
      <header className="bg-stone-900 text-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12 sm:h-14">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-rose-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h1 className="text-xs sm:text-sm font-bold tracking-wide uppercase">Seminer Yönetimi</h1>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 text-[10px] sm:text-xs font-medium text-stone-400 
                         hover:text-white hover:bg-stone-800 transition-colors uppercase tracking-wide"
            >
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden xs:inline">Çıkış</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 w-full">
        {/* Stats - Sharp Cards - Mobile Optimized */}
        <div className="grid grid-cols-3 gap-0.5 sm:gap-1 mb-6 sm:mb-8">
          <div className="bg-white p-3 sm:p-6 border-l-2 sm:border-l-4 border-rose-500">
            <p className="text-[8px] sm:text-[10px] text-stone-400 font-medium uppercase tracking-widest mb-0.5 sm:mb-1">Toplam</p>
            <p className="text-xl sm:text-3xl font-bold text-stone-900">{stats.totalSeminars}</p>
          </div>
          
          <div className="bg-white p-3 sm:p-6 border-l-2 sm:border-l-4 border-amber-500">
            <p className="text-[8px] sm:text-[10px] text-stone-400 font-medium uppercase tracking-widest mb-0.5 sm:mb-1">Aktif</p>
            <p className="text-xl sm:text-3xl font-bold text-stone-900">{stats.activeSeminars}</p>
          </div>
          
          <div className="bg-white p-3 sm:p-6 border-l-2 sm:border-l-4 border-stone-500">
            <p className="text-[8px] sm:text-[10px] text-stone-400 font-medium uppercase tracking-widest mb-0.5 sm:mb-1">Kayıt</p>
            <p className="text-xl sm:text-3xl font-bold text-stone-900">{stats.totalRegistrations}</p>
          </div>
        </div>

        {/* Actions - Mobile Optimized */}
        <div className="flex flex-row justify-between items-center gap-2 mb-4 sm:mb-6">
          <div>
            <h2 className="text-sm sm:text-lg font-bold text-stone-900 uppercase tracking-wide">Seminerler</h2>
            <p className="text-[10px] sm:text-xs text-stone-500 hidden sm:block">Tüm seminerleri yönetin</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            disabled={stats.activeSeminars >= 10}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 font-bold text-[10px] sm:text-xs uppercase tracking-wider
                       bg-rose-500 text-white hover:bg-rose-600
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors flex-shrink-0"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden xs:inline">Yeni</span> Seminer
          </button>
        </div>

        {stats.activeSeminars >= 10 && (
          <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-amber-50 border-l-2 sm:border-l-4 border-amber-500 mb-4 sm:mb-6">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-xs sm:text-sm text-amber-800 font-medium">Maksimum 10 aktif seminer sınırına ulaştınız.</p>
          </div>
        )}

        {/* Seminars List - Sharp Design - Mobile Optimized */}
        <div className="space-y-0.5 sm:space-y-1">
          {seminars.map((seminar) => (
            <div key={seminar.id} className="bg-white border-l-2 sm:border-l-4 border-transparent hover:border-rose-500 transition-colors">
              <div className="p-3 sm:p-6">
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 sm:gap-3 mb-2">
                      <h3 className="text-sm sm:text-base font-bold text-stone-900 uppercase tracking-wide truncate flex-1">{seminar.title}</h3>
                      <span className={'inline-flex items-center px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] font-bold uppercase tracking-wider flex-shrink-0 ' + 
                        (seminar.isActive 
                          ? 'bg-amber-500 text-white' 
                          : 'bg-stone-200 text-stone-600')
                      }>
                        {seminar.isActive ? 'Aktif' : 'Pasif'}
                      </span>
                    </div>
                    {seminar.description && (
                      <p className="text-xs sm:text-sm text-stone-500 mb-2 sm:mb-3 line-clamp-2">{seminar.description}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-stone-500">
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(seminar.date)}
                      </span>
                      {seminar.time && (
                        <span className="inline-flex items-center gap-1">
                          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {seminar.time}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 font-semibold text-rose-600">
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {seminar._count.registrations} kayıt
                      </span>
                    </div>
                    <div className="mt-2 sm:mt-3">
                      <code className="text-[9px] sm:text-[10px] bg-stone-100 text-stone-600 px-1.5 sm:px-2 py-0.5 sm:py-1 font-mono tracking-wide">
                        /s/{seminar.slug}
                      </code>
                    </div>
                  </div>
                  
                  {/* Buttons - Mobile Grid */}
                  <div className="grid grid-cols-4 sm:flex sm:flex-wrap sm:items-center gap-1">
                    <button
                      onClick={() => handleToggleActive(seminar.id, seminar.isActive)}
                      className={'px-2 sm:px-3 py-1.5 sm:py-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider transition-colors text-center ' +
                        (seminar.isActive
                          ? 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                          : 'bg-amber-50 text-amber-700 hover:bg-amber-100')
                      }
                    >
                      {seminar.isActive ? 'Deaktif' : 'Aktif'}
                    </button>
                    <button
                      onClick={() => setShowRegistrations(showRegistrations === seminar.id ? null : seminar.id)}
                      className="px-2 sm:px-3 py-1.5 sm:py-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider 
                                 bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors text-center"
                    >
                      Kayıtlar
                    </button>
                    <button
                      onClick={() => setSelectedSeminar(seminar)}
                      className="px-2 sm:px-3 py-1.5 sm:py-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider 
                                 bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors text-center"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDelete(seminar.id)}
                      className="px-2 sm:px-3 py-1.5 sm:py-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider 
                                 bg-red-50 text-red-700 hover:bg-red-100 transition-colors text-center"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              </div>

              {/* Registrations - Mobile Optimized */}
              {showRegistrations === seminar.id && (
                <div className="border-t border-stone-200 bg-stone-50 p-3 sm:p-6">
                  <h4 className="font-bold text-[10px] sm:text-xs uppercase tracking-wider text-stone-900 mb-3 sm:mb-4">Kayıtlı Katılımcılar</h4>
                  {seminar.registrations.length === 0 ? (
                    <p className="text-stone-500 text-xs sm:text-sm">Henüz kayıt yok.</p>
                  ) : (
                    <>
                      {/* Mobile: Card Layout */}
                      <div className="sm:hidden space-y-2">
                        {seminar.registrations.map((reg) => (
                          <div key={reg.id} className="bg-white p-3 border-l-2 border-rose-500">
                            <p className="font-bold text-sm text-stone-900 mb-1">{reg.fullName}</p>
                            <p className="text-[10px] text-stone-500 mb-0.5">{reg.email}</p>
                            <p className="text-[10px] text-stone-500 mb-0.5">{reg.phone}</p>
                            <p className="text-[10px] text-stone-400">
                              {formatDate(reg.createdAt)} • {new Date(reg.createdAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        ))}
                      </div>
                      {/* Desktop: Table Layout */}
                      <div className="hidden sm:block overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-left text-[10px] text-stone-400 uppercase tracking-wider border-b border-stone-200">
                              <th className="pb-3 font-semibold">Ad Soyad</th>
                              <th className="pb-3 font-semibold">E-posta</th>
                              <th className="pb-3 font-semibold">Telefon</th>
                              <th className="pb-3 font-semibold">Tarih</th>
                              <th className="pb-3 font-semibold">Saat</th>
                            </tr>
                          </thead>
                          <tbody className="text-stone-700">
                            {seminar.registrations.map((reg) => (
                              <tr key={reg.id} className="border-b border-stone-100 last:border-0">
                                <td className="py-3 font-medium">{reg.fullName}</td>
                                <td className="py-3">{reg.email}</td>
                                <td className="py-3">{reg.phone}</td>
                                <td className="py-3 text-stone-500">{formatDate(reg.createdAt)}</td>
                                <td className="py-3 text-stone-500">{new Date(reg.createdAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}

          {seminars.length === 0 && (
            <div className="text-center py-16 bg-white">
              <div className="w-12 h-12 bg-stone-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide mb-2">Henüz seminer yok</h3>
              <p className="text-stone-500 text-sm mb-6">İlk seminerinizi oluşturarak başlayın</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 font-bold text-xs uppercase tracking-wider
                           bg-rose-500 text-white hover:bg-rose-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Yeni Seminer Oluştur
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer - Mobile Optimized */}
      <footer className="bg-stone-900 text-stone-400 py-3 sm:py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-0">
          <p className="text-[9px] sm:text-[10px] uppercase tracking-widest">© 2026 Seminer Yönetim Sistemi</p>
          <a
            href="https://ataberkdudu.info"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[9px] sm:text-[10px] text-stone-500 hover:text-rose-400 transition-colors uppercase tracking-widest"
          >
            Made by AMST
          </a>
        </div>
      </footer>

      {/* Create/Edit Modal */}
      {(showCreateModal || selectedSeminar) && (
        <SeminarModal
          seminar={selectedSeminar}
          onClose={() => {
            setShowCreateModal(false);
            setSelectedSeminar(null);
          }}
          onSuccess={() => {
            setShowCreateModal(false);
            setSelectedSeminar(null);
            router.refresh();
          }}
        />
      )}
    </div>
  );
}

// Seminar Create/Edit Modal - Sharp Design
interface SeminarModalProps {
  seminar: Seminar | null;
  onClose: () => void;
  onSuccess: () => void;
}

function SeminarModal({ seminar, onClose, onSuccess }: SeminarModalProps) {
  const [formData, setFormData] = useState({
    title: seminar?.title || '',
    description: seminar?.description || '',
    date: seminar?.date ? new Date(seminar.date).toISOString().split('T')[0] : '',
    time: seminar?.time || '',
    location: seminar?.location || '',
    backgroundImage: seminar?.backgroundImage || '',
    contactPhone: seminar?.contactPhone || '',
    contactEmail: seminar?.contactEmail || '',
    contactWhatsapp: seminar?.contactWhatsapp || '',
    maxCapacity: seminar?.maxCapacity?.toString() || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Saat inputu için otomatik formatlama (14:00 formatı)
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, ''); // Sadece rakamları al
    
    if (value.length >= 2) {
      value = value.slice(0, 2) + ':' + value.slice(2, 4);
    }
    
    // Maksimum 5 karakter (HH:MM)
    if (value.length > 5) {
      value = value.slice(0, 5);
    }
    
    setFormData({ ...formData, time: value });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setError('Geçersiz dosya türü. Sadece JPEG, PNG ve WebP desteklenir.');
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('Dosya boyutu çok büyük. Maksimum 10MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCropComplete = async (croppedBlob: Blob) => {
    setShowCropper(false);
    setUploadingImage(true);
    setError('');

    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', croppedBlob, 'cropped-image.jpg');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Yükleme hatası');
      }

      setFormData(prev => ({ ...prev, backgroundImage: data.url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Görsel yüklenirken bir hata oluştu');
    } finally {
      setUploadingImage(false);
      setSelectedImage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = seminar ? '/api/seminars/' + seminar.id : '/api/seminars';
      const method = seminar ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      onSuccess();
      // Sayfayı yenile - yeni seminer hemen görünsün
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-2 sm:p-4">
        <div className="bg-white max-w-lg w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl">
          {/* Header - Mobile Optimized */}
          <div className="p-4 sm:p-6 border-b border-stone-200 bg-stone-900 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                  {seminar ? 'Seminer Düzenle' : 'Yeni Seminer'}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-7 h-7 sm:w-8 sm:h-8 bg-stone-800 hover:bg-stone-700 flex items-center justify-center transition-colors"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4 overflow-y-auto max-h-[calc(95vh-120px)] sm:max-h-[calc(90vh-140px)]">
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border-l-4 border-red-500">
                <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Başlık *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-4 py-3 border-2 border-stone-200 bg-stone-50
                           focus:border-rose-500 focus:bg-white focus:outline-none
                           transition-colors text-sm"
                placeholder="Seminer başlığı"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Açıklama</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border-2 border-stone-200 bg-stone-50
                           focus:border-rose-500 focus:bg-white focus:outline-none
                           transition-colors resize-none text-sm"
                placeholder="Seminer açıklaması"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Tarih *</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  className="w-full px-4 py-3 border-2 border-stone-200 bg-stone-50
                             focus:border-rose-500 focus:bg-white focus:outline-none
                             transition-colors text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Saat</label>
                <input
                  type="text"
                  placeholder="14:00"
                  value={formData.time}
                  onChange={handleTimeChange}
                  maxLength={5}
                  className="w-full px-4 py-3 border-2 border-stone-200 bg-stone-50
                             focus:border-rose-500 focus:bg-white focus:outline-none
                             transition-colors text-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Konum</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 border-2 border-stone-200 bg-stone-50
                           focus:border-rose-500 focus:bg-white focus:outline-none
                           transition-colors text-sm"
                placeholder="Seminer konumu"
              />
            </div>

            {/* Image Upload - Sharp */}
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                Arka Plan Görseli
                <span className="text-stone-400 ml-2 normal-case">(9:16 formatı)</span>
              </label>
              
              {formData.backgroundImage ? (
                <div className="relative">
                  <div className="aspect-[9/16] max-h-48 w-auto mx-auto overflow-hidden border-2 border-stone-200">
                    <img 
                      src={formData.backgroundImage} 
                      alt="Seminer görseli" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, backgroundImage: '' })}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-600 text-white 
                               flex items-center justify-center hover:bg-red-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-stone-300 p-8 text-center 
                             cursor-pointer hover:border-rose-500 hover:bg-rose-50/50 transition-all"
                >
                  {uploadingImage ? (
                    <div className="flex flex-col items-center gap-3">
                      <svg className="animate-spin w-8 h-8 text-rose-500" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <p className="text-xs text-stone-500 uppercase tracking-wider">Yükleniyor...</p>
                    </div>
                  ) : (
                    <>
                      <svg className="w-8 h-8 text-stone-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-xs text-stone-600 font-medium uppercase tracking-wider">Görsel Yükle</p>
                      <p className="text-[10px] text-stone-400 mt-1">PNG, JPG, WebP (max 10MB)</p>
                    </>
                  )}
                </div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/jpg"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Maksimum Kapasite</label>
              <input
                type="number"
                value={formData.maxCapacity}
                onChange={(e) => setFormData({ ...formData, maxCapacity: e.target.value })}
                min="1"
                className="w-full px-4 py-3 border-2 border-stone-200 bg-stone-50
                           focus:border-rose-500 focus:bg-white focus:outline-none
                           transition-colors text-sm"
                placeholder="Örn: 50"
              />
            </div>

            <div className="border-t border-stone-200 pt-4 mt-4">
              <h3 className="font-bold text-[10px] text-stone-500 uppercase tracking-wider mb-4">İletişim Bilgileri</h3>
              <div className="space-y-3">
                <input
                  type="tel"
                  placeholder="Telefon"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-stone-200 bg-stone-50
                             focus:border-rose-500 focus:bg-white focus:outline-none
                             transition-colors text-sm"
                />
                <input
                  type="email"
                  placeholder="E-posta"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-stone-200 bg-stone-50
                             focus:border-rose-500 focus:bg-white focus:outline-none
                             transition-colors text-sm"
                />
                <input
                  type="tel"
                  placeholder="WhatsApp (ör: 905551234567)"
                  value={formData.contactWhatsapp}
                  onChange={(e) => setFormData({ ...formData, contactWhatsapp: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-stone-200 bg-stone-50
                             focus:border-rose-500 focus:bg-white focus:outline-none
                             transition-colors text-sm"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 border-2 border-stone-200 text-stone-700 
                           font-bold text-xs uppercase tracking-wider hover:bg-stone-50 transition-colors"
              >
                İptal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 px-4 font-bold text-xs uppercase tracking-wider
                           bg-rose-500 text-white hover:bg-rose-600
                           disabled:opacity-50 disabled:cursor-not-allowed transition-colors
                           flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Kaydediliyor...
                  </>
                ) : (
                  seminar ? 'Güncelle' : 'Oluştur'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Image Cropper Modal */}
      {showCropper && selectedImage && (
        <ImageCropper
          image={selectedImage}
          onCropComplete={handleCropComplete}
          onCancel={() => {
            setShowCropper(false);
            setSelectedImage(null);
          }}
        />
      )}
    </>
  );
}
