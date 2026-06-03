import type { FeatureDetail } from '@/mocks/featureDetails';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface FeatureHowItWorksProps {
  feature: FeatureDetail;
}

export default function FeatureHowItWorks({ feature }: FeatureHowItWorksProps) {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: stepsRef, isVisible: stepsVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div
          ref={headerRef}
          className={`text-center mb-12 md:mb-16 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-600 text-sm font-semibold rounded-full mb-4">
            How It Works
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            From submission to decision in seconds
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            A transparent, auditable process designed for speed and compliance.
          </p>
        </div>

        <div ref={stepsRef} className="relative">
          {/* Connector line — desktop */}
          <div className="hidden lg:block absolute top-10 left-[calc(12.5%+1.5rem)] right-[calc(12.5%+1.5rem)] h-0.5 bg-gradient-to-r from-teal-200 via-teal-400 to-teal-200" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            {feature.howItWorks.map((step, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center text-center"
                style={{
                  opacity: stepsVisible ? 1 : 0,
                  transform: stepsVisible ? 'translateY(0)' : 'translateY(24px)',
                  transition: `all 0.6s ease-out ${i * 120}ms`,
                }}
              >
                {/* Step number circle */}
                <div className="relative z-10 w-20 h-20 flex items-center justify-center bg-white border-2 border-teal-400 rounded-full mb-6 flex-shrink-0">
                  <span className="text-2xl font-bold text-teal-500">{step.step}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
