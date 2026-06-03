import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import { useDemoModal } from '../../../hooks/useDemoModal';

export default function BlogCTA() {
  const { ref, isVisible } = useScrollAnimation();
  const { openDemo } = useDemoModal();

  return (
    <section className="py-20 bg-gradient-to-br from-teal-50 to-emerald-50">
      <div
        ref={ref}
        className={`max-w-3xl mx-auto px-6 text-center transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="w-14 h-14 mx-auto mb-6 bg-teal-100 rounded-2xl flex items-center justify-center">
          <i className="ri-shield-check-line text-2xl text-teal-600"></i>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to Simplify Your Compliance?
        </h2>
        <p className="text-gray-500 mb-8 max-w-xl mx-auto leading-relaxed">
          Join 500+ companies across 54 African countries using VerifyAfrica to automate
          identity verification, AML screening, and regulatory compliance.
        </p>
        <div className="flex items-center justify-center">
          <button
            onClick={openDemo}
            className="px-8 py-3 bg-teal-500 text-white text-sm font-medium rounded-lg hover:bg-teal-600 transition-all whitespace-nowrap cursor-pointer shadow-sm"
          >
            Request a Demo
          </button>
        </div>
      </div>
    </section>
  );
}
