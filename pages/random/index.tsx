import { NextPage } from "next"
import { ITodo } from "../types/todo"
import { Card } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import Navigation from "../../components/navigation"
import Head from "next/head"

const RandomTodo: NextPage<{ data: ITodo[] }> = ({ data: todos }) => {
    return (
        <div className="m-auto w-[400px]">
            <Head>
                <title>Random (ISR)</title>
            </Head>
            <Navigation />

            <h3 className="text-md font-bold mb-3 mt-3  text-white">
                RANDOM TODO
            </h3>

            {todos &&
                todos.map((t: ITodo) => {
                    return (
                        <div key={t.id} className="mt-3 mb-3">
                            <Card className="p-5 bg-[#09090B] border-gray-800 text-white">
                                <div className="flex justify-end">
                                    {t.completed ? (
                                        <Badge className="mb-2">
                                            Completed
                                        </Badge>
                                    ) : null}
                                </div>
                                <div className="font-bold">{t.title}</div>
                                <div>By: User {t.userId}</div>
                            </Card>
                        </div>
                    )
                })}
        </div>
    )
}

export default RandomTodo

export const getStaticProps = async (ctx: any) => {
    const generateRandomNumber = () => {
        return Math.floor(Math.random() * 50) + 1
    }

    const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos?_start=${generateRandomNumber()}&_limit=10)`
    )

    const data: ITodo[] = await res.json()

    return {
        props: {
            data,
        },
        revalidate: 10,
    }
}
