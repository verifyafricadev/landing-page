import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import EmailGateModal from './EmailGateModal';
import { track } from '../../../lib/analytics';

export interface Resource {
  id: string;
  title: string;
  description: string;
  teaserContent: string[];
  gatedContent?: string[];
  pdfUrl?: string;
  icon: string;
  category: string;
  readTime: string;
  pages: string;
  isNew?: boolean;
  dateAdded?: string;
}

interface ResourceCardProps {
  resource: Resource;
  isUnlocked: boolean;
  onUnlock: (id: string) => void;
}

export default function ResourceCard({ resource, isUnlocked, onUnlock }: ResourceCardProps) {
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollAnimation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showGatedContent, setShowGatedContent] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://verifyafrica.io';
  const shareUrl = `${siteUrl}/resources/${resource.id}`;

  useEffect(() => {
    if (isVisible) {
      track('resource_viewed', {
        resource_id: resource.id,
        resource_title: resource.title,
      });
    }
  }, [isVisible, resource.id, resource.title]);

  const handleUnlock = (id: string, email: string) => {
    const domain = email.split('@')[1] || 'unknown';
    track('resource_unlocked', {
      resource_id: id,
      resource_title: resource.title,
      email_domain: domain,
    });
    onUnlock(id);
    setIsModalOpen(false);
    setShowGatedContent(true);
  };

  const handleDownload = () => {
    if (resource.pdfUrl) {
      track('resource_downloaded', {
        resource_id: resource.id,
        resource_title: resource.title,
        type: 'pdf',
      });
      window.open(resource.pdfUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleShare = useCallback((channel: 'linkedin' | 'twitter' | 'copy_link') => {
    track('resource_shared', {
      resource_id: resource.id,
      resource_title: resource.title,
      channel,
    });

    const text = encodeURIComponent(`Check out this free compliance resource: ${resource.title}`);
    const url = encodeURIComponent(shareUrl);

    if (channel === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener,noreferrer');
    } else if (channel === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'noopener,noreferrer');
    } else if (channel === 'copy_link') {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      });
    }
  }, [resource.id, resource.title, shareUrl]);

  const isPdfResource = !!resource.pdfUrl;

  return (
    <>
      <div
        id={resource.id}
        ref={ref}
        className={`bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-teal-500/5 hover:border-teal-100 scroll-mt-32 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Card Header */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <i className={`${resource.icon} text-xl text-teal-600`} />
            </div>
            <div className="flex items-center gap-2">
              {resource.isNew && (
                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full flex items-center gap-1">
                  <i className="ri-fire-line" />
                  Recently Added
                </span>
              )}
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                {resource.category}
              </span>
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug">
            {resource.title}
          </h3>
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
            {resource.description}
          </p>

          <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
            <span className="flex items-center gap-1">
              <i className="ri-time-line" />
              {resource.readTime}
            </span>
            <span className="flex items-center gap-1">
              <i className="ri-file-list-line" />
              {resource.pages}
            </span>
            {isPdfResource && (
              <span className="flex items-center gap-1 text-teal-600">
                <i className="ri-file-pdf-line" />
                PDF
              </span>
            )}
          </div>
        </div>

        {/* Teaser Content */}
        <div className="px-6 pb-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              What you will learn
            </p>
            <ul className="space-y-2">
              {resource.teaserContent.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                  <i className="ri-check-line text-teal-500 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Gated Content Preview (shown when unlocked for text resources) */}
        {isUnlocked && showGatedContent && !isPdfResource && resource.gatedContent && (
          <div className="px-6 pb-4">
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
              <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i className="ri-lock-unlock-line" />
                Full Actionable Content — Unlocked
              </p>
              <ul className="space-y-2">
                {resource.gatedContent.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <i className="ri-checkbox-circle-line text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* PDF Download Preview (shown when unlocked for PDF resources) */}
        {isUnlocked && isPdfResource && (
          <div className="px-6 pb-4">
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
              <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i className="ri-lock-unlock-line" />
                PDF Unlocked — Ready to Download
              </p>
              <p className="text-sm text-gray-600 mb-3">
                Your PDF is now available. Click below to download or view the full article.
              </p>
              <button
                onClick={handleDownload}
                className="w-full py-2.5 bg-emerald-500 text-white text-sm font-medium rounded-lg hover:bg-emerald-600 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <i className="ri-download-line" />
                Download PDF
              </button>
            </div>
          </div>
        )}

        {/* View Full Page + Share */}
        <div className="px-6 pb-3">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => navigate(`/resources/${resource.id}`)}
              className="text-sm text-teal-600 font-medium hover:text-teal-700 transition-colors cursor-pointer flex items-center gap-1"
            >
              View Full Page
              <i className="ri-arrow-right-line" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 mr-1">Share:</span>
            <button
              onClick={() => handleShare('linkedin')}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-[#0077b5] hover:text-white transition-all cursor-pointer"
              title="Share on LinkedIn"
            >
              <i className="ri-linkedin-fill" />
            </button>
            <button
              onClick={() => handleShare('twitter')}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-black hover:text-white transition-all cursor-pointer"
              title="Share on X/Twitter"
            >
              <i className="ri-twitter-x-fill" />
            </button>
            <button
              onClick={() => handleShare('copy_link')}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-teal-500 hover:text-white transition-all cursor-pointer relative"
              title="Copy direct link"
            >
              <i className={copiedLink ? 'ri-check-line' : 'ri-link'} />
              {copiedLink && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap">
                  Copied!
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div className="px-6 pb-6">
          {isUnlocked ? (
            isPdfResource ? (
              <button
                onClick={handleDownload}
                className="w-full py-3 bg-emerald-500 text-white text-sm font-medium rounded-lg hover:bg-emerald-600 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <i className="ri-download-line" />
                Download PDF
              </button>
            ) : (
              <button
                onClick={() => setShowGatedContent(!showGatedContent)}
                className="w-full py-3 bg-emerald-500 text-white text-sm font-medium rounded-lg hover:bg-emerald-600 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <i className={showGatedContent ? 'ri-eye-off-line' : 'ri-eye-line'} />
                {showGatedContent ? 'Hide Full Content' : 'View Full Content'}
              </button>
            )
          ) : (
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-3 bg-teal-500 text-white text-sm font-medium rounded-lg hover:bg-teal-600 transition-all cursor-pointer flex items-center justify-center gap-2 group"
            >
              <i className="ri-lock-line group-hover:hidden" />
              <i className="ri-lock-unlock-line hidden group-hover:inline" />
              {isPdfResource ? 'Unlock PDF Download' : 'Unlock Full Guide'}
            </button>
          )}
        </div>
      </div>

      <EmailGateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        resourceTitle={resource.title}
        resourceId={resource.id}
        onUnlock={handleUnlock}
      />
    </>
  );
}
