"use client";

import Image from "next/image";
import Sidebar from "./components/Sidebar";
import ArticleItem from "./components/ArticleItem";
import DATABASE from "./data/data1.json";
import { useState } from "react";

export default function Home() {
    const [sort, setSort] = useState("latest");
    const [more, setMore] = useState(5);

    let data = DATABASE;
    if (sort === "latest") {
        data = DATABASE.sort((a, b) => {
            if (a.date < b.date) return -1;
            else if (a.date > b.date) return 1;
            return 0;
        });
    } else {
        data = DATABASE.sort((a, b) => {
            if (a.date > b.date) return -1;
            else if (a.date < b.date) return 1;
            return 0;
        });
    }

    const ArticleList = data.slice(0, more).map((item) => {
        return <ArticleItem articleInfo={item} key={item.title} />;
    });

    console.log(sort);
    console.log(more);

    return (
        <section className="py-10 border-t border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row">
                    {/* Articles Feed */}
                    <div className="lg:w-2/3 lg:pr-12">
                        {/* Sorting Dropdown */}
                        <div className="mb-6 flex justify-between items-center">
                            <h2 className="text-2xl font-bold">Articles</h2>
                            <div>
                                <label
                                    htmlFor="sort"
                                    className="text-sm font-medium text-gray-700 mr-2"
                                >
                                    Sort by:
                                </label>
                                <select
                                    id="sort"
                                    name="sort"
                                    className="border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500"
                                    onChange={(e) => setSort(e.target.value)}
                                >
                                    <option value="latest">Latest</option>
                                    <option value="oldest">Oldest</option>
                                </select>
                            </div>
                        </div>

                        {ArticleList}

                        {/* Load More Button */}
                        <div className="text-center">
                            <button
                                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-50 transition-colors"
                                onClick={() => {
                                    setMore((prev) =>
                                        DATABASE.length > prev + 5
                                            ? prev + 5
                                            : DATABASE.length
                                    );
                                }}
                                hidden={more >= DATABASE.length ? true : false}
                            >
                                Load more
                            </button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <Sidebar />
                </div>
            </div>
        </section>
    );
}
