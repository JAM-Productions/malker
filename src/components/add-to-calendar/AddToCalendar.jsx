import React, { useState } from "react";
import { FaCalendarPlus, FaApple, FaGoogle } from "react-icons/fa";

function AddToCalendar({ date, title, description, location }) {
    const [displaySelect, setDisplaySelect] = useState(false);

    const onAddToCalendar = (OS) => {
        const [day, month, year] = date.split("/");
        const dateObject = new Date(`${year}-${month}-${day}`);

        if (OS === "apple") {
            return encodeURI(
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
        } else if (OS === "google") {
            return encodeURI(
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
        }
        return "";
    };

    return (
        <div className="relative inline-block">
            <div
                className="flex cursor-pointer flex-row bg-malker-100 hover:text-blue-500"
                onClick={() => setDisplaySelect(!displaySelect)}
            >
                <FaCalendarPlus className="mr-2 mt-1  text-blue-500" />
                <span className="truncate">Add to calendar</span>
            </div>
            <div
                className={`absolute z-10 mt-1 ${displaySelect ? "block" : "hidden"} w-fit rounded-md border border-gray-300 bg-malker-150`}
            >
                <div className="py-1">
                    <a
                        className="flex cursor-pointer items-center px-2.5 py-1 hover:bg-malker-175 "
                        href={onAddToCalendar("apple")}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FaApple className="mr-1.5 h-5 w-5" />
                        <span className="truncate">Apple Calendar</span>
                    </a>
                    <div className="mx-2 my-0.5 border-t border-gray-300"></div>
                    <a
                        className="flex cursor-pointer items-center px-3 py-1 hover:bg-malker-175"
                        href={onAddToCalendar("google")}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FaGoogle className="mr-2" />
                        <span className="truncate">Google Calendar</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default AddToCalendar;
