import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Chater from "./Chater";

const Character = () => {
  // 기존 방식
  // const [characters, setCharacters] = useState([]);

  // const fetchCharacters = async () => {
  //   const response = await fetch("https://rickandmortyapi.com/api/character");
  //   const data = await response.json();
  //   setCharacters(data.results);
  // };

  // useEffect(() => {
  //   fetchCharacters();
  // }, []);

  // 초기세팅 이해하기
  // - QueryClient, QueryClientProvider

  // useQuery 이해하기
  // - isLoading, isError, data, isPreviousData
  // - quertyKey, keepPreviousData,

  const [page, setPage] = useState(1);

  const fetchCharacters = async ({ queryKey }) => {
    console.log(queryKey);
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character?page=${queryKey[1]}`
    );

    return response.data;
  };

  const { isLoading, isError, isPreviousData, data } = useQuery(
    ["characters", page],
    fetchCharacters,
    {
      keepPreviousData: true,
    }
  );

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="characters">
      {data.results?.map((char) => (
        <Chater key={char.id} character={char} />
      ))}

      <div>
        <button disabled={page === 1} onClick={() => setPage((old) => old - 1)}>
          Previous
        </button>
        <button
          disabled={!data.info.next}
          onClick={() => setPage((old) => old + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Character;
