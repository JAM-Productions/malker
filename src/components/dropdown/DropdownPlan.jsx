import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaCalendar, FaMapMarkerAlt } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { toast } from "react-toastify";

const DropdownPlan = ({ title, date, location, description, author }) => {
    const [open, setOpen] = useState(true);
    const [descriptionHeight, setDescriptionHeight] = useState("auto");
    const descriptionRef = useRef(null);

    useEffect(() => {
        if (descriptionRef.current) {
            setDescriptionHeight(`${descriptionRef.current.scrollHeight + 21}px`);
        }
    }, [description]);

    const toggleDropdown = () => {
        setOpen(!open);
    };

    const renderDescription = () => {
        const urlRegex = /(http[s]?:\/\/[^\s]+)/gi;
        const urls = description.match(urlRegex);

        if (urls && urls.length > 0) {
            const parts = description.split(urlRegex);
            return (
                <>
                    {parts.map((part, index) => (
                        <React.Fragment key={index}>
                            {index > 0 && (
                                <a
                                    href={urls[index - 1]}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='text-blue-500 hover:underline'>
                                    {urls[index - 1]}
                                </a>
                            )}
                            {urls[index - 1] !== part && part}
                        </React.Fragment>
                    ))}
                </>
            );
        } else {
            return <p>{description}</p>;
        }
    };

    const onShare = () => {
        const actualURL = window.location.href;

        if (navigator.share) {
            navigator
                .share({
                    title: title,
                    url: actualURL,
                })
                .then(() => {
                    console.log("Successfully shared");
                })
                .catch((error) => {
                    console.error("Error sharing:", error);
                });
        } else {
            copyToClipboard(actualURL);
        }
    };

    const copyToClipboard = (actualURL) => {
        navigator.clipboard.writeText(actualURL);
        toast.success("URL copied to clipboard!");
    };

    return (
        <div className='container sm:px-5 px-0 pt-24 pb-10 mx-auto'>
            <div className='flex sm:flex-row flex-col justify-between sm:w-10/12 w-11/12 mx-auto'>
                <div className='flex flex-col'>
                    <div className='flex flex-row items-center'>
                        <h1 className='text-2xl font-medium text-gray-900 sm:truncate'>{title}</h1>
                        <div className='flex ml-3'>
                            <button className='align-self-end' onClick={toggleDropdown}>
                                <FaChevronDown
                                    className={`h-5 w-5 text-blue-500 hover:text-blue-600 
                                    ${open ? "rotate-180" : "rotate-0"} 
                                    transition-transform duration-400 transform`}
                                />
                            </button>
                        </div>
                    </div>
                    <div className='flex sm:flex-row flex-col sm:items-center mt-3 text-base gap-2'>
                        <div className='flex items-center text-base'>
                            <FaCalendar className='mr-2 text-gray-500' />
                            <span>{date}</span>
                        </div>
                        <div className='flex items-center text-base'>
                            <FaMapMarkerAlt className='mr-2 text-gray-500' />
                            <span>{location}</span>
                        </div>
                    </div>
                </div>
                <div className='flex sm:flex-col flex-row gap-2 sm:pt-2 pt-2 sm:justify-end'>
                    <button className='flex items-center hover:text-blue-500' onClick={onShare}>
                        <IoMdShare className='text-blue-500 text-xl mr-1' />
                        <span>Share</span>
                    </button>
                </div>
            </div>
            <div
                className='sm:w-10/12 w-11/12 mx-auto'
                style={{
                    maxHeight: open ? descriptionHeight : "0",
                    overflow: "hidden",
                    transition: "max-height 0.4s ease-in-out",
                }}>
                <div ref={descriptionRef}>
                    <hr className='mt-3 mb-5 border-0 h-px bg-slate-400'></hr>
                    <p>{renderDescription()}</p>
                    <p className='text-right mt-5'>{author}</p>
                </div>
            </div>
        </div>
    );
};

export default DropdownPlan;
