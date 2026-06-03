import React, { lazy, Suspense } from 'react';
import { RouteObject, Navigate } from 'react-router-dom';

// Lazy‑load page components
const HomePage = lazy(() => import('../pages/home/page'));
const AboutPage = lazy(() => import('../pages/about/page'));
const BlogPage = lazy(() => import('../pages/blog/page'));
const ContactPage = lazy(() => import('../pages/contact/page'));
const SupportPage = lazy(() => import('../pages/support/page'));
const DocsPage = lazy(() => import('../pages/docs/page'));
const CookiePolicyPage = lazy(() => import('../pages/cookie-policy/page'));
const TermsOfServicePage = lazy(() => import('../pages/terms/page'));
const PrivacyPolicyPage = lazy(() => import('../pages/privacy-policy/page'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));
const DataDisposalPolicyPage = lazy(() => import('../pages/data-disposal-policy/page'));
const CaseStudiesPage = lazy(() => import('../pages/case-studies/page'));
const ArticlePage = lazy(() => import('../pages/blog/article/page'));
const FeaturePage = lazy(() => import('../pages/features/page'));
const FeaturesIndexPage = lazy(() => import('../pages/features/index/page'));
const ResourcesPage = lazy(() => import('../pages/resources/page'));
const ResourceDetailPage = lazy(() => import('../pages/resources/detail/page'));

// 404 handler for asset paths — prevents React from rendering app shell for build chunks
function Asset404() {
  return null;
}

const routes: RouteObject[] = [
  // Block direct access to build asset paths — these should be served as static files
  // If they reach the router, it means the file doesn't exist (stale cache/old deploy)
  {
    path: '/assets/*',
    element: <Asset404 />,
  },
  {
    path: '/',
    element: (
      <Suspense fallback={null}>
        <HomePage />
      </Suspense>
    ),
  },
  {
    path: '/about',
    element: (
      <Suspense fallback={null}>
        <AboutPage />
      </Suspense>
    ),
  },
  {
    path: '/blog',
    element: (
      <Suspense fallback={null}>
        <BlogPage />
      </Suspense>
    ),
  },
  {
    path: '/blog/:id',
    element: (
      <Suspense fallback={null}>
        <ArticlePage />
      </Suspense>
    ),
  },
  {
    path: '/resources',
    element: (
      <Suspense fallback={null}>
        <ResourcesPage />
      </Suspense>
    ),
  },
  {
    path: '/resources/:id',
    element: (
      <Suspense fallback={null}>
        <ResourceDetailPage />
      </Suspense>
    ),
  },
  {
    path: '/contact',
    element: (
      <Suspense fallback={null}>
        <ContactPage />
      </Suspense>
    ),
  },
  {
    path: '/support',
    element: (
      <Suspense fallback={null}>
        <SupportPage />
      </Suspense>
    ),
  },
  {
    path: '/docs',
    element: (
      <Suspense fallback={null}>
        <DocsPage />
      </Suspense>
    ),
  },
  {
    path: '/cookie-policy',
    element: (
      <Suspense fallback={null}>
        <CookiePolicyPage />
      </Suspense>
    ),
  },
  {
    path: '/terms',
    element: (
      <Suspense fallback={null}>
        <TermsOfServicePage />
      </Suspense>
    ),
  },
  {
    path: '/data-disposal-policy',
    element: (
      <Suspense fallback={null}>
        <DataDisposalPolicyPage />
      </Suspense>
    ),
  },
  {
    path: '/features',
    element: (
      <Suspense fallback={null}>
        <FeaturesIndexPage />
      </Suspense>
    ),
  },
  {
    path: '/features/:slug',
    element: (
      <Suspense fallback={null}>
        <FeaturePage />
      </Suspense>
    ),
  },
  {
    path: '/pricing',
    element: (
      <Suspense fallback={null}>
        <HomePage />
      </Suspense>
    ),
  },
  {
    path: '/case-studies',
    element: (
      <Suspense fallback={null}>
        <CaseStudiesPage />
      </Suspense>
    ),
  },
  {
    path: '/privacy-policy',
    element: (
      <Suspense fallback={null}>
        <PrivacyPolicyPage />
      </Suspense>
    ),
  },
  // ── Hreflang locale redirects ─────────────────────────────────────────
  // Redirect locale root paths and any sub-paths back to the English homepage.
  {
    path: '/fr',
    element: <Navigate to="/" replace />,
  },
  {
    path: '/fr/*',
    element: <Navigate to="/" replace />,
  },
  {
    path: '/ar',
    element: <Navigate to="/" replace />,
  },
  {
    path: '/ar/*',
    element: <Navigate to="/" replace />,
  },
  {
    path: '/pt',
    element: <Navigate to="/" replace />,
  },
  {
    path: '/pt/*',
    element: <Navigate to="/" replace />,
  },
  {
    path: '/sw',
    element: <Navigate to="/" replace />,
  },
  {
    path: '/sw/*',
    element: <Navigate to="/" replace />,
  },
  {
    path: '*',
    element: (
      <Suspense fallback={null}>
        <NotFoundPage />
      </Suspense>
    ),
  },
];

export default routes;