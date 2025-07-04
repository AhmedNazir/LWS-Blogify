"use client";

import { useContext, useState } from "react";
import { useParams } from "next/navigation";
import Sidebar from "../components/Sidebar";
import DATABASE from "../data/data.json";
import ArticleItem from "../components/ArticleItem";
import HomeIcon from "../assets/HomeIcon";
import SearchIcon from "../assets/SearchIcon";
import NotificationIcon from "../assets/NotificationIcon";
import ProfileIcon from "../assets/ProfileIcon";
import { TagContext } from "../contexts/TagContext";

export default function Post({ params }) {
    const query = decodeURIComponent(params.post);
    const article = DATABASE.find((item) => item.title === query);
    const { tags } = useContext(TagContext);

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

    // let data;

    // if (tags.length === 0) data = DATABASE;
    // else {
    //     data = DATABASE.filter((item) => tags.includes(item.category));
    // }

    // data = data.toSorted((a, b) => {
    //     if (new Date(a.date) > new Date(b.date)) return -1;
    //     else return 1;
    // });

    // let recommendList = data.slice(0, 4);

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
                        <Sidebar />
                    </div>
                </div>
            </section>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
                <div className="flex justify-between">
                    <a href="#" className="flex flex-col items-center">
                        <HomeIcon />
                        <span className="text-xs mt-1">Home</span>
                    </a>
                    <a href="#" className="flex flex-col items-center">
                        <SearchIcon />
                        <span className="text-xs mt-1">Search</span>
                    </a>
                    <a href="#" className="flex flex-col items-center">
                        <NotificationIcon />
                        <span className="text-xs mt-1">Notifications</span>
                    </a>
                    <a href="#" className="flex flex-col items-center">
                        <ProfileIcon />
                        <span className="text-xs mt-1">Profile</span>
                    </a>
                </div>
            </nav>
        </>
    );
}
