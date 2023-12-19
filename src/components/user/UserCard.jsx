import React from "react";
import UserButton from "./UserButton";

const UserCard = ({user, currentUser}) => {

    return ( 
        <div className="flex flex-col mx-auto items-center relative mt-8 my-12" key={user}>
            <div 
                className={`absolute top-0 right-0 h-2 w-2 rounded-full ${
                    user === currentUser ? "bg-green-500" : "bg-red-500" //change to get state the actual user
                }`}
            />
            <img
                src="/malker.png" 
                alt="Logo"
                className="h-12 w-12 mr-2" 
            />   
            <p className="absolute pt-14">{user}</p>
            {user === currentUser && <div className="absolute pt-24"><UserButton text={"Leave"}/></div>}
        </div>  
    )
}

export default UserCard;