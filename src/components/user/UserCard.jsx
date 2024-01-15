import React from "react";
import Button from "../Button.jsx"

const UserCard = ({user, currentUser}) => {

    return (
        <div className="
                flex
                flex-col
                mx-auto
                items-center
                relative
                mt-8
                my-12
                text
            "
            key={user}
        >
            <div className={`
                absolute
                top-0
                right-0
                h-2
                w-2
                rounded-full
                ${ user === currentUser
                    ? "bg-green-500"
                    : "bg-red-500" //change to get state the actual user
                }
            `}/>
                <img
                    src="malker.png"
                    alt="Logo"
                    className="h-12 w-12 mr-2"
                />
            <p className="absolute pt-14 font-bold">
                {user}
            </p>
            {user === currentUser &&
                user === "Mark" &&
                /* add checkif already joined or no */
                <div className="absolute pt-24">
                    <Button text={"Rejoin"}
                        additionalStyles="
                            bg-red-500
                            hover:bg-red-600
                        "
                        small
                    />
                </div>
            }
            {user === currentUser &&
                user !== "Mark" &&
                /* add checkif already joined or no */
                <div className="absolute pt-24">
                    <Button text={"Rejoin"}
                        additionalStyles="
                            bg-red-500
                            hover:bg-red-600
                        "
                        small
                    />
                </div>
            }
        </div>
    )
}

export default UserCard;
