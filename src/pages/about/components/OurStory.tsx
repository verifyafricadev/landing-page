import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

export default function OurStory() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

  const milestones = [
    {
      year: '2024',
      title: 'The Beginning',
      description:
        'VerifyAfrica was founded by a team of compliance experts and engineers who saw the fragmented identity verification landscape across Africa as a problem worth solving.',
    },
    {
      year: '2025',
      title: 'First 4 Countries',
      description:
        'We expanded our coverage to 4 African nations, partnering with Government data providers and regulatory bodies to build reliable verification pipelines.',
    },
    {
      year: '2026',
      title: 'Pan-African Coverage',
      description:
        'Achieved full coverage across all 54 African countries, becoming the first compliance platform to offer truly continent‑wide identity verification.',
    },
    {
      year: '2026',
      title: 'AI-Powered Compliance',
      description:
        'Introduced AI-driven risk scoring, automated document verification, and real‑time compliance monitoring — processing over 50 million verifications.',
    },
  ];

  return (
    <section id="story" ref={ref} className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span
            className={`inline-block text-xs font-semibold tracking-widest uppercase text-teal-600 mb-3 transition-all duration-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
          >
            Our Journey
          </span>
          <h2
            className={`text-3xl lg:text-4xl font-bold text-gray-900 mb-4 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            From Lagos to the Continent
          </h2>
          <p
            className={`text-base text-gray-500 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            What started as a mission to simplify KYC in Nigeria has grown into Africa&apos;s most comprehensive compliance infrastructure.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 hidden lg:block"></div>

          <div className="space-y-12 lg:space-y-0">
            {milestones.map((milestone, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`relative lg:flex items-center lg:mb-16 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${200 + index * 150}ms` }}
                >
                  {/* Left content */}
                  <div
                    className={`lg:w-1/2 ${
                      isLeft ? 'lg:pr-16 lg:text-right' : 'lg:pr-16 lg:text-right lg:order-1 lg:invisible'
                    }`}
                  >
                    {isLeft && (
                      <div>
                        <span className="inline-block text-sm font-bold text-teal-500 mb-2">{milestone.year}</span>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                          <a href="#story" className="hover:text-teal-600 transition-colors">
                            {milestone.title}
                          </a>
                        </h4>
                        <p className="text-sm text-gray-500 leading-relaxed">{milestone.description}</p>
                      </div>
                    )}
                  </div>

                  {/* Center dot */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 items-center justify-center bg-teal-500 rounded-full shadow-lg shadow-teal-500/30 z-10">
                    <span className="text-white text-xs font-bold">{milestone.year.slice(-2)}</span>
                  </div>

                  {/* Right content */}
                  <div
                    className={`lg:w-1/2 ${
                      !isLeft ? 'lg:pl-16 lg:text-left lg:order-2' : 'lg:pl-16 lg:text-left lg:invisible'
                    }`}
                  >
                    {!isLeft && (
                      <div>
                        <span className="inline-block text-sm font-bold text-teal-500 mb-2">{milestone.year}</span>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                          <a href="#story" className="hover:text-teal-600 transition-colors">
                            {milestone.title}
                          </a>
                        </h4>
                        <p className="text-sm text-gray-500 leading-relaxed">{milestone.description}</p>
                      </div>
                    )}
                  </div>

                  {/* Mobile year badge */}
                  <div className="lg:hidden flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 flex items-center justify-center bg-teal-500 rounded-full">
                      <span className="text-white text-xs font-bold">{milestone.year.slice(-2)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>


      </div>
    </section>
  );
}
