"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Sidebar from "../components/Sidebar";
import DATABASE from "../data/data.json";
import ArticleItem from "../components/ArticleItem";

function getRecommendation(data) {}

export default function Post({ params }) {
    const query = decodeURIComponent(params.post);
    const article = DATABASE.find((item) => item.title === query);

    // const recommendList = DATABASE.filter(
    //     (item) => item.author.name === article.author.name
    // );

    // let othersList = DATABASE.filter(
    //     (item) => item.author.name !== article.author.name
    // );

    // othersList = othersList.toSorted((a, b) => {
    //     if (new Date(a.date) > new Date(b.date)) return -1;
    //     else return 1;
    // });

    let recommendList = DATABASE.toSorted((a, b) => {
        if (new Date(a.date) > new Date(b.date)) return -1;
        else return 1;
    }).slice(0, 4);

    // if (recommendList.length < 4) {
    //     for (let index = 0; index < 4 - recommendList.length; index++) {
    //         recommendList.push(othersList);
    //     }
    // }

    console.log(recommendList);

    return (
        <>
            {/* Main Content */}
            <section className="py-10 border-t border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row">
                        {/* Articles Feed */}
                        <div className="lg:w-2/3 lg:pr-12">
                            {/* Article Header */}
                            <div className="container mx-auto px-4 py-8 max-w-4xl">
                                <div className="mb-8">
                                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                                        {article.title}
                                    </h1>
                                    <div className="flex items-center mb-6">
                                        <img
                                            src={article.author.avatar}
                                            alt={article.author.name}
                                            className="h-12 w-12 rounded-full mr-4"
                                        />
                                        <div>
                                            <div className="flex items-center">
                                                <span className="font-medium mr-2">
                                                    {article.author.name}
                                                </span>
                                                <button className="text-green-600 text-sm font-medium">
                                                    Follow
                                                </button>
                                            </div>
                                            <div className="flex items-center text-gray-500 text-sm mt-1">
                                                <span>{article.date}</span>
                                                <span className="mx-1">·</span>
                                                <span className="bg-gray-100 px-2 py-1 rounded-full">
                                                    {article.category}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Article Content */}
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: article.description
                                    }}
                                    className="article-content"
                                ></p>

                                <section className="bg-gray-50 py-12 mt-12">
                                    <div className="container mx-auto px-4 max-w-4xl">
                                        <h3 className="text-xl font-bold mb-6">
                                            Recommended Blogs
                                        </h3>

                                        <div className="grid grid-cols-2 gap-4">
                                            {recommendList.map((item) => {
                                                return (
                                                    <ArticleItem
                                                        articleInfo={item}
                                                        markedList={[]}
                                                        handleMarked={() => {}}
                                                        key={item.id}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                        {/* Sidebar */}
                        <Sidebar filters={[]} handleFilters={() => {}} />
                    </div>
                </div>
            </section>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
                <div className="flex justify-between">
                    <a href="#" className="flex flex-col items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                        <span className="text-xs mt-1">Home</span>
                    </a>
                    <a href="#" className="flex flex-col items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        <span className="text-xs mt-1">Search</span>
                    </a>
                    <a href="#" className="flex flex-col items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            />
                        </svg>
                        <span className="text-xs mt-1">Notifications</span>
                    </a>
                    <a href="#" className="flex flex-col items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                        <span className="text-xs mt-1">Profile</span>
                    </a>
                </div>
            </nav>
        </>
    );
}
