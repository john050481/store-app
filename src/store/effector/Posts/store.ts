import { createStore, createEffect } from 'effector';

type TPostsDto = {
  id: string;
  title: string;
  views: number;
};

export const fetchPostsFx = createEffect(async () => {
  const response = await fetch(`http://localhost:3001/posts`);

  return response.json();
});

export const $error = createStore<string | null>(null);
export const $posts = createStore<TPostsDto[] | null>(null);
export const $isLoading = fetchPostsFx.pending.map((isPending) => isPending);

$error.reset(fetchPostsFx.done);

// $posts.on(fetchPostsFx.done, (_, { params, result }) => result);
// $error.on(fetchPostsFx.fail, (_, { params, error }) => error.message);
// // или 🔃
$posts.on(fetchPostsFx.doneData, (_, result) => result);
$error.on(fetchPostsFx.failData, (_, error) => error.message);

$isLoading.watch((loading) => console.log('Is loading:', loading));
