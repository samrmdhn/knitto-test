import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next"
import Navigation from "../../components/navigation"
import { ITodo } from "../../types/ITodo"
import { Card } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { useRouter } from "next/router"
import { Button } from "../../components/ui/button"
import Head from "next/head"

const AllTodo: NextPage<{ data: ITodo[]; page: number }> = ({
    data: todos,
    page,
}) => {
    const router = useRouter()

    const handlePrevPage = () => {
        if (page === 2) {
            router.push(`/all-todo`)
        } else {
            const prevPage = page - 1
            router.push(`/all-todo?page=${prevPage}`)
        }
    }

    const handleNextPage = () => {
        const nextPage = page + 1
        router.push(`/all-todo?page=${nextPage}`)
    }
    return (
        <div className="m-auto w-[400px]">
            <Head>
                <title>ALL TODO (SSR)</title>
            </Head>

            <Navigation />

            <h3 className="text-md font-bold mb-3 mt-3  text-white">
                ALL TODO
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

            <div className="flex gap-3 justify-center">
                <Button onClick={handlePrevPage} disabled={page === 1}>
                    Prev
                </Button>
                <Button onClick={handleNextPage} disabled={page >= 199}>
                    Next
                </Button>
            </div>
        </div>
    )
}

export default AllTodo

export const getServerSideProps: GetServerSideProps = async (
    ctx: GetServerSidePropsContext
) => {
    const pagination = ctx?.query?.page ? ctx.query.page : 1

    const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos?_start=${pagination}&_limit=10)`
    )
    const data: ITodo[] = await res.json()

    return {
        props: {
            data,
            page: Number(ctx.query.page) || 1,
        },
    }
}
