import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaCalendar, FaMapMarkerAlt } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { toast } from "react-toastify";
import AddToCalendar from "../add-to-calendar/AddToCalendar";

const DropdownPlan = ({ title, date, location, description }) => {
    const [open, setOpen] = useState(true);
    const [descriptionHeight, setDescriptionHeight] = useState("auto");
    const descriptionRef = useRef(null);

    useEffect(() => {
        if (descriptionRef.current) {
            setDescriptionHeight(`${descriptionRef.current.scrollHeight + description.length}px`);
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
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    {urls[index - 1]}
                                </a>
                            )}
                            {urls[index - 1] !== part && part}
                        </React.Fragment>
                    ))}
                </>
            );
        } else {
            return description;
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
        <div
            id="dropdown-plan"
            className="container mx-auto px-0 pb-10 pt-24 sm:px-5"
        >
            <div className="mx-auto flex w-11/12 flex-col justify-between sm:w-10/12 md:flex-row">
                <div className="flex flex-col">
                    <div className="flex flex-row items-center">
                        <h1
                            id="plan-title"
                            className="text-2xl font-medium text-gray-900 sm:truncate"
                        >
                            {title}
                        </h1>
                        <div className="ml-3 flex">
                            <button
                                id="dropdown-button"
                                className="align-self-end"
                                onClick={toggleDropdown}
                            >
                                <FaChevronDown
                                    id="dropdown-icon"
                                    className={`h-5 w-5 text-blue-500 hover:text-blue-600
                                    ${open ? "rotate-180" : "rotate-0"}
                                    duration-400 transform transition-transform`}
                                />
                            </button>
                        </div>
                    </div>
                    <div className="mt-3 flex flex-col gap-2 text-base sm:flex-row sm:items-center">
                        <div className="flex items-center text-base">
                            <FaCalendar className="mr-2 text-gray-500" />
                            <span id="plan-date">{date}</span>
                        </div>
                        <div className="flex items-center text-base">
                            <FaMapMarkerAlt className="mr-2 text-gray-500" />
                            <span
                                id="plan-location"
                                className="sm:truncate"
                            >
                                {location}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-2 pt-2 sm:flex-col sm:justify-end sm:pt-2">
                    <div
                        id="plan-actions"
                        className="flex gap-2 sm:flex-row"
                    >
                        <AddToCalendar
                            date={date}
                            title={title}
                            description={description}
                            location={location}
                        />
                        <button
                            className="flex items-center hover:text-blue-500"
                            onClick={onShare}
                        >
                            <IoMdShare className="mr-1 text-xl text-blue-500" />
                            <span>Share</span>
                        </button>
                    </div>
                </div>
            </div>
            <div
                className="mx-auto w-11/12 sm:w-10/12"
                style={{
                    maxHeight: open ? descriptionHeight : "0",
                    overflow: "hidden",
                    transition: "max-height 0.4s ease-in-out",
                }}
            >
                <div ref={descriptionRef}>
                    <hr className="mb-5 mt-3 h-px border-0 bg-slate-400"></hr>
                    <div
                        id="plan-description"
                        dangerouslySetInnerHTML={{ __html: renderDescription() }}
                    />
                </div>
            </div>
        </div>
    );
};

export default DropdownPlan;
