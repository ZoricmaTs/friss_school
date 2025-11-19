import { useState, useEffect } from 'react';

export function useScreen() {
  const [{width, height}, setScreen] = useState({width: window.innerWidth, height: window.innerHeight});

  useEffect(() => {
    const handleResize = () => setScreen({width: window.innerWidth, height: window.innerHeight});
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {width, height};
}