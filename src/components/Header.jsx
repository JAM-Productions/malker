import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdGeneratingTokens } from "react-icons/md";
import TokenDialog from "./token/TokenDialog";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const navigate = useNavigate();
    const [isTokenDialogOpen, setIsTokenDialogOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            const isScrollingUp = currentScrollPos < prevScrollPos;

            setIsScrolled(!(isScrollingUp || currentScrollPos === 0));
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollPos]);

    return (
        <div>
            <div
                className={`
        fixed
        z-10
        w-full
        transform
        bg-blue-500
        shadow-sm
        transition-transform
        ${isScrolled ? "-translate-y-full" : "translate-y-0"}
        transition-all
        duration-500
      `}
            >
                <div
                    className="
            flex
            flex-row
            items-center
            justify-center
          "
                >
                    <div
                        className="
              flex
              cursor-pointer
              flex-row
              border-b-[1px]
              border-blue-600
              py-2
            "
                        onClick={() => navigate("/malker")}
                    >
                        <img
                            src="/malker/malker.webp"
                            alt="Logo"
                            className="mr-2 h-8 w-8"
                        />
                        <span
                            className="
                text-lg
                font-bold
                text-white
                transition-colors
                duration-300
                ease-in-out
                hover:text-blue-300
              "
                            style={{ fontFamily: "Montserrat" }}
                        >
                            Malker
                        </span>
                    </div>
                    <MdGeneratingTokens
                        className="
            absolute
            right-5
            ml-2
            cursor-pointer
            text-2xl
            text-white
            transition-colors
            duration-300
            ease-in-out
            hover:text-blue-300
          "
                        onClick={() => {
                            setIsTokenDialogOpen(true);
                        }}
                    />
                </div>
            </div>
            {isTokenDialogOpen && <TokenDialog onClose={() => setIsTokenDialogOpen(false)} />}
        </div>
    );
};

export default Header;
