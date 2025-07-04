"use client";

import Image from "next/image";
import Sidebar from "./components/Sidebar";
import ArticleItem from "./components/ArticleItem";
import DATABASE from "./data/data.json";
import { useContext, useState } from "react";
import { BookmarkContext } from "./contexts/BookmarkContext";
import { TagContext } from "./contexts/TagContext";
import { SortContext } from "./contexts/SortContext";

export default function Home() {
    const { sort, setSort } = useContext(SortContext);
    const [more, setMore] = useState(5);
    const { marked } = useContext(BookmarkContext);
    const { tags } = useContext(TagContext);

    let data;

    if (tags.length === 0) data = DATABASE;
    else {
        data = DATABASE.filter((item) => tags.includes(item.category));
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

    if (sort === "default") {
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
        return <ArticleItem articleInfo={item} key={item.id} />;
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
                                    value={sort}
                                    className="border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 p-2"
                                    onChange={(e) => setSort(e.target.value)}
                                >
                                    <option value="default">Default</option>
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
                    <Sidebar />
                </div>
            </div>
        </section>
    );
}
