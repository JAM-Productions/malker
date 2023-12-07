import React from 'react';

const Header = () => {
  return (
    <div className="
      fixed 
      w-full 
      bg-blue-500
      z-10 
      shadow-sm  
    ">
      <div className="
        flex
        flex-row
        items-center
        justify-center
        py-2
        border-b-[1px]
        border-blue-600
      ">
        <img
          src="/malker.png" 
          alt="Logo"
          className="h-8 w-8 mr-2" 
        />
        <span className="
          text-white 
          text-lg 
          font-bold
        ">
          Malker
        </span>
      </div>
    </div>
  );
};

export default Header;
