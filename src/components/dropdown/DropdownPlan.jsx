import React, { useState } from "react";


const DropdownPlan = ({title, date, location, description, author}) => {

    const [open, setOpen] = useState(true);

    return ( 
        <div className="container px-5 pt-20 pb-10 mx-auto">
            <div className="flex flex-row justify-between w-10/12 mx-auto">
                <div className="flex flex-col  ">
                    <div className="flex flex-row">
                            <h1 className="sm:text-3xl text-2xl font-medium text-gray-900">{title}</h1>
                            <div className="flex ml-3">
                                {open && <button className="align-self-end" onClick={ () => setOpen(!open) }>
                                <svg class="-mr-1 h-7 w-7 text-blue-500 hover:text-blue-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832l-3.71 3.938a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clip-rule="evenodd" />
                                    </svg>
                                </button> }
                                {!open && <button className="align-self-end" onClick={ () => setOpen(!open) }>
                                    <svg class="-mr-1 h-7 w-7 text-blue-500 hover:text-blue-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                    </svg>
                                </button>}
                            </div>
                    </div>
                    <p className="mt-3 text-base ">{date} - {location}</p>
                </div>
            </div>
            { open && (<div className="flex flex-col w-10/12 mx-auto">
                <hr className="mt-3 mb-5 border-0 h-px bg-slate-400"></hr>
                <p>{description}</p>
                <p className="text-right mt-5">{author}</p>
            </div>)}
        </div>        
    )
}

export default DropdownPlan;