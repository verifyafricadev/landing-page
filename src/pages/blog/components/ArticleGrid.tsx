import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import ArticleCard from './ArticleCard';
import {
	NewspaperIcon,
} from "@phosphor-icons/react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
}

interface ArticleGridProps {
  articles: Article[];
}

export default function ArticleGrid({ articles }: ArticleGridProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.05 });

  const nonFeatured = articles.filter((a) => !a.featured);

  if (nonFeatured.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <NewspaperIcon className="text-2xl text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No articles found</h3>
        <p className="text-sm text-gray-400">Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div ref={ref} className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {nonFeatured.map((article, index) => (
        <ArticleCard
          key={article.id}
          id={article.id}
          title={article.title}
          excerpt={article.excerpt}
          category={article.category}
          author={article.author}
          date={article.date}
          readTime={article.readTime}
          image={article.image}
          index={index}
          isVisible={isVisible}
          delay={index * 80}
          priority={index === 0}
        />
      ))}
    </div>
  );
}
