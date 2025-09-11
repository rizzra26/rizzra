"use client"
import React from "react"

export const SocialLink = ({ children, href, name }: { children: React.ReactNode, href: string, name: string }) => {
    return (
        <a
            href={href}
            aria-label={name}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-gray-400"
        >
            {children}
        </a>
    )
}