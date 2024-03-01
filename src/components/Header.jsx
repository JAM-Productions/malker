import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = currentScrollPos < prevScrollPos;

      setIsScrolled(!(isScrollingUp || currentScrollPos === 0));
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <div
      className={`
        fixed
        w-full
        bg-blue-500
        z-10
        shadow-sm
        transition-transform
        transform
        ${isScrolled ? '-translate-y-full' : 'translate-y-0'}
        transition-all
        duration-500
      `}
    >
      <div
        className="
          flex
          flex-row
          items-center
          justify-center
          py-2
          border-b-[1px]
          border-blue-600
          cursor-pointer
        "
        onClick={() => navigate("/malker")}
      >
        <img
          src="/malker/malker.webp"
          alt="Logo"
          className="h-8 w-8 mr-2"
        />
        <span
          className="
            text-white
            text-lg
            font-bold
          "
          style={{ fontFamily: 'Montserrat' }}
        >
          Malker
        </span>
      </div>
    </div>
  );
};

export default Header;
