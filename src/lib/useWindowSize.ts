import { useEffect, useState } from 'react';

function getWindowSize() {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0 };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState(getWindowSize);

  useEffect(() => {
    function handleResize() {
      setWindowSize(getWindowSize());
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
