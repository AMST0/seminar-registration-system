/**
 * Public Seminar Page - Premium Mobile-First Design
 * Made by AMST → https://ataberkdudu.info
 * 
 * Mobile-first 9:16 layout for Instagram story redirects
 */

import { notFound } from 'next/navigation';
import prisma from '@/lib/db';
import RegistrationForm from '@/components/RegistrationForm';
import ContactButton from '@/components/ContactButton';
import { formatDate } from '@/lib/utils';

interface SeminarPageProps {
  params: Promise<{ slug: string }>;
}

async function getSeminar(slug: string) {
  const seminar = await prisma.seminar.findUnique({
    where: { slug },
    include: {
      _count: {
        select: { registrations: true }
      }
    }
  });
  return seminar;
}

export default async function SeminarPage({ params }: SeminarPageProps) {
  const { slug } = await params;
  const seminar = await getSeminar(slug);

  if (!seminar || !seminar.isActive) {
    notFound();
  }

  const spotsLeft = seminar.maxCapacity 
    ? seminar.maxCapacity - seminar._count.registrations 
    : null;

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
      {/* Desktop wrapper - centers 9:16 container */}
      <div className="min-h-screen w-full bg-stone-950 flex items-center justify-center">
        {/* 9:16 Container - max width locked for desktop */}
        <main 
          className="relative flex flex-col w-full max-w-[430px] min-h-screen md:min-h-0 md:h-[calc(100vh-40px)] md:max-h-[860px] md:my-5 md:rounded-3xl md:shadow-2xl md:shadow-black/50 overflow-hidden"
          style={{
            backgroundImage: seminar.backgroundImage 
              ? `url(${seminar.backgroundImage})` 
              : 'linear-gradient(160deg, #1c1917 0%, #44403c 50%, #1c1917 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
        {/* Premium Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 via-stone-900/20 to-stone-900/90" />
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-rose-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-amber-500/10 rounded-full blur-3xl" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col flex-1 px-5 py-8 w-full overflow-y-auto">
          
          {/* Top Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                            bg-white/10 backdrop-blur-md border border-white/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-medium text-white/90">Kayıtlar Açık</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Seminar Info Card */}
            <div className="text-center space-y-6">
              {/* Title */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tight">
                  {seminar.title}
                </h1>
                
                {seminar.description && (
                  <p className="text-base text-white/80 leading-relaxed max-w-sm mx-auto">
                    {seminar.description}
                  </p>
                )}
              </div>
              
              {/* Info Pills */}
              <div className="flex flex-col items-center gap-3">
                {/* Date & Time */}
                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl
                                bg-white/10 backdrop-blur-md border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-white/60 font-medium uppercase tracking-wide">Tarih</p>
                    <p className="text-white font-semibold">
                      {formatDate(seminar.date)}
                      {seminar.time && <span className="text-white/70"> • {seminar.time}</span>}
                    </p>
                  </div>
                </div>
                
                {/* Location */}
                {seminar.location && (
                  <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl
                                  bg-white/10 backdrop-blur-md border border-white/10">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-white/60 font-medium uppercase tracking-wide">Konum</p>
                      <p className="text-white font-semibold">{seminar.location}</p>
                    </div>
                  </div>
                )}

                {/* Spots Left Indicator */}
                {spotsLeft !== null && spotsLeft > 0 && spotsLeft <= 20 && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                                  bg-amber-500/20 border border-amber-500/30">
                    <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-semibold text-amber-300">
                      Son {spotsLeft} kişilik yer!
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Bottom Section - CTA */}
          <div className="mt-auto pt-8 space-y-4">
            <RegistrationForm seminarId={seminar.id} />
            
            <ContactButton 
              phone={seminar.contactPhone}
              email={seminar.contactEmail}
              whatsapp={seminar.contactWhatsapp}
            />

            {/* Trust Indicators & AMST Branding */}
            <div className="pt-4 pb-2 space-y-3">
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-1.5 text-white/50 text-xs">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Güvenli Kayıt</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-white/30" />
                <div className="flex items-center gap-1.5 text-white/50 text-xs">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>KVKK Uyumlu</span>
                </div>
              </div>
              <div className="text-center">
                <a
                  href="https://ataberkdudu.info"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-white/30 hover:text-white/50 transition-colors"
                >
                  Powered by AMST
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      </div>
    </>
  );
}

export async function generateMetadata({ params }: SeminarPageProps) {
  const { slug } = await params;
  const seminar = await getSeminar(slug);
  
  if (!seminar) {
    return {
      title: 'Seminer Bulunamadı',
    };
  }

  return {
    title: `${seminar.title} | Seminer Kayıt`,
    description: seminar.description || `${seminar.title} semineri için kayıt olun.`,
  };
}
