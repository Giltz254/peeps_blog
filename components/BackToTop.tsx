"use client";
import { useState, useEffect } from 'react';
import { BiChevronUp } from 'react-icons/bi';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className='fixed bottom-10 right-10 z-10'>
      {isVisible && (
        <button
          className="relative flex items-center justify-center w-11 h-11 bg-gradient-to-r from-primary to-primary/70 rounded-full cursor-pointer border-0 ring-2 ring-primary/40 group"
          onClick={scrollToTop}
        >
          <BiChevronUp className="text-white h-6 w-6" />
          <p className="absolute bottom-[-18px] w-24 text-xs text-primary opacity-0 transition-opacity duration-700 group-hover:opacity-100 flex items-center justify-center">
            Back to Top
          </p>
        </button>
      )}
    </div>
  );
};

export default BackToTop;
