import { Link } from 'react-router-dom';

interface ArticleCardProps {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  index?: number;
  isVisible: boolean;
  delay: number;
  /** When true, image is loaded eagerly with high fetchpriority (first card above fold) */
  priority?: boolean;
}

export default function ArticleCard({
  id,
  title,
  excerpt,
  category,
  author,
  date,
  readTime,
  image,
  isVisible,
  delay,
  priority = false,
}: ArticleCardProps) {
  const authorInitials = author
    ? author.trim().split(' ').filter(Boolean).map((n) => n[0]).join('')
    : '??';

  const imageUrl =
    image ||
    'https://readdy.ai/api/search-image?query=abstract%20compliance%20technology%20concept%20teal%20and%20dark%20green%20professional%20corporate%20clean%20minimalist%20background&width=400&height=225&seq=fallback-card&orientation=landscape';

  return (
    <Link
      to={`/blog/${id}`}
      className={`group block bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-500 cursor-pointer ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Explicit width/height prevents CLS; bg-gray-100 is the placeholder colour */}
      <div className="relative w-full h-48 overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={title}
          title={title}
          width={400}
          height={225}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'low'}
          decoding="async"
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-teal-700 text-xs font-semibold rounded-full">
            {category}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-teal-700 transition-colors leading-snug">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">{excerpt}</p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center">
              <span className="text-xs font-semibold text-teal-700">{authorInitials}</span>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-700">{author}</p>
              <p className="text-xs text-gray-400">{date}</p>
            </div>
          </div>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <i className="ri-time-line w-3.5 h-3.5 flex items-center justify-center"></i>
            {readTime}
          </span>
        </div>
      </div>
    </Link>
  );
}
