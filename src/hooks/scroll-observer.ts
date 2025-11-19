import React, {useEffect, useRef} from 'react';

export function useScrollObserver(element: React.RefObject<HTMLElement | null>, onVisibilityChange: (options: {
  value: boolean,
  isScrollingDown: boolean
}) => void) {
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onVisibilityChange({
          value: true,
          isScrollingDown: entry.boundingClientRect.bottom > entry.intersectionRect.bottom,
        });
      } else {
        onVisibilityChange({
          value: false,
          isScrollingDown: entry.boundingClientRect.top < 0,
        });
      }
    });

    if (element.current) observer.observe(element.current);

    return () => observer.disconnect();
  }, [element]);
}

export function useScrollHider<T extends HTMLElement>(customElementRef?: React.RefObject<T>): React.RefObject<T | null> {
  const synthRef = useRef<T>(null);
  const elementRef = customElementRef || synthRef;

  useEffect(() => {
    elementRef.current?.classList.add('scroll-animate');
  }, []);

  useScrollObserver(elementRef, options => {
    if (options.value) {
      elementRef.current?.classList.remove('hide-bottom')
      elementRef.current?.classList.remove('hide-top')
    } else {
      if (options.isScrollingDown) {
        elementRef.current?.classList.add('hide-top')
      } else {
        elementRef.current?.classList.add('hide-bottom')
      }
    }
  });

  return elementRef;
}