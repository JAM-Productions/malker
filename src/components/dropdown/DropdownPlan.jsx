import React, { useState, useRef, useEffect } from "react";
import {
    FaChevronDown,
    FaCalendar,
    FaMapMarkerAlt,
    FaCalendarPlus,
    FaApple,
    FaGoogle,
} from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { toast } from "react-toastify";

const DropdownPlan = ({ title, date, location, description, author }) => {
    const [open, setOpen] = useState(true);
    const [descriptionHeight, setDescriptionHeight] = useState("auto");
    const descriptionRef = useRef(null);

    const [displaySelect, setDisplaySelect] = useState(false);

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

    const onAddToGoogleCalendar = () => {
        const [day, month, year] = date.split("/");
        const dateObject = new Date(`${year}-${month}-${day}`);

        const encodedUrl = encodeURI(
            [
                "https://www.google.com/calendar/render",
                "?action=TEMPLATE",
                `&text=${title || ""}`,
                `&dates=${dateObject || ""}`,
                // TODO: Calculate (duration + dateObject) to get the endDate
                //  `/${  endDate || ''}`,
                `&details=${description || ""}`,
                `&location=${location || ""}`,
                "&sprop=&sprop=name:",
            ].join(""),
        );
        return encodedUrl;
    };

    const onAddToAppleCalendar = () => {
        const [day, month, year] = date.split("/");
        const dateObject = new Date(`${year}-${month}-${day}`);

        const encodedUrl = encodeURI(
            `data:text/calendar;charset=utf8,${[
                "BEGIN:VCALENDAR",
                "VERSION:2.0",
                "BEGIN:VEVENT",
                `DTSTART:${dateObject || ""}`,
                // TODO: Calculate (duration + dateObject) to get the endDate
                //`DTEND:${  endDate || ''}`,
                `SUMMARY:${title || ""}`,
                `DESCRIPTION:${description || ""}`,
                `LOCATION:${location || ""}`,
                "END:VEVENT",
                "END:VCALENDAR",
            ].join("\n")}`,
        );

        return encodedUrl;
    };

    const copyToClipboard = (actualURL) => {
        navigator.clipboard.writeText(actualURL);
        toast.success("URL copied to clipboard!");
    };

    return (
        <div className="container mx-auto px-0 pb-10 pt-24 sm:px-5">
            <div className="mx-auto flex w-11/12 flex-col justify-between sm:w-10/12 md:flex-row">
                <div className="flex flex-col">
                    <div className="flex flex-row items-center">
                        <h1 className="text-2xl font-medium text-gray-900 sm:truncate">{title}</h1>
                        <div className="ml-3 flex">
                            <button
                                className="align-self-end"
                                onClick={toggleDropdown}
                            >
                                <FaChevronDown
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
                            <span>{date}</span>
                        </div>
                        <div className="flex items-center text-base">
                            <FaMapMarkerAlt className="mr-2 text-gray-500" />
                            <span className="sm:truncate">{location}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-2 pt-2 sm:flex-col sm:justify-end sm:pt-2">
                    <div className="flex gap-2 sm:flex-row">
                        <div className="relative inline-block">
                            <div
                                className="flex cursor-pointer flex-row bg-malker-100 hover:text-blue-500"
                                onClick={() => setDisplaySelect(!displaySelect)}
                            >
                                <FaCalendarPlus className="mr-2 mt-1  text-blue-500" />
                                <span className="truncate">Add to calendar</span>
                            </div>
                            <div
                                className={`absolute z-10 mt-1 ${displaySelect ? "block" : "hidden"} bg-malker-150 w-fit rounded-md border border-gray-300`}
                            >
                                <div className="">
                                    <a
                                        className="hover:bg-malker-175 flex cursor-pointer items-center px-2.5 py-1 "
                                        href={onAddToAppleCalendar()}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <FaApple className="mr-1.5 h-5 w-5" />
                                        <span className="truncate">Apple Calendar</span>
                                    </a>
                                    <div className="mx-2 border-t border-gray-300"></div>
                                    <a
                                        className="hover:bg-malker-175 flex cursor-pointer items-center px-3 py-1"
                                        href={onAddToGoogleCalendar()}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <FaGoogle className="mr-2" />
                                        <span className="truncate">Google Calendar</span>
                                    </a>
                                </div>
                            </div>
                        </div>
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
                    <p>{renderDescription()}</p>
                    <p className="mt-5 text-right">{author}</p>
                </div>
            </div>
        </div>
    );
};

export default DropdownPlan;
