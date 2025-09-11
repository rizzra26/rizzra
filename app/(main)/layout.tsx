"use client"

import React from "react";

import { NavLink } from "@/components/nav-link";
import Background from "@/components/background";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Background />

            <nav className="wrapper mt-20 md:mt-32 text-gray-400">
                <ul className="flex flex-wrap gap-x-12 gap-y-2">
                    <NavLink href="/">Home</NavLink>
                    <NavLink href="/projects">Projects</NavLink>
                </ul>
            </nav>

            <div className="mt-16 md:mt-20 mb-20 md:mb-32">
                {children}
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }
                }

                @keyframes fade-out {
                    to {
                        opacity: 0;
                    }
                }

                @keyframes slide-in {
                    from {
                        transform: translateX(calc(-1 * 8px * var(--direction)));
                    }
                }

                @keyframes slide-out {
                    to {
                        transform: translateX(calc(8px * var(--direction)));
                    }
                }

                :root::view-transition-old(content) {
                    animation: 90ms cubic-bezier(0.4, 0, 1, 1) both fade-out, 300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-out;
                }

                :root::view-transition-new(content) {
                    animation: 210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in, 300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-in;
                }

                nav {
                    view-transition-name: nav;
                }

                div {
                    view-transition-name: content;
                }
            `}</style>
        </div>
    )
}

export default MainLayout;