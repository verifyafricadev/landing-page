
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

export default function TrustStrip() {
  const { ref, isVisible } = useScrollAnimation();
  
  const industries = [
    'Fintech',
    'Payment Providers',
    'FX Brokers',
    'iGaming',
    'Banks',
    'Digital Platforms',
  ];

  return (
    <section ref={ref} className="bg-gray-50 border-y border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8">
        <div className={`flex flex-col items-center space-y-3 sm:space-y-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
            Built for regulated businesses across:
          </p>
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
            {industries.map((industry, index) => (
              <span 
                key={index} 
                className="flex items-center transition-all duration-500"
                style={{ 
                  transitionDelay: isVisible ? `${index * 80}ms` : '0ms',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(10px)'
                }}
              >
                <span className="text-xs sm:text-sm font-medium text-gray-700">{industry}</span>
                {index < industries.length - 1 && (
                  <span className="ml-2 sm:ml-3 text-gray-400">•</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
