import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ITodo } from "../types/ITodo"

export const todoApi = createApi({
    reducerPath: "todoApi",
    tagTypes: ["Todos"],
    baseQuery: fetchBaseQuery({
        baseUrl: "https://jsonplaceholder.typicode.com",
    }),
    endpoints: (builder) => ({
        getTodo: builder.query<ITodo[], string>({
            query: () => `/todos`,
            providesTags: ["Todos"],
        }),
        addTodo: builder.mutation<ITodo, object>({
            query: (todo: ITodo) => ({
                url: "/todos",
                method: "POST",
                body: todo,
            }),
            invalidatesTags: ["Todos"],
        }),
    }),
})

export const { useGetTodoQuery, useAddTodoMutation } = todoApi
