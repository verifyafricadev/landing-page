import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { featureDetails } from '@/mocks/featureDetails';
import Navbar from '@/pages/home/components/Navbar';
import Footer from '@/pages/home/components/Footer';
import { useDemoModal } from '@/hooks/useDemoModal';
import DemoRequestForm from '@/pages/home/components/DemoRequestForm';
import SEOHead from '@/components/feature/SEOHead';

const CATEGORIES = [
  { label: 'All Features', value: 'all' },
  { label: 'Identity & KYC', value: 'identity' },
  { label: 'Compliance & AML', value: 'compliance' },
  { label: 'Fraud & Risk', value: 'fraud' },
  { label: 'Monitoring', value: 'monitoring' },
];

const CATEGORY_MAP: Record<string, string[]> = {
  identity: ['identity-verification', 'business-verification-kyb', 'biometrics-liveness'],
  compliance: ['aml-sanctions-screening', 'address-verification-geolocation'],
  fraud: ['fraud-detection', 'transaction-risk-scoring'],
  monitoring: ['ongoing-monitoring'],
};

const FEATURE_COLORS: Record<string, { bg: string; icon: string; badge: string }> = {
  'identity-verification': { bg: 'from-teal-50 to-cyan-50', icon: 'bg-teal-100 text-teal-600', badge: 'bg-teal-100 text-teal-700' },
  'business-verification-kyb': { bg: 'from-emerald-50 to-teal-50', icon: 'bg-emerald-100 text-emerald-600', badge: 'bg-emerald-100 text-emerald-700' },
  'aml-sanctions-screening': { bg: 'from-orange-50 to-amber-50', icon: 'bg-orange-100 text-orange-600', badge: 'bg-orange-100 text-orange-700' },
  'fraud-detection': { bg: 'from-rose-50 to-pink-50', icon: 'bg-rose-100 text-rose-600', badge: 'bg-rose-100 text-rose-700' },
  'biometrics-liveness': { bg: 'from-violet-50 to-purple-50', icon: 'bg-violet-100 text-violet-600', badge: 'bg-violet-100 text-violet-700' },
  'address-verification-geolocation': { bg: 'from-sky-50 to-blue-50', icon: 'bg-sky-100 text-sky-600', badge: 'bg-sky-100 text-sky-700' },
  'transaction-risk-scoring': { bg: 'from-amber-50 to-yellow-50', icon: 'bg-amber-100 text-amber-600', badge: 'bg-amber-100 text-amber-700' },
  'ongoing-monitoring': { bg: 'from-green-50 to-emerald-50', icon: 'bg-green-100 text-green-600', badge: 'bg-green-100 text-green-700' },
};

const CATEGORY_LABEL_MAP: Record<string, string> = {
  'identity-verification': 'Identity & KYC',
  'business-verification-kyb': 'Identity & KYC',
  'aml-sanctions-screening': 'Compliance & AML',
  'fraud-detection': 'Fraud & Risk',
  'biometrics-liveness': 'Identity & KYC',
  'address-verification-geolocation': 'Compliance & AML',
  'transaction-risk-scoring': 'Fraud & Risk',
  'ongoing-monitoring': 'Monitoring',
};

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://verifyafrica.io';

const featuresIndexSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/features#webpage`,
    name: 'Platform Features – KYC, AML, Biometrics & KYB for Africa | VerifyAfrica',
    url: `${SITE_URL}/features`,
    description:
      'Explore all VerifyAfrica platform capabilities: identity verification, KYB, AML screening, biometrics, fraud detection, address verification, transaction risk scoring, and ongoing monitoring across all 54 African countries.',
    inLanguage: 'en',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    dateModified: new Date().toISOString().split('T')[0],
    publisher: { '@id': `${SITE_URL}/#organization` },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Features', item: `${SITE_URL}/features` },
      ],
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'VerifyAfrica Platform Features',
    url: `${SITE_URL}/features`,
    numberOfItems: 8,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Identity Verification', url: `${SITE_URL}/features/identity-verification` },
      { '@type': 'ListItem', position: 2, name: 'Business Verification (KYB)', url: `${SITE_URL}/features/business-verification-kyb` },
      { '@type': 'ListItem', position: 3, name: 'AML & Sanctions Screening', url: `${SITE_URL}/features/aml-sanctions-screening` },
      { '@type': 'ListItem', position: 4, name: 'Fraud Detection', url: `${SITE_URL}/features/fraud-detection` },
      { '@type': 'ListItem', position: 5, name: 'Biometrics & Liveness', url: `${SITE_URL}/features/biometrics-liveness` },
      { '@type': 'ListItem', position: 6, name: 'Address Verification & Geolocation', url: `${SITE_URL}/features/address-verification-geolocation` },
      { '@type': 'ListItem', position: 7, name: 'Transaction Risk Scoring', url: `${SITE_URL}/features/transaction-risk-scoring` },
      { '@type': 'ListItem', position: 8, name: 'Ongoing Monitoring', url: `${SITE_URL}/features/ongoing-monitoring` },
    ],
  },
];

