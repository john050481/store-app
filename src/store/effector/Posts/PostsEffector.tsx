import { useUnit } from 'effector-react';
import { $posts, $error, $isLoading, fetchPostsFx } from './store';
import { useEffect } from 'react';

export const PostsEffector = () => {
  const [posts, error, isLoading] = useUnit([$posts, $error, $isLoading]);

  useEffect(() => {
    fetchPostsFx();
  }, []);
  // // или
  // const { counter, onIncremented, onDecremented } = useUnit({ $counter, incremented, decremented });
  // // или
  // const counter = useUnit($counter);
  // const onIncremented = useUnit(incremented);
  // const onDecremented = useUnit(decremented);

  if (isLoading) {
    return <>Loading ...</>;
  }

  if (error) {
    return <>{`Error ...${error}`}</>;
  }

  return (
    <div>
      <h2>Effector Posts: {posts?.length}</h2>
      {posts?.map((item) => (
        <div key={item.id}>
          {item.title} - {item.views}
        </div>
      ))}
    </div>
  );
};
