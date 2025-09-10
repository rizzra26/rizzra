"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

export const NavLink = ({ children, href }: { children: React.ReactNode,  href: string }) => {
    const  currentPathName = usePathname();

    let active = currentPathName === href;
    return (
        <li>
	<Link href={href} className={`transition ${active ? 'text-white' : ''}`}>
		{children}
	</Link>
</li>
    )
}