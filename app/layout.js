"use client";
import "./globals.css";
import Logo from "./assets/logo.svg";
import Image from "next/image";
import ButtonStarted from "./assets/ButtonStarted";
import Link from "next/link";
import BookmarkProvider from "./contexts/BookmarkContext";
import TagProvider from "./contexts/TagContext";
import SortProvider from "./contexts/SortContext";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <header className="border-b border-gray-200">
                    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                        <div className="flex items-center">
                            <Link href="/">
                                <Image
                                    src={Logo}
                                    alt="Company Logo"
                                    className="h-12"
                                    width={180}
                                />
                            </Link>
                        </div>
                        <nav className="hidden md:flex items-center space-x-6">
                            <Link
                                href="#"
                                className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
                            >
                                Get started
                            </Link>
                        </nav>
                        <button className="md:hidden">
                            <ButtonStarted />
                        </button>
                    </div>
                </header>
                <BookmarkProvider>
                    <SortProvider>
                        <TagProvider>{children}</TagProvider>
                    </SortProvider>
                </BookmarkProvider>
            </body>
        </html>
    );
}
