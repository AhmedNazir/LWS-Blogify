"use client";
import Image from "next/image";
import BookmarkIconMark from "../assets/bookmark-mark.svg";
import BookmarkIconUnmark from "../assets/bookmark-unmark.svg";
import Link from "next/link";

function generateUrl(title) {
    // return title.replaceAll(" ", "-");
    return title;
}

function ArticleItem({ articleInfo, markedList, handleMarked }) {
    // Strip HTML tags and get the first sentence of the description.
    const plainDescription = articleInfo.description.replace(/<[^>]+>/g, "");
    const firstSentence =
        plainDescription.match(/[^.!?]+[.!?]/)?.[0] || plainDescription;

    const bookmark = markedList.includes(articleInfo.id)
        ? BookmarkIconMark.src
        : BookmarkIconUnmark.src;

    return (
        <>
            <article className="mb-10 pb-10 border-b border-gray-200">
                <div className="flex items-center mb-4">
                    <img
                        src={articleInfo.author.avatar}
                        alt={articleInfo.author.name}
                        className="h-12 w-12 rounded-full mr-4"
                    />
                    <span className="text-sm font-medium">
                        {articleInfo.author.name}
                    </span>
                </div>
                <Link
                    href={"/" + generateUrl(articleInfo.title)}
                    className="text-xl font-bold mb-2 hover:underline cursor-pointer"
                >
                    {articleInfo.title}
                </Link>
                <p className="text-gray-700 mb-4">{firstSentence}</p>
                <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-500 text-sm">
                        <span>
                            {/* {articleInfo.date.slice(
                                0,
                                articleInfo.date.indexOf(",")
                            )} */}
                            {articleInfo.date}
                        </span>
                        <span className="mx-1">·</span>
                        <span className="bg-gray-100 px-2 py-1 rounded-full">
                            {articleInfo.category}
                        </span>
                    </div>
                    <button
                        className="text-gray-400 hover:text-gray-600"
                        onClick={() => handleMarked(articleInfo.id)}
                    >
                        <Image
                            src={bookmark}
                            alt="bookmark Logo"
                            width={20}
                            height={20}
                        />
                    </button>
                </div>
            </article>
        </>
    );
}
export default ArticleItem;
