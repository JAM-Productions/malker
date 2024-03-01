import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdGeneratingTokens } from "react-icons/md";

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
        ">
        <div
          className="
            flex
            flex-row
            py-2
            border-b-[1px]
            border-blue-600
            cursor-pointer
          "
          onClick={() => navigate("/malker")}
        >
          <img
            src="/malker/malker.png"
            alt="Logo"
            className="h-8 w-8 mr-2"
          />
          <span
            className="
              text-white
              text-lg
              font-bold
              hover:text-blue-300
              transition-colors
              duration-300
              ease-in-out
            "
            style={{ fontFamily: 'Montserrat' }}
          >
            Malker
          </span>
        </div>
        <MdGeneratingTokens className='
          text-white
          text-2xl
          ml-2
          hover:text-blue-300
          transition-colors
          duration-300
          ease-in-out
          absolute
          right-5
          cursor-pointer
        '
          onClick={() => {
            //TODO: show dialog to enter token
          }}
        />
      </div>
    </div>
  );
};

export default Header;
