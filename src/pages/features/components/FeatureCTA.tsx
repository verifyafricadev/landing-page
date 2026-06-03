import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function FeatureCTA() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 md:py-24 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-base sm:text-lg text-white/70 mb-10 max-w-xl mx-auto">
            Join hundreds of African businesses using VerifyAfrica to stay compliant and grow faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              Request a Demo
              <i className="ri-arrow-right-line" />
            </Link>
            <a
              href="https://dashboard.verifyafrica.io/login"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 hover:border-white/60 text-white font-semibold rounded-lg transition-all duration-300 whitespace-nowrap cursor-pointer hover:bg-white/10"
            >
              Explore Dashboard
            </a>
          </div>


        </div>
      </div>
    </section>
  );
}
