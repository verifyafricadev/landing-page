import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import { blogArticles } from '../../../mocks/blogArticles';

export default function BlogHero() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: cardRef, isVisible: cardVisible } = useScrollAnimation({ threshold: 0.1 });

  const featured = blogArticles.find((a) => a.featured);

  return (
    <section className="pt-28 pb-16 bg-gradient-to-b from-teal-50/60 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          ref={titleRef}
          className={`mb-12 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 text-xs font-semibold rounded-full">
              Resources
            </span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-500">{blogArticles.length} articles</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Compliance Insights <br className="hidden lg:block" />
            <span className="text-teal-600">&amp; Resources</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            Expert analysis, regulatory updates, and practical guides to help you navigate
            Africa&apos;s compliance landscape with confidence.
          </p>
        </div>

        {featured && (
          <div
            ref={cardRef}
            className={`transition-all duration-700 delay-200 ${
              cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Link
              to={`/blog/${featured.id}`}
              className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="grid lg:grid-cols-2">
                {/* bg-gray-100 = placeholder colour while image loads */}
                <div className="relative w-full h-64 lg:h-80 overflow-hidden bg-gray-100">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    title={featured.title}
                    width={800}
                    height={450}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-teal-500 text-white text-xs font-semibold rounded-full">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-3">
                    {featured.category}
                  </span>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-teal-700 transition-colors leading-snug">
                    {featured.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center">
                        <span className="text-sm font-semibold text-teal-700">
                          {featured.author.split(' ').map((n) => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{featured.author}</p>
                        <p className="text-xs text-gray-400">{featured.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <i className="ri-time-line w-4 h-4 flex items-center justify-center"></i>
                      <span>{featured.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
