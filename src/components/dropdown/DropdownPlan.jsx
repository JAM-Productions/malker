import React from "react";


const DropdownPlan = ({title, date, location, description, author}) => {

    return ( 
        <div className="container px-5 pt-20 pb-10 mx-auto">
            <div className="flex flex-col w-10/12 mx-auto">
                <h1 className="sm:text-3xl text-2xl font-medium text-gray-900">{title}</h1>
                <p className="mt-3 text-base ">{date} - {location}</p>
                <hr className="mt-3 mb-5 border-0 h-px bg-slate-400"></hr>
                <p className="overflow-auto max-h-72">{description}</p>
                <p className="text-right mt-5">{author}</p>
            </div>
        </div>        
    )
}

export default DropdownPlan;