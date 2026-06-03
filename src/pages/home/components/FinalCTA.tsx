import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import { Link } from 'react-router-dom';
import { track } from '@/lib/analytics';

interface FinalCTAProps {
  onRequestDemo: () => void;
}

export default function FinalCTA({ onRequestDemo }: FinalCTAProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section ref={ref} className="py-14 sm:py-20 lg:py-32 bg-gradient-to-br from-teal-600 via-cyan-600 to-teal-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20"></div>
      
      {/* Animated background shapes */}
      <div 
        className={`absolute top-10 left-10 w-24 sm:w-48 lg:w-64 h-24 sm:h-48 lg:h-64 bg-white/5 rounded-full blur-3xl transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}
      ></div>
      <div 
        className={`absolute bottom-10 right-10 w-32 sm:w-64 lg:w-96 h-32 sm:h-64 lg:h-96 bg-teal-400/10 rounded-full blur-3xl transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}
      ></div>
      
      {/* Floating particles - Reduced on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-white/20 rounded-full transition-all duration-1000 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animation: `float ${4 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              transitionDelay: `${i * 100}ms`,
            }}
          />
        ))}
      </div>
      
      {/* Animated grid lines - Hidden on mobile */}
      <div className="absolute inset-0 opacity-10 hidden md:block">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}></div>
      </div>
      
      <div className="relative max-w-5xl mx-auto px-5 sm:px-6 lg:px-12 text-center">
        <h2 
          className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-6 leading-tight transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          African onboarding doesn&apos;t have to be fragmented
        </h2>
        <p 
          className={`text-sm sm:text-base lg:text-xl text-white/90 mb-6 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-2 transition-all duration-700 delay-150 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Run identity, compliance, and monitoring through one platform.
        </p>
        <div 
          className={`flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <button 
            onClick={() => {
              track('demo_cta_clicked', { source: 'final_cta', location: 'bottom_section' });
              onRequestDemo();
            }}
            className="group relative px-5 sm:px-8 lg:px-10 py-3 sm:py-4 bg-white text-teal-600 text-sm sm:text-base font-semibold rounded-lg overflow-hidden transition-all shadow-lg hover:shadow-2xl whitespace-nowrap cursor-pointer"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <span>Request a Demo</span>
              <i className="ri-arrow-right-line text-lg transition-transform group-hover:translate-x-2"></i>
            </span>
          </button>
          <Link to="/docs" className="group relative px-5 sm:px-8 lg:px-10 py-3 sm:py-4 bg-transparent text-white text-sm sm:text-base font-semibold rounded-lg border-2 border-white overflow-hidden transition-all whitespace-nowrap cursor-pointer hover:bg-white/10 flex items-center justify-center">
            <span className="relative z-10 flex items-center space-x-2">
              <span>Start Integration</span>
              <i className="ri-code-line text-lg transition-transform group-hover:rotate-12 group-hover:scale-110"></i>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
