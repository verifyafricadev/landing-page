import { useEffect, useRef, useState } from 'react';

interface UseLazyImageOptions {
  /** Root margin for the IntersectionObserver — default loads 200px before entering viewport */
  rootMargin?: string;
  threshold?: number;
}

/**
 * useLazyImage — returns a ref to attach to an <img> wrapper and a boolean
 * indicating whether the image should be loaded yet.
 *
 * Usage:
 *   const { ref, shouldLoad } = useLazyImage();
 *   <div ref={ref}>
 *     {shouldLoad && <img src={src} ... />}
 *   </div>
 *
 * Or use the `src` helper:
 *   <img src={shouldLoad ? realSrc : undefined} ref={imgRef} ... />
 */
export function useLazyImage(options: UseLazyImageOptions = {}) {
  const { rootMargin = '200px 0px', threshold = 0 } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If already in viewport on mount (e.g. above-fold), load immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 200) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return { ref, shouldLoad };
}
