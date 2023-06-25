import { NextPage, GetServerSideProps } from "next"
import { useEffect, useState } from "react"
import { useAddTodoMutation, useGetTodoQuery } from "../services/todoAPI"
import { Input } from "../components/ui/input"
import { ITodo } from "../types/ITodo"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Skeleton } from "../components/ui/skeleton"
import { Badge } from "../components/ui/badge"
import toast, { Toaster } from "react-hot-toast"
import Navigation from "../components/navigation"
import Head from "next/head"

const Home: NextPage = () => {
    const { data, isLoading } = useGetTodoQuery("")

    const [todos, setTodos] = useState<ITodo[]>([])

    useEffect(() => {
        const sliceData: ITodo[] | any = data?.slice(0, 10)
        setTodos(sliceData)
    }, [data])

    const [addTodos] = useAddTodoMutation()

    const [title, setTitle] = useState<string>("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { data }: any = await addTodos({
            userId: 1,
            title: title,
            completed: false,
        })
        toast.success("Successfully added!")
        setTitle("")

        setTodos((prev) => [...prev, data])
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    return (
        <div className="m-auto w-[400px]">
            <Head>
                <title>Create Todo (CSR)</title>
            </Head>
            <Navigation />

            <h3 className="text-md font-bold mb-3 mt-3  text-white">
                MY TODOS
            </h3>

            <Toaster />

            <form onSubmit={handleSubmit}>
                <div className="flex justify-between gap-3">
                    <div className="w-[85%]">
                        <Input
                            required
                            value={title}
                            className="text-black"
                            onChange={handleChange}
                            placeholder="Insert activity to do..."
                        />
                    </div>
                    <div>
                        <Button disabled={title.length > 0 ? false : true}>
                            Save
                        </Button>
                    </div>
                </div>
            </form>

            <h3 className="font-bold mt-5  text-white">LIST TODO</h3>

            {isLoading ? (
                <div className="text-white">
                    {Array.from({ length: 7 }, (_, index) => (
                        <div key={index}>
                            <Card className="p-5 bg-[#09090B] border-gray-800 mt-3 mb-3">
                                <Skeleton className="h-4 w-[150px] bg-gray-800 mb-3" />
                                <Skeleton className="h-4 w-[250px] bg-gray-800" />
                            </Card>
                        </div>
                    ))}
                </div>
            ) : (
                <>
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
                                        <div className="font-bold">
                                            {t.title}
                                        </div>
                                        <div>By: User {t.userId}</div>
                                    </Card>
                                </div>
                            )
                        })}
                </>
            )}
        </div>
    )
}

export default Home
