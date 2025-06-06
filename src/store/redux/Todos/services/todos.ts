import { BASE_URL, DEFAULT_TIMEOUT_MS } from '@api/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TTask } from '@api/types';

export const apiTodos = createApi({
  reducerPath: 'apiTodos',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, timeout: DEFAULT_TIMEOUT_MS }),
  tagTypes: ['Todos'],
  endpoints: (build) => ({
    getTodos: build.query<TTask[], void>({
      query: () => '/todos',
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Todos' as const, id })), 'Todos']
          : ['Todos'],
    }),
    addTodo: build.mutation<TTask, { task: string }>({
      query: (body) => ({
        url: 'todos',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Todos'],
    }),
    editTodo: build.mutation<TTask, Partial<TTask> & Pick<TTask, 'id'>>({
      query: (body) => ({
        url: `todos/${body.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Todos', id: arg.id }],
    }),
    deleteTodo: build.mutation<TTask, string>({
      query: (id) => ({
        url: `todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todos'],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useAddTodoMutation,
  useEditTodoMutation,
  useGetTodosQuery,
  useDeleteTodoMutation,
} = apiTodos;
