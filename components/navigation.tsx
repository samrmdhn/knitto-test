import { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

const Navigation: NextPage = () => {
    const router = useRouter()

    const linkPath = [
        {
            href: "/",
            name: "CREATE (CSR)",
        },
        {
            href: "/random",
            name: "RANDOM TODO (ISR)",
        },
        {
            href: "/all-todo",
            name: "ALL TODO (SSR)",
        },
    ]

    return (
        <div>
            <div className="flex justify-center text-white gap-3 mt-3">
                {linkPath.map((l, index) => {
                    return (
                        <div key={index}>
                            <Link
                                href={l.href}
                                className={
                                    l.href === router.pathname
                                        ? "font-bold"
                                        : ""
                                }
                            >
                                <div>{l.name}</div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Navigation
