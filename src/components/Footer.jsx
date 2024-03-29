import React from "react";
import { version } from "../../package.json";

const Footer = () => {
    return (
        <footer
            id="footer"
            className="
            body-font
            text-gray-600
        "
        >
            <div
                className="
                container
                mx-auto
                flex
                flex-col
                items-center
                px-5
                py-8
                sm:flex-row
            "
            >
                <a
                    className="
                    title-font
                    flex
                    cursor-pointer
                    items-center
                    justify-center
                    font-medium
                    text-gray-900
                    md:justify-start
                "
                    href="https://github.com/JAM-Productions"
                >
                    <img
                        src="/malker/jam.webp"
                        alt="Logo"
                        className="mr-2 h-8 w-8"
                    />
                    <span
                        className="
                        ml-3
                        text-xl
                    "
                        style={{ fontFamily: "Montserrat" }}
                    >
                        JAM Productions
                    </span>
                </a>
                <p
                    className="
                    mt-4
                    text-sm
                    text-gray-500
                    sm:ml-4
                    sm:mt-0
                    sm:border-l-2
                    sm:border-gray-400
                    sm:py-2
                    sm:pl-4
                "
                >
                    © 2023 JAM-Productions
                </p>
                <span
                    className="
                    mt-4
                    inline-flex
                    cursor-pointer
                    justify-center
                    sm:ml-auto
                    sm:mt-0
                    sm:justify-start
                "
                >
                    <a
                        className="text-gray-500"
                        href="https://github.com/JAM-Productions/malker"
                    >
                        <svg
                            aria-hidden="true"
                            height="24"
                            version="1.1"
                            viewBox="0 0 16 16"
                            width="24"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                            ></path>
                        </svg>
                    </a>
                    <p
                        className="
                        px-2
                        py-1
                        text-sm
                        text-gray-500
                    "
                    >
                        v{version}
                    </p>
                </span>
            </div>
        </footer>
    );
};

export default Footer;
