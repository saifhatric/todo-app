import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5001' }),
    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => '/todos',
            providesTags: ['Todos'],

        }),
        postTodo: builder.mutation({
            query: (todo) => ({
                url: '/todos',
                method: "POST",
                body: todo

            }),
            providesTags: ['Todos'],


        }),
        updateTodo: builder.mutation({
            query: (newTodo) => ({
                url: `/todos/${newTodo.id}`,
                method: "PATCH",
                body: newTodo
            }),
            providesTags: ['Todos'],

        }),
        deleteTodo: builder.mutation({
            query: ({ id }) => ({
                url: `todos/${id}`,
                method: "DELETE",
                body: id,
            }),
            providesTags: ['Todos'],

        })
    })
})

export const {
    useGetTodosQuery,
    usePostTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation
} = apiSlice;