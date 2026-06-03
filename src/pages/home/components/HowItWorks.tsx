import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

// Keyframe injected once at module level — not re-created on every render
const SLIDE_CODE_STYLE = `
  @keyframes slideCode {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;
if (typeof document !== 'undefined' && !document.getElementById('slide-code-kf')) {
  const s = document.createElement('style');
  s.id = 'slide-code-kf';
  s.textContent = SLIDE_CODE_STYLE;
  document.head.appendChild(s);
}

export default function HowItWorks() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div 
          ref={headerRef}
          className={`text-center mb-10 sm:mb-12 lg:mb-16 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">How It Works</h2>
          <p className="text-sm sm:text-base lg:text-xl text-gray-600 px-2">Choose the integration method that fits your workflow</p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Dashboard Card */}
          <div 
            className={`group relative bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl sm:rounded-2xl p-5 sm:p-7 lg:p-10 border border-teal-100 overflow-hidden cursor-default ${
              cardsVisible ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-12 -rotate-1'
            }`}
            style={{ transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-teal-200/30 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="absolute bottom-0 left-0 w-36 sm:w-48 h-36 sm:h-48 bg-cyan-200/30 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>
            </div>
            
            <div className="relative z-10">
              <div className="w-11 h-11 sm:w-14 md:w-16 sm:h-14 md:h-16 flex items-center justify-center bg-teal-500 rounded-lg sm:rounded-xl mb-3 sm:mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-teal-500/30">
                <i className="ri-dashboard-line text-xl sm:text-2xl md:text-3xl text-white transition-transform duration-300 group-hover:scale-110"></i>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-4 transition-colors duration-300 group-hover:text-teal-700">
                Option 1 — Use the VerifyAfrica Dashboard
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed mb-3 sm:mb-6">
                Manage onboarding, monitor risk, and review cases through our compliance interface. Perfect for teams who need a visual workflow and case management system.
              </p>
              <a
                href="https://dashboard.verifyafrica.io/login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-teal-600 font-semibold hover:text-teal-700 transition-all group/link text-sm sm:text-base"
              >
                <span className="relative">
                  Explore Dashboard
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 group-hover/link:w-full transition-all duration-300"></span>
                </span>
                <i className="ri-arrow-right-line transition-transform group-hover/link:translate-x-2"></i>
              </a>
            </div>
          </div>

          {/* API Card */}
          <div 
            className={`group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl sm:rounded-2xl p-5 sm:p-7 lg:p-10 text-white overflow-hidden cursor-default ${
              cardsVisible ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-12 rotate-1'
            }`}
            style={{ transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 150ms' }}
          >
            {/* Animated code lines background - Hidden on mobile */}
            <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500 hidden sm:block">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent"
                  style={{
                    top: `${15 + i * 12}%`,
                    left: '10%',
                    right: '10%',
                    transform: `translateX(${i % 2 === 0 ? '-100%' : '100%'})`,
                    animation: `slideCode ${3 + i * 0.5}s linear infinite`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              ))}
            </div>
            
            {/* Glowing orb */}
            <div className="absolute top-1/2 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-teal-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:bg-teal-500/20 group-hover:scale-125 transition-all duration-700"></div>
            
            <div className="relative z-10">
              <div className="w-11 h-11 sm:w-14 md:w-16 sm:h-14 md:h-16 flex items-center justify-center bg-teal-500 rounded-lg sm:rounded-xl mb-3 sm:mb-6 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:shadow-lg group-hover:shadow-teal-500/30">
                <i className="ri-code-s-slash-line text-xl sm:text-2xl md:text-3xl text-white transition-transform duration-300 group-hover:scale-110"></i>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-4 transition-colors duration-300 group-hover:text-teal-300">Option 2 — Integrate via API</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed mb-3 sm:mb-6">
                Embed identity and compliance checks directly into your onboarding flow or CRM. Flexible, modular, and built for scale.
              </p>
              <a
                href="/docs"
                className="inline-flex items-center space-x-2 text-teal-400 font-semibold hover:text-teal-300 transition-all group/link text-sm sm:text-base"
              >
                <span className="relative">
                  View API Docs
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 group-hover/link:w-full transition-all duration-300"></span>
                </span>
                <i className="ri-arrow-right-line transition-transform group-hover/link:translate-x-2"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
}
