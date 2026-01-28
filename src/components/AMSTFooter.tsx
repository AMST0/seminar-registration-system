/**
 * AMST Footer Component - Premium Glassmorphism Design
 * Made by AMST → https://ataberkdudu.info
 */

export default function AMSTFooter() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      <div className="flex justify-center pb-4">
        <div
          className="pointer-events-auto
                     px-4 py-2 rounded-full
                     bg-white/5 backdrop-blur-md border border-white/10
                     flex items-center gap-2"
        >
          {/* Shield/Security Icon */}
          <svg 
            className="w-3.5 h-3.5 text-rose-400/70" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="text-xs text-white/50">
            Güvenli Kayıt
          </span>
          
          <span className="w-1 h-1 rounded-full bg-white/20" />
          
          {/* Lock Icon */}
          <svg 
            className="w-3.5 h-3.5 text-amber-400/70" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-xs text-white/50">
            KVKK Uyumlu
          </span>
        </div>
      </div>
      
      {/* AMST Branding - Separate subtle link */}
      <div className="flex justify-center pb-3">
        <a
          href="https://ataberkdudu.info"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto text-[10px] text-white/25 hover:text-white/50 transition-colors flex items-center gap-1"
        >
          <span>Powered by</span>
          <span className="font-semibold tracking-wider">AMST</span>
        </a>
      </div>
    </footer>
  );
}
