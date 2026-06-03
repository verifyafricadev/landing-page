import { useEffect, useRef, useState, useCallback } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', triggerOnce = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

// Hook for animating multiple refs with staggered delays
export function useMultipleScrollAnimation(
  count: number,
  options: UseScrollAnimationOptions & { staggerDelay?: number } = {}
) {
  const { staggerDelay = 100, ...scrollOptions } = options;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (scrollOptions.triggerOnce !== false) {
            observer.unobserve(element);
          }
        } else if (scrollOptions.triggerOnce === false) {
          setIsVisible(false);
        }
      },
      { 
        threshold: scrollOptions.threshold || 0.1, 
        rootMargin: scrollOptions.rootMargin || '0px 0px -50px 0px' 
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [scrollOptions.threshold, scrollOptions.rootMargin, scrollOptions.triggerOnce]);

  const getItemStyle = useCallback((index: number) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
    transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * staggerDelay}ms`
  }), [isVisible, staggerDelay]);

  const getItemClass = useCallback((index: number, baseClass: string = '') => {
    return `${baseClass} transition-all duration-600`;
  }, []);

  return { containerRef, isVisible, getItemStyle, getItemClass };
}

export function useStaggerAnimation(itemCount: number, baseDelay: number = 100) {
  const { ref, isVisible } = useScrollAnimation();
  
  const getDelay = (index: number) => index * baseDelay;
  
  return { ref, isVisible, getDelay };
}

// Easing functions for smooth animations
const easings = {
  easeOutCubic: (t: number) => 1 - Math.pow(1 - t, 3),
  easeOutQuart: (t: number) => 1 - Math.pow(1 - t, 4),
  easeOutQuint: (t: number) => 1 - Math.pow(1 - t, 5),
  easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  easeInOutQuart: (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2,
  easeOutExpo: (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
};

type EasingType = keyof typeof easings;

interface SmoothScrollOptions {
  duration?: number;
  easing?: EasingType;
  offset?: number;
}

// Smooth scroll to element with custom easing
export function smoothScrollTo(
  target: string | HTMLElement | number,
  options: SmoothScrollOptions = {}
) {
  const { duration = 1000, easing = 'easeOutQuart', offset = -100 } = options;
  
  let targetPosition: number;
  
  if (typeof target === 'number') {
    targetPosition = target;
  } else if (typeof target === 'string') {
    const element = document.querySelector(target);
    if (!element) return;
    targetPosition = element.getBoundingClientRect().top + window.scrollY + offset;
  } else {
    targetPosition = target.getBoundingClientRect().top + window.scrollY + offset;
  }
  
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  const startTime = performance.now();
  const easingFn = easings[easing];
  
  function animateScroll(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easingFn(progress);
    
    window.scrollTo(0, startPosition + distance * easedProgress);
    
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  }
  
  requestAnimationFrame(animateScroll);
}

// Hook for smooth scroll navigation
export function useSmoothScroll() {
  const scrollTo = useCallback((
    target: string | HTMLElement | number,
    options?: SmoothScrollOptions
  ) => {
    smoothScrollTo(target, options);
  }, []);
  
  const scrollToTop = useCallback((duration = 800) => {
    smoothScrollTo(0, { duration, easing: 'easeOutCubic' });
  }, []);
  
  const scrollToSection = useCallback((sectionId: string, options?: SmoothScrollOptions) => {
    smoothScrollTo(sectionId, { 
      duration: 1200, 
      easing: 'easeInOutQuart',
      offset: -80,
      ...options 
    });
  }, []);
  
  return { scrollTo, scrollToTop, scrollToSection };
}

// Counter animation hook
export function useCounterAnimation(
  endValue: number,
  duration: number = 2000,
  startOnVisible: boolean = true
) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.5 });

  useEffect(() => {
    if (startOnVisible && !isVisible) return;
    if (hasStarted) return;

    setHasStarted(true);
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, endValue, duration, startOnVisible, hasStarted]);

  return { ref, count, isVisible };
}

// Parallax scroll effect
export function useParallax(speed: number = 0.5) {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.innerHeight - rect.top;
      setOffset(scrolled * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref, offset };
}

// Mouse follow effect
export function useMouseFollow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setPosition({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return { ref, position };
}

// Active section tracking for navigation highlighting
export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    sectionIds.forEach((id) => {
      const element = document.querySelector(id);
      if (!element) return;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3, rootMargin: '-20% 0px -60% 0px' }
      );
      
      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sectionIds]);

  return activeSection;
}
