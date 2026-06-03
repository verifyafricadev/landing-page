import { memo } from 'react';
import { Link } from 'react-router-dom';

interface ArticleHeroProps {
  category: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  /** Card-sized image (400×225) — used as fallback */
  image: string;
  /** Article page hero image (896×384) — higher res, used on article page */
  heroImage?: string;
}

const ArticleHero = memo(function ArticleHero({
  category,
  title,
  excerpt,
  author,
  authorRole,
  date,
  readTime,
  image,
  heroImage,
}: ArticleHeroProps) {
  const authorInitials = author
    ? author.trim().split(' ').filter(Boolean).map((n) => n[0]).join('')
    : '??';

  // Prefer the dedicated hero image (correct dimensions); fall back to card image
  const displayImage = heroImage || image;

  return (
    <section className="pt-24 pb-0 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Category badge */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full">
            {category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
          {title}
        </h1>

        {/* Excerpt */}
        <p className="text-lg text-gray-500 leading-relaxed mb-8">{excerpt}</p>

        {/* Author + meta */}
        <div className="flex items-center justify-between pb-8 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-teal-700">{authorInitials}</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{author}</p>
              <p className="text-xs text-gray-400">{authorRole}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <i className="ri-calendar-line w-3.5 h-3.5 flex items-center justify-center"></i>
              {date}
            </span>
            <span className="flex items-center gap-1">
              <i className="ri-time-line w-3.5 h-3.5 flex items-center justify-center"></i>
              {readTime}
            </span>
          </div>
        </div>
      </div>

      {/* Cover image — LCP element: eager + high priority + explicit dimensions */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 mt-8">
        <div className="w-full h-72 lg:h-96 rounded-2xl overflow-hidden bg-gray-100">
          <img
            src={displayImage}
            alt={title}
            title={title}
            width={896}
            height={384}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
});

export default ArticleHero;
