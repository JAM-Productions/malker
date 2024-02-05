import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';

const DropdownPlan = ({
  title,
  date,
  location,
  description,
  author
}) => {
  const [open, setOpen] = useState(true);
  const [descriptionHeight, setDescriptionHeight] = useState("auto");
  const descriptionRef = useRef(null);

  useEffect(() => {
    if (descriptionRef.current) {
      setDescriptionHeight(`${descriptionRef.current.scrollHeight + 10}px`);
    }
  }, [description]);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  return (
    <div className="container px-5 pt-24 pb-10 mx-auto">
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
                    duration-400
                    transform
                `}
                />
              </button>
            </div>
          </div>
          <div className="flex flex-row items-center mt-3 text-base gap-2">
            <div className="flex items-center text-base">
                <FaCalendar className="mr-2 text-gray-500" />
                <span>{date}</span>
            </div>
            <div className="flex items-center text-base">
                <FaMapMarkerAlt className="mr-2 text-gray-500" />
                <span>{location}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="w-10/12 mx-auto"
        style={{
          maxHeight: open ? descriptionHeight : "0",
          overflow: "hidden",
          transition: "max-height 0.4s ease-in-out",
        }}
      >
        <div ref={descriptionRef}>
          <hr className="mt-3 mb-5 border-0 h-px bg-slate-400"></hr>
          <p>{description}</p>
          <p className="text-right mt-5">{author}</p>
        </div>
      </div>
    </div>
  );
};

export default DropdownPlan;
