import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import { Link } from 'react-router-dom';
import { track } from '@/lib/analytics';
import { useDemoModal } from '@/hooks/useDemoModal';

export default function Pricing() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({ threshold: 0.2 });
  const { openDemo } = useDemoModal();

  const plans = [
    {
      name: 'Growth Tier',
      description: 'For scaling businesses expanding into African markets',
      platformFee: '$950',
      verificationPrice: '$6–$10',
      features: [
        'All verification types included',
        'Dashboard access',
        'API integration',
        'Standard support',
        'Audit trail & reporting',
        'Up to 5 team members',
      ],
      highlighted: false,
    },
    {
      name: 'Enterprise Tier',
      description: 'For regulated, high-volume operators',
      platformFee: '$1,750',
      verificationPrice: '$5–$7',
      features: [
        'Everything in Growth',
        'Priority support & SLA',
        'Custom risk configurations',
        'Dedicated account manager',
        'Advanced reporting & analytics',
        'Unlimited team members',
        'Custom integrations',
      ],
      highlighted: true,
    },
  ];

  return (
    <section id="pricing" className="py-12 sm:py-16 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div 
          ref={headerRef}
          className={`text-center mb-10 sm:mb-12 lg:mb-16 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">Transparent Pricing</h2>
          <p className="text-sm sm:text-base lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Flexible pricing and custom configurations available
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`group relative rounded-xl sm:rounded-2xl p-5 sm:p-7 lg:p-10 overflow-hidden cursor-default ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-500'
                  : 'bg-white border border-gray-200'
              }`}
              style={{
                opacity: cardsVisible ? 1 : 0,
                transform: cardsVisible 
                  ? 'translateY(0) scale(1)' 
                  : 'translateY(50px) scale(0.95)',
                transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 150}ms`,
                boxShadow: plan.highlighted 
                  ? '0 25px 50px -12px rgba(20, 184, 166, 0.25)' 
                  : '0 10px 40px -10px rgba(0, 0, 0, 0.1)'
              }}
            >
              {/* Animated background glow for highlighted */}
              {plan.highlighted && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-teal-300/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-36 sm:w-48 h-36 sm:h-48 bg-cyan-300/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
                </div>
              )}
              
              <div className="relative z-10">
                {plan.highlighted && (
                  <div className="inline-block px-3 sm:px-4 py-1 bg-teal-500 text-white text-xs font-semibold rounded-full mb-3 sm:mb-4 animate-pulse">
                    RECOMMENDED
                  </div>
                )}
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1.5 sm:mb-2 transition-colors duration-300 group-hover:text-teal-700">{plan.name}</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-6">{plan.description}</p>

                <div className="mb-3 sm:mb-6">
                  <div className="flex items-baseline mb-1 sm:mb-2">
                    <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 transition-transform duration-300 group-hover:scale-105">{plan.platformFee}</span>
                    <span className="text-gray-600 ml-1.5 sm:ml-2 text-xs sm:text-base">/month</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">Platform Fee</p>
                </div>

                <div className="relative bg-teal-500 text-white rounded-lg p-2.5 sm:p-4 mb-4 sm:mb-8 overflow-hidden group/price">
                  {/* Shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover/price:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold mb-1 relative z-10">Custom Verification Pricing</p>
                  <p className="text-xs text-teal-100 mt-1 relative z-10">per bundle check</p>
                </div>

                <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-8">
                  {plan.features.map((feature, idx) => (
                    <li 
                      key={idx} 
                      className="flex items-start space-x-2 sm:space-x-3 group/item"
                      style={{
                        opacity: cardsVisible ? 1 : 0,
                        transform: cardsVisible ? 'translateX(0)' : 'translateX(-10px)',
                        transition: `all 0.4s ease-out ${(index * 150) + (idx * 50) + 300}ms`
                      }}
                    >
                      <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover/item:scale-110">
                        <i className="ri-checkbox-circle-fill text-base sm:text-lg text-teal-500"></i>
                      </div>
                      <span className="text-xs sm:text-sm text-gray-700 transition-colors duration-300 group-hover/item:text-gray-900">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => { track('pricing_plan_clicked', { plan: plan.name }); openDemo(); }}
                  className={`relative w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold overflow-hidden transition-all whitespace-nowrap group/btn text-xs sm:text-sm md:text-base ${
                    plan.highlighted
                      ? 'bg-teal-500 text-white hover:shadow-lg hover:shadow-teal-500/30'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span>Get Started</span>
                    <i className="ri-arrow-right-line transition-transform group-hover/btn:translate-x-1"></i>
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div 
          className={`mt-8 sm:mt-10 lg:mt-12 text-center transition-all duration-700 delay-500 ${
            cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-xs sm:text-sm text-gray-600">
            Need a custom plan?{' '}
            <Link to="/contact" className="text-teal-600 font-semibold hover:text-teal-700 transition-colors relative group">
              <span>Contact our sales team</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
