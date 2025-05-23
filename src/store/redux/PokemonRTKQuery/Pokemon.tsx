import { useGetPokemonByNameQuery } from './services/pokemon';

export const Pokemon = ({
  name,
  pollingInterval,
}: {
  name: string;
  pollingInterval: number;
}) => {
  const { data, error, isLoading, isFetching, refetch } =
    useGetPokemonByNameQuery(name, {
      pollingInterval,
    });

  return (
    <>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>
            {data.species.name} {isFetching ? '...' : ''}
          </h3>
          <button onClick={() => refetch()}>refetch</button>
          <img src={data.sprites.front_shiny} alt={data.species.name} />
        </>
      ) : null}
    </>
  );
};