export default function FeaturesIndexPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const { isOpen, open, close } = useDemoModal();

  const filtered = useMemo(() => {
    let list = featureDetails;

    if (activeCategory !== 'all') {
      const slugs = CATEGORY_MAP[activeCategory] ?? [];
      list = list.filter((f) => slugs.includes(f.slug));
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (f) =>
          f.title.toLowerCase().includes(q) ||
          f.description.toLowerCase().includes(q) ||
          f.tagline.toLowerCase().includes(q) ||
          f.capabilities.some((c) => c.title.toLowerCase().includes(q))
      );
    }

    return list;
  }, [search, activeCategory]);

  return (
    <>
      <SEOHead
        title="Platform Features – KYC, AML, Biometrics & KYB for Africa | VerifyAfrica"
        description="Explore all VerifyAfrica platform capabilities: identity verification, KYB, AML screening, biometrics, fraud detection, address verification, transaction risk scoring, and ongoing monitoring across all 54 African countries."
        keywords="KYC features Africa, AML screening platform, identity verification API, biometrics Africa, KYB business verification, fraud detection Africa"
        canonical="/features"
        image="https://readdy.ai/api/search-image?query=compliance%20platform%20features%20overview%20grid%20teal%20emerald%20abstract%20technology%20icons%20identity%20verification%20AML%20biometrics%20fraud%20detection%20professional%20corporate%20clean%20minimal%20background%20Africa%20fintech&width=1200&height=630&seq=og-features-index-v1&orientation=landscape"
        twitterCard="summary_large_image"
        schema={featuresIndexSchema}
      />
      <Navbar onRequestDemo={open} />
      <DemoRequestForm isOpen={isOpen} onClose={close} />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl" />
          <div className="absolute top-32 -left-16 w-64 h-64 bg-cyan-100/30 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-50 border border-teal-100 rounded-full text-teal-600 text-xs font-semibold tracking-wide uppercase mb-6">
              <i className="ri-apps-2-line text-sm" />
              Platform Capabilities
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-5">
              Everything You Need to{' '}
              <span className="text-teal-500">Verify Africa</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              A single compliance and identity platform covering every verification need — from KYC to AML, biometrics to transaction risk.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={open}
                className="px-7 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-all whitespace-nowrap cursor-pointer"
              >
                Request a Demo
              </button>
              <Link
                to="/docs"
                className="px-7 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-teal-400 hover:text-teal-600 transition-all whitespace-nowrap text-center"
              >
                Read API Docs
              </Link>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: '8', label: 'Core Products' },
              { value: '54', label: 'African Countries' },
              { value: '<3s', label: 'Average Check Time' },
              { value: '99.9%', label: 'API Uptime' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white border border-gray-100 rounded-xl p-5 text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-teal-500 mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="sticky top-16 sm:top-20 lg:top-28 z-30 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-0 w-full sm:max-w-xs">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search features…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent placeholder:text-gray-400"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-sm" />
                </button>
              )}
            </div>

            {/* Category pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                    activeCategory === cat.value
                      ? 'bg-teal-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-teal-50 hover:text-teal-600'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Result count */}
            <div className="text-xs text-gray-400 whitespace-nowrap ml-auto hidden sm:block">
              {filtered.length} of {featureDetails.length} features
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-16 h-16 flex items-center justify-center mx-auto bg-gray-100 rounded-2xl mb-4">
                <i className="ri-search-line text-3xl text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No features match your search</h3>
              <p className="text-sm text-gray-400 mb-6">Try a different keyword or clear your filters.</p>
              <button
                onClick={() => { setSearch(''); setActiveCategory('all'); }}
                className="px-5 py-2 bg-teal-500 text-white text-sm font-medium rounded-lg hover:bg-teal-600 transition-all cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filtered.map((feature) => {
                const colors = FEATURE_COLORS[feature.slug] ?? { bg: 'from-teal-50 to-cyan-50', icon: 'bg-teal-100 text-teal-600', badge: 'bg-teal-100 text-teal-700' };
                const categoryLabel = CATEGORY_LABEL_MAP[feature.slug] ?? '';
                return (
                  <Link
                    key={feature.slug}
                    to={`/features/${feature.slug}`}
                    className="group relative flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:border-teal-200 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(20,184,166,0.12)]"
                  >
                    {/* Top gradient band */}
                    <div className={`h-2 bg-gradient-to-r ${colors.bg.replace('from-', 'from-').replace('to-', 'to-')} w-full`} />

                    <div className="flex flex-col sm:flex-row gap-5 p-6">
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-xl ${colors.icon}`}>
                        <i className={`${feature.icon} text-2xl`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h2 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors leading-snug">
                            {feature.title}
                          </h2>
                          <span className={`flex-shrink-0 text-[10px] font-semibold px-2 py-1 rounded-full ${colors.badge} hidden sm:inline-flex`}>
                            {categoryLabel}
                          </span>
                        </div>
                        <p className="text-sm text-teal-600 font-medium mb-2 italic">{feature.tagline}</p>
                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{feature.description}</p>

                        {/* Stats preview */}
                        <div className="flex items-center gap-4 mt-4 flex-wrap">
                          {feature.stats.slice(0, 3).map((stat) => (
                            <div key={stat.label} className="flex items-center gap-1.5">
                              <span className="text-sm font-bold text-gray-800">{stat.value}</span>
                              <span className="text-xs text-gray-400">{stat.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Capabilities preview */}
                    <div className="px-6 pb-5 mt-auto">
                      <div className="border-t border-gray-50 pt-4">
                        <div className="flex items-center flex-wrap gap-2">
                          {feature.capabilities.slice(0, 4).map((cap) => (
                            <span
                              key={cap.title}
                              className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100"
                            >
                              <i className={`${cap.icon} text-[10px]`} />
                              {cap.title}
                            </span>
                          ))}
                          {feature.capabilities.length > 4 && (
                            <span className="text-xs text-gray-400">+{feature.capabilities.length - 4} more</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="absolute bottom-5 right-5 w-8 h-8 flex items-center justify-center bg-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                      <i className="ri-arrow-right-up-line text-white text-sm" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-r from-teal-500 to-cyan-500">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Ready to start verifying?
          </h2>
          <p className="text-teal-50 text-base mb-8">
            Talk to our team and get a live demo of any feature tailored to your use case.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={open}
              className="px-8 py-3 bg-white text-teal-600 font-bold rounded-lg hover:bg-teal-50 transition-all whitespace-nowrap cursor-pointer"
            >
              Request Demo
            </button>
            <a
              href="https://dashboard.verifyafrica.io/login"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-white/60 text-white font-semibold rounded-lg hover:bg-white/10 transition-all whitespace-nowrap text-center"
            >
              Explore Dashboard
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
