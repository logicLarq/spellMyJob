'use client';

import { useEffect, useState } from 'react';

const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    const scrolled = (scrollTop / docHeight) * 100;
    setScrollProgress(scrolled);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${scrollProgress}%`,
        height: '5px',
        backgroundColor: '#ef9f5a', // Tomato color
        zIndex: 9999,
        transition: 'width 0.2s ease',
      }}
    />
  );
};

export default ScrollProgressBar;
