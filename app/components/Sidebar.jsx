"use client";

import Link from "next/link";
import DATABASE from "../data/data.json";
import { useState } from "react";

function Sidebar({}) {
    const [filters, setFilters] = useState([]);

    function handleFilters(title) {
        if (!filters.includes(title)) {
            setFilters([...filters, title]);
        } else {
            setFilters(filters.filter((item) => item !== title));
        }
    }
    const activeCss =
        "bg-green-200 font-medium px-4 py-2 rounded-full text-sm hover:bg-gray-200 transition-colors";
    const normalCss =
        "bg-gray-100 px-4 py-2 rounded-full text-sm hover:bg-gray-200 transition-colors";

    const footerList = [
        {
            title: "Help",
            link: "#"
        },
        {
            title: "Status",
            link: "#"
        },
        {
            title: "Writers",
            link: "#"
        },
        {
            title: "Blog",
            link: "#"
        },
        {
            title: "Careers",
            link: "#"
        },
        {
            title: "Privacy",
            link: "#"
        },
        {
            title: "Terms",
            link: "#"
        },
        {
            title: "About",
            link: "#"
        }
    ];

    // const tagList = [
    //     {
    //         title: "Programming",
    //         link: "#"
    //     },
    //     {
    //         title: "Data Science",
    //         link: "#"
    //     },
    //     {
    //         title: "Technology",
    //         link: "#"
    //     },
    //     {
    //         title: "Self Improvement",
    //         link: "#"
    //     },
    //     {
    //         title: "Writing",
    //         link: "#"
    //     },
    //     {
    //         title: "Relationships",
    //         link: "#"
    //     },
    //     {
    //         title: "Machine Learning",
    //         link: "#"
    //     },
    //     {
    //         title: "Productivity",
    //         link: "#"
    //     }
    // ];

    const tagList = new Set();

    DATABASE.forEach((element) => {
        tagList.add(element.category);
    });

    const tags = Array.from(tagList);


    return (
        <>
            <div className="lg:w-1/3 mt-10 lg:mt-0">
                <div className="sticky top-20">
                    <div className="mb-8">
                        <h3 className="text-lg font-bold mb-4">
                            Discover more of what matters to you
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((item) => {
                                return (
                                    <Link
                                        href={"#"}
                                        className={
                                            filters.includes(item)
                                                ? activeCss
                                                : normalCss
                                        }
                                        key={item}
                                        onClick={() => handleFilters(item)}
                                    >
                                        {item}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer Links */}
                    <div className="mt-8 border-t border-gray-200 pt-8">
                        <div className="flex flex-wrap text-sm text-gray-500 gap-x-4 gap-y-2">
                            {footerList.map((item) => {
                                return (
                                    <Link
                                        href={item.link}
                                        className="hover:text-gray-700"
                                        key={item.title}
                                    >
                                        {item.title}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Sidebar;
