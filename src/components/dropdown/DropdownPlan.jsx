import React, { useState } from "react";
import { FaChevronDown } from 'react-icons/fa';

const DropdownPlan = ({
  title,
  date,
  location,
  description,
  author
}) => {
  const [open, setOpen] = useState(true);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  return (
    <div className="container px-5 pt-20 pb-10 mx-auto">
      <div className="flex flex-row justify-between w-10/12 mx-auto">
        <div className="flex flex-col">
          <div className="flex flex-row items-center">
            <h1 className="text-2xl font-medium text-gray-900">{title}</h1>
            <div className="flex ml-3">
              <button className="align-self-end" onClick={toggleDropdown}>
                <FaChevronDown
                  className={`
                    h-5
                    w-5
                    text-blue-500
                    hover:text-blue-600
                    ${open ? 'rotate-180' : 'rotate-0'}
                    transition-transform
                    duration-300
                    transform
                `}/>
              </button>
            </div>
          </div>
          <p className="mt-3 text-base">{date} - {location}</p>
        </div>
      </div>
      {open && (
        <div className="flex flex-col w-10/12 mx-auto">
          <hr className="mt-3 mb-5 border-0 h-px bg-slate-400"></hr>
          <p>{description}</p>
          <p className="text-right mt-5">{author}</p>
        </div>
      )}
    </div>
  );
};

export default DropdownPlan;
