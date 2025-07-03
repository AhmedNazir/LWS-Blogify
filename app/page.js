"use client";

import Image from "next/image";
import Sidebar from "./components/Sidebar";
import ArticleItem from "./components/ArticleItem";
import DATABASE from "./data/data.json";
import { useState } from "react";

export default function Home() {
    const [sort, setSort] = useState("latest");
    const [more, setMore] = useState(5);
    const [marked, setMarked] = useState([]);
    const [filters, setFilters] = useState([]);

    function handleMarked(id) {
        if (!marked.includes(id)) {
            setMarked([...marked, id]);
        } else {
            setMarked(marked.filter((item) => item !== id));
        }
    }

    function handleFilters(title) {
        if (!filters.includes(title)) {
            setFilters([...filters, title]);
        } else {
            setFilters(filters.filter((item) => item !== title));
        }
    }

    let data;

    if (filters.length === 0) data = DATABASE;
    else {
        data = DATABASE.filter((item) => filters.includes(item.category));
    }

    if (sort === "latest") {
        data = data.toSorted((a, b) => {
            if (new Date(a.date) > new Date(b.date)) return -1;
            else return 1;
        });
    }

    if (sort === "oldest") {
        data = data.toSorted((a, b) => {
            if (new Date(a.date) < new Date(b.date)) return -1;
            else return 1;
        });
    }

    if (sort === "marked") {
        data = data.toSorted((a, b) => {
            if (new Date(a.date) > new Date(b.date)) return -1;
            else return 1;
        });

        data = data.toSorted((a, b) => {
            if (marked.includes(a.id) && marked.includes(b.id)) {
                if (new Date(a.date) > new Date(b.date)) return -1;
            } else if (marked.includes(a.id) && !marked.includes(b.id))
                return -1;
            else if (!marked.includes(a.id) && marked.includes(b.id)) return 1;
            else {
                if (new Date(a.date) > new Date(b.date)) return -1;
                else return 1;
            }
        });
    }

    const ArticleList = data.slice(0, more).map((item) => {
        return (
            <ArticleItem
                articleInfo={item}
                key={item.id}
                markedList={marked}
                handleMarked={handleMarked}
            />
        );
    });

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
                                    className="border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 p-2"
                                    onChange={(e) => setSort(e.target.value)}
                                >
                                    <option value="latest">Latest</option>
                                    <option value="oldest">Oldest</option>
                                    <option value="marked">Marked First</option>
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
                                        data.length > prev + 5
                                            ? prev + 5
                                            : data.length
                                    );
                                }}
                                hidden={more >= data.length ? true : false}
                            >
                                Load more
                            </button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <Sidebar filters={filters} handleFilters={handleFilters} />
                </div>
            </div>
        </section>
    );
}
