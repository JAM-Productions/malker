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

  const renderDescription = () => {
    const urlRegex = /(http[s]?:\/\/[^\s]+)/gi;
    const urls = description.match(urlRegex);

    if (urls && urls.length > 0) {
      // Si hay URL(s), divide la descripción en partes antes y después de la URL
      const parts = description.split(urlRegex);
      return (
        <>
          {parts.map((part, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <a
                  href={urls[index - 1]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {urls[index - 1]}
                </a>
              )}
              {(urls[index - 1] !== part)&&(part)}
            </React.Fragment>
          ))}
        </>
      );
    } else {
      // Si no hay URL, renderiza el texto normal
      return <>{description}</>;
    }
  };


  return (
    <div className="container sm:px-5 px-0 pt-24 pb-10 mx-auto">
      <div className="flex flex-row justify-between sm:w-10/12 w-11/12 mx-auto">
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
        className="sm:w-10/12 w-11/12 mx-auto"
        style={{
          maxHeight: open ? descriptionHeight : "0",
          overflow: "hidden",
          transition: "max-height 0.4s ease-in-out",
        }}
      >
        <div ref={descriptionRef}>
          <hr className="mt-3 mb-5 border-0 h-px bg-slate-400"></hr>
          <p>{renderDescription()}</p>
          <p className="text-right mt-5">{author}</p>
        </div>
      </div>
    </div>
  );
};

export default DropdownPlan;
