import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

export default function UseCases() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.15 });

  const useCases = [
    {
      icon: 'ri-bank-line',
      title: 'Fintech & Payments',
      description: 'Standardized KYC and AML across African markets.',
      gradient: 'from-teal-500 to-cyan-600',
      hoverGradient: 'from-teal-400 to-cyan-500',
      caseStudyId: 2, // Fintechs & Payment Providers
    },
    {
      icon: 'ri-building-2-line',
      title: 'Banks',
      description: 'End-to-end customer due diligence and regulatory compliance for banking institutions.',
      gradient: 'from-emerald-500 to-teal-600',
      hoverGradient: 'from-emerald-400 to-teal-500',
      caseStudyId: 1, // Banks & Financial Institutions
    },
    {
      icon: 'ri-exchange-line',
      title: 'FX & Brokers',
      description: 'Risk-based onboarding and monitoring for cross-border clients.',
      gradient: 'from-orange-500 to-amber-600',
      hoverGradient: 'from-orange-400 to-amber-500',
      caseStudyId: 3, // FX Brokers
    },
    {
      icon: 'ri-gamepad-line',
      title: 'iGaming Platforms',
      description: 'Age, identity, and fraud controls at scale.',
      gradient: 'from-pink-500 to-rose-600',
      hoverGradient: 'from-pink-400 to-rose-500',
      caseStudyId: 7, // iGaming & Sports Betting
    },
    {
      icon: 'ri-store-line',
      title: 'Marketplaces & Platforms',
      description: 'Trust and safety infrastructure for African users.',
      gradient: 'from-green-500 to-emerald-600',
      hoverGradient: 'from-green-400 to-emerald-500',
      caseStudyId: 5, // E-commerce & Marketplaces
    },
  ];

  return (
    <section id="use-cases" className="py-12 sm:py-16 lg:py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div 
          ref={headerRef}
          className={`text-center mb-10 sm:mb-12 lg:mb-16 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">Use Cases</h2>
          <p className="text-sm sm:text-base lg:text-xl text-gray-600 px-2">Trusted by regulated businesses across industries</p>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4 lg:gap-6">
          {useCases.map((useCase, index) => (
            <Link
              key={index}
              to={`/case-studies?open=${useCase.caseStudyId}`}
              className={`group relative bg-gradient-to-br ${useCase.gradient} rounded-lg sm:rounded-xl p-3 sm:p-5 lg:p-8 text-white cursor-pointer overflow-hidden`}
              style={{
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible 
                  ? 'translateY(0) scale(1) rotateX(0)' 
                  : 'translateY(40px) scale(0.9) rotateX(10deg)',
                transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 80}ms`
              }}
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
              
              {/* Hover gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${useCase.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div 
                  className="w-8 h-8 sm:w-11 lg:w-14 sm:h-11 lg:h-14 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-md sm:rounded-lg mb-2 sm:mb-4 lg:mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-white/30"
                >
                  <i className={`${useCase.icon} text-lg sm:text-xl lg:text-3xl transition-transform duration-300 group-hover:scale-110`}></i>
                </div>
                <h3 className="text-xs sm:text-sm lg:text-xl font-bold mb-0.5 sm:mb-2 lg:mb-3 transition-transform duration-300 group-hover:translate-x-1">{useCase.title}</h3>
                <p className="text-[10px] sm:text-xs lg:text-sm text-white/90 leading-relaxed hidden sm:block">{useCase.description}</p>
              </div>
              
              {/* Arrow indicator — bottom-right, slides in on hover */}
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center bg-white/20 rounded-full opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-300">
                <i className="ri-arrow-right-up-line text-xs sm:text-sm text-white"></i>
              </div>

              {/* Floating particles on hover - Hidden on mobile */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-float transition-opacity duration-300 hidden sm:block"></div>
              <div className="absolute bottom-8 right-8 w-1.5 h-1.5 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-float-delayed transition-opacity duration-300 hidden sm:block" style={{ animationDelay: '0.2s' }}></div>
            </Link>
          ))}
        </div>

        {/* View all use cases CTA */}
        <div
          className={`flex justify-center mt-10 sm:mt-12 lg:mt-16 transition-all duration-700 delay-300 ${
            gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <Link
            to="/case-studies"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border-2 border-gray-900 text-gray-900 font-semibold text-sm sm:text-base hover:bg-gray-900 hover:text-white transition-all duration-300 whitespace-nowrap cursor-pointer"
          >
            View all use cases
            <span className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-900 text-white group-hover:bg-white group-hover:text-gray-900 transition-all duration-300 group-hover:translate-x-1">
              <i className="ri-arrow-right-line text-xs"></i>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
