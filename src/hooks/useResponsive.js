import { useState, useEffect } from 'react';

const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  const [device, setDevice] = useState('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenSize({ width, height });
      
      // Determine device type based on Tailwind breakpoints
      if (width < 640) {
        setDevice('mobile');
      } else if (width < 768) {
        setDevice('tablet-sm');
      } else if (width < 1024) {
        setDevice('tablet');
      } else if (width < 1280) {
        setDevice('desktop');
      } else {
        setDevice('desktop-lg');
      }
    };

    // Set initial values
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    ...screenSize,
    device,
    isMobile: device === 'mobile',
    isTablet: device === 'tablet-sm' || device === 'tablet',
    isDesktop: device === 'desktop' || device === 'desktop-lg',
    isSmallScreen: device === 'mobile' || device === 'tablet-sm',
    isLargeScreen: device === 'desktop' || device === 'desktop-lg'
  };
};

export default useResponsive;