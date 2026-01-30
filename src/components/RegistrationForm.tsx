/**
 * Registration Form Component - Premium Design with KVKK Modal
 * Made by AMST → https://ataberkdudu.info
 */

'use client';

import { useState, useEffect } from 'react';

interface RegistrationFormProps {
  seminarId: string;
  onSuccess?: () => void;
}

export default function RegistrationForm({ seminarId, onSuccess }: RegistrationFormProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
  });
  const [kvkkAccepted, setKvkkAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!kvkkAccepted) {
      setError('KVKK metnini onaylamanız gerekmektedir.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          seminarId,
          kvkkAccepted: true,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Bir hata oluştu');
      }

      setSuccess(true);
      console.log('✅ Kayıt başarılı:', data);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 4) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 4)} ${numbers.slice(4)}`;
    if (numbers.length <= 9) return `${numbers.slice(0, 4)} ${numbers.slice(4, 7)} ${numbers.slice(7)}`;
    return `${numbers.slice(0, 4)} ${numbers.slice(4, 7)} ${numbers.slice(7, 9)} ${numbers.slice(9, 11)}`;
  };

  // Success state inside modal
  if (success) {
    return (
      <>
        <button
          onClick={() => {}}
          disabled
          className="w-full py-4 px-6 rounded-2xl font-bold text-lg
                     bg-gradient-to-r from-rose-500 to-rose-600 text-white
                     shadow-lg shadow-rose-500/25 cursor-default"
        >
          <div className="flex items-center justify-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            Kaydınız Alındı
          </div>
        </button>
      </>
    );
  }

  return (
    <>
      {/* Main CTA Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full py-4 px-6 rounded-2xl font-bold text-lg
                   bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 text-white
                   shadow-xl shadow-rose-500/30
                   hover:shadow-2xl hover:shadow-rose-500/40
                   transform hover:scale-[1.02] active:scale-[0.98]
                   transition-all duration-300 ease-out
                   relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
                        translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        <span className="relative flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Kayıt Ol
        </span>
      </button>

      {/* Registration Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm animate-fadeIn" />
          
          {/* Modal */}
          <div className="relative w-full sm:max-w-md bg-white sm:rounded-3xl rounded-t-3xl shadow-2xl 
                          max-h-[85vh] sm:max-h-[90vh] overflow-hidden animate-slideUp">
            {/* Header */}
            <div className="relative px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b border-stone-100">
              {/* Drag indicator for mobile */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-stone-200 rounded-full sm:hidden" />
              
              <div className="flex items-center justify-between mt-2 sm:mt-0">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-stone-900">Seminere Kayıt Ol</h2>
                  <p className="text-xs sm:text-sm text-stone-500 mt-0.5 sm:mt-1">Bilgilerinizi doldurun</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-stone-100 hover:bg-stone-200 
                             flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4 overflow-y-auto max-h-[calc(85vh-130px)] sm:max-h-[calc(90vh-180px)]">
              {error && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-100">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
              )}

              {/* Full Name */}
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-semibold text-stone-700">
                  Ad Soyad <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Adınız ve soyadınız"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-3.5 rounded-xl border-2 border-stone-200
                               bg-stone-50/50 text-stone-900 placeholder-stone-400
                               focus:border-rose-500 focus:bg-white focus:ring-4 focus:ring-rose-500/10
                               transition-all duration-200 text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-semibold text-stone-700">
                  Telefon <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    placeholder="05XX XXX XX XX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: formatPhoneNumber(e.target.value) })}
                    required
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-3.5 rounded-xl border-2 border-stone-200
                               bg-stone-50/50 text-stone-900 placeholder-stone-400
                               focus:border-rose-500 focus:bg-white focus:ring-4 focus:ring-rose-500/10
                               transition-all duration-200 text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-semibold text-stone-700">
                  E-posta <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    placeholder="ornek@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-3.5 rounded-xl border-2 border-stone-200
                               bg-stone-50/50 text-stone-900 placeholder-stone-400
                               focus:border-rose-500 focus:bg-white focus:ring-4 focus:ring-rose-500/10
                               transition-all duration-200 text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* KVKK Checkbox */}
              <div className="pt-1 sm:pt-2">
                <label className="flex items-start gap-2.5 sm:gap-3 cursor-pointer group">
                  <div className="relative flex-shrink-0 mt-0.5">
                    <input
                      type="checkbox"
                      checked={kvkkAccepted}
                      onChange={(e) => setKvkkAccepted(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md border-2 border-stone-300 bg-white
                                    peer-checked:bg-rose-500 peer-checked:border-rose-500
                                    peer-focus:ring-4 peer-focus:ring-rose-500/20
                                    transition-all duration-200">
                      <svg className="w-full h-full text-white scale-0 peer-checked:scale-100 transition-transform" 
                           fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="absolute inset-0 w-4 h-4 sm:w-5 sm:h-5 rounded-md border-2 border-stone-300 
                                    peer-checked:border-rose-500 peer-checked:bg-rose-500
                                    flex items-center justify-center transition-all">
                      {kvkkAccepted && (
                        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    <a 
                      href="/kvkk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rose-600 hover:text-rose-700 font-medium underline underline-offset-2"
                    >
                      KVKK Aydınlatma Metni
                    </a>
                    &apos;ni okudum ve kişisel verilerimin işlenmesini kabul ediyorum.
                    <span className="text-rose-500 ml-1">*</span>
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2 sm:pt-4">
                <button
                  type="submit"
                  disabled={loading || !kvkkAccepted}
                  className="w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-sm sm:text-base
                             bg-gradient-to-r from-rose-500 to-pink-600 text-white
                             shadow-lg shadow-rose-500/25
                             hover:shadow-xl hover:shadow-rose-500/30
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                             transform hover:scale-[1.01] active:scale-[0.99]
                             transition-all duration-200
                             flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Kaydediliyor...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Kaydı Tamamla
                    </>
                  )}
                </button>
              </div>

              {/* Security note */}
              <p className="text-center text-[10px] sm:text-xs text-stone-400 pt-1 sm:pt-2 pb-2">
                <svg className="inline-block w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 -mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Bilgileriniz güvenle saklanmaktadır
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
