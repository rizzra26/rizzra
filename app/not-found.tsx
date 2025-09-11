"use client"

import Link from "next/link";
import MainLayout from "./(main)/layout";

export default function NotFound() {
  return (
    <MainLayout>
      <main className="wrapper fade">
        <h1 className="header">404 - Not Found</h1>
        <p className="mt-4 text-gray-400">
          Could not find requested resource. Let's go back <Link href={'/'} className="text-white font-medium">home.</Link>
        </p>
      </main>
    </MainLayout>
  )
}