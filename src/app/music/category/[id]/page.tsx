'use client';

import { useParams } from "next/navigation";
import Centerblock from '@/components/Centerblock/Centerblock';
import { useEffect, useState } from 'react';
import { getTracks, getCategoryTracks } from '@/app/services/tracks/trackApi';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';
import { useAppSelector } from "@/store/store";


type CategoryType = {
  items: number[],
  name: string
}


export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  // console.log("id из params: ", params.id);

  const isAuthRequired = false;

  const { fetchIsLoading, allTracks, fetchError } = useAppSelector((state) => state.tracks);

  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [categoryTracks, setCategoryTracks] = useState<TrackType[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setIsLoading(true);
    if (!fetchIsLoading && allTracks.length) {
      getCategoryTracks(params.id)
        .then((res: CategoryType) => {
          // console.log("params.id: ", params.id);
          // console.log("результат запроса категории: ", res);

          const itemsId = res.items;
          // console.log("id треков категории: ", itemsId);

          // console.log("Название категории:", res.name);
          setCategoryName(res.name);

          const filteredTracks = allTracks.filter((track) => itemsId.includes(track._id));
          // console.log("Отфильтрованные треки: ", filteredTracks);

          setCategoryTracks(filteredTracks);
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response) {
              // // Запрос был сделан, и сервер ответил кодом состояния, который выходит за пределы 2xx
              // console.log(error.response.data);
              // console.log(error.response.status);
              // console.log(error.response.headers);

              setError(error.response.data);
            } else if (error.request) {
              // // Запрос был сделан, но ответ не получен
              // // `error.request`- это экземпляр XMLHttpRequest в браузере и экземпляр http.ClientRequest в node.js
              // console.log(error.request);

              setError("Отсутствует интеренет");
            } else {
              // // Произошло что-то при настройке запроса, вызвавшее ошибку
              // console.log('Error', error.message);

              setError("Неизвестная ошибка");
            }
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [tracks, fetchIsLoading, params.id]);


  return (
    <>
      <Centerblock
        categoryName={categoryName}
        playlist={categoryTracks}
        isLoading={isLoading}
        error={fetchError || error}
        isAuthRequired={isAuthRequired}
      />
    </>
  )
}
