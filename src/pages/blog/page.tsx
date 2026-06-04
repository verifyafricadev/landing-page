import { useState, useMemo, lazy, Suspense, useEffect } from 'react';
import { useDemoModal } from '../../hooks/useDemoModal';
import Navbar from '@/pages/home/components/Navbar';
import BlogHero from './components/BlogHero';
import SEOHead from '../../components/feature/SEOHead';
import BackToTop from '../../components/feature/BackToTop';
import { blogArticles } from '../../mocks/blogArticles';

// Lazy-load everything below the hero
const BlogFilters = lazy(() => import('./components/BlogFilters'));
const ArticleGrid = lazy(() => import('./components/ArticleGrid'));
const BlogSidebar = lazy(() => import('./components/BlogSidebar'));
const BlogCTA = lazy(() => import('./components/BlogCTA'));
const Footer = lazy(() => import('../../components/feature/Footer'));

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://verifyafrica.io';

const blogSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE_URL}/blog#webpage`,
    name: 'VerifyAfrica Blog – KYC, AML & Compliance Insights for Africa',
    url: `${SITE_URL}/blog`,
    description:
      'Insights, guides, and updates on KYC, AML, identity verification, and compliance across Africa.',
    inLanguage: 'en',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    dateModified: new Date().toISOString().split('T')[0],
    publisher: { '@id': `${SITE_URL}/#organization` },
    breadcrumb: { '@id': `${SITE_URL}/blog#breadcrumb` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'VerifyAfrica Blog Articles',
    description: 'Expert articles on KYC, AML, identity verification, and compliance across Africa.',
    url: `${SITE_URL}/blog`,
    numberOfItems: blogArticles.length,
    itemListElement: blogArticles.map((article, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}/blog/${article.id}`,
      name: article.title,
      description: article.excerpt,
      image: article.image,
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}/blog#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
    ],
  },
];

function preloadFeaturedImage(src: string) {
  if (!src || document.querySelector(`link[rel="preload"][href="${src}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All Articles');
  const [searchQuery, setSearchQuery] = useState('');
  const { openDemo } = useDemoModal();

  useEffect(() => {
    const featured = blogArticles.find((a) => a.featured);
    if (featured?.image) preloadFeaturedImage(featured.image);
  }, []);

  const filteredArticles = useMemo(() => {
    let results = blogArticles;
    if (activeCategory !== 'All Articles') {
      results = results.filter((a) => a.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.author.toLowerCase().includes(q)
      );
    }
    return results;
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title="Blog – KYC, AML & Compliance Insights for Africa | VerifyAfrica"
        description="Explore VerifyAfrica's blog for expert articles on KYC compliance, AML screening, identity verification trends, and regulatory updates across African markets."
        keywords="KYC blog Africa, AML compliance articles, identity verification insights, African fintech compliance news"
        canonical="/blog"
        image="https://readdy.ai/api/search-image?query=editorial%20compliance%20insights%20blog%20KYC%20AML%20Africa%20abstract%20concept%20open%20book%20with%20digital%20data%20streams%20teal%20and%20dark%20green%20tones%20professional%20journalism%20regulatory%20knowledge%20clean%20minimalist%20background&width=1200&height=630&seq=og-blog-v1&orientation=landscape"
        twitterCard="summary_large_image"
        schema={blogSchema}
      />
      <Navbar onRequestDemo={openDemo} variant="solid" />

      {/* Above-fold — always eager */}
      <BlogHero />

      {/* Filters — lazy but small, loads fast */}
      <Suspense fallback={<div className="h-16 bg-white border-b border-gray-100" />}>
        <BlogFilters
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </Suspense>

      {/* Main content grid */}
      <div
        className="max-w-7xl mx-auto px-6 lg:px-12 pb-20"
        style={{ contentVisibility: 'auto', containIntrinsicSize: '0 1200px' }}
      >
        <div className="grid lg:grid-cols-[1fr_320px] gap-10">
          <Suspense fallback={<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-72 bg-white rounded-xl border border-gray-100 animate-pulse" />)}</div>}>
            <ArticleGrid articles={filteredArticles} />
          </Suspense>
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <Suspense fallback={<div className="h-64 bg-white rounded-xl" />}>
                <BlogSidebar />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      <Suspense fallback={null}>
        <div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 300px' }}>
          <BlogCTA />
        </div>
      </Suspense>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <BackToTop />
    </div>
  );
}
