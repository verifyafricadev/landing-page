import { useState, useEffect, useCallback } from 'react';

type SafeImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

/**
 * SafeImage — clean image loader with load tracking and a styled fallback.
 *
 * Features:
 * 1. Resets state when `src` prop changes (no stale images)
 * 2. Tracks `onLoad` so the image only fades in after it successfully decodes
 * 3. Shows a styled gradient placeholder if the image fails to load
 */
export default function SafeImage({
  src,
  alt,
  className,
  style,
  ...rest
}: SafeImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [retrySrc, setRetrySrc] = useState<string | null>(null);

  const currentSrc = retrySrc || src;

  // Reset whenever the effective source changes
  useEffect(() => {
    setLoaded(false);
    setFailed(false);
  }, [src, retrySrc]);

  const handleLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    // Async image APIs sometimes return HTTP 200 with a blank 1×1 transparent placeholder
    // while generation is queued. Detect this and force a regeneration retry.
    if (img.naturalWidth <= 1 || img.naturalHeight <= 1) {
      if (!retrySrc && src && src.includes('readdy.ai')) {
        const separator = src.includes('?') ? '&' : '?';
        setRetrySrc(`${src}${separator}nocache=true`);
        return;
      }
      setFailed(true);
      setLoaded(false);
    } else {
      setLoaded(true);
      setFailed(false);
    }
  }, [retrySrc, src]);

  const handleError = useCallback(() => {
    setFailed(true);
    setLoaded(false);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {!failed && (
        <img
          key={currentSrc}
          src={currentSrc}
          alt={alt || ''}
          onError={handleError}
          onLoad={handleLoad}
          className={`${className || ''} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`.trim()}
          style={style}
          {...rest}
        />
      )}
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 flex items-center justify-center text-gray-300">
              <i className="ri-image-line text-2xl" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}