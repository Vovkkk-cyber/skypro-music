'use client';

import { useParams } from "next/navigation";
import Centerblock from '@/components/Centerblock/Centerblock';
import { useEffect, useState } from 'react';
import { getTracks, getCategoryTracks } from '@/app/services/tracks/trackApi';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';
import { useAppDispatch, useAppSelector } from "@/store/store";
import { resetFilters } from "@/store/features/trackSlice";


type CategoryType = {
  items: number[],
  name: string
}


export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  // console.log("id из params: ", params.id);

  const dispatch = useAppDispatch();

  const isAuthRequired = false;

  const { fetchIsLoading, allTracks, fetchError, filters, filtredTracks } = useAppSelector((state) => state.tracks);

  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [categoryTracks, setCategoryTracks] = useState<TrackType[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(resetFilters());
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (!fetchIsLoading && allTracks.length) {
      getCategoryTracks(params.id)
        .then((res: CategoryType) => {
          const itemsId = res.items;

          setCategoryName(res.name);

          const filteredTracks = allTracks.filter((track) => itemsId.includes(track._id));


          setCategoryTracks(filteredTracks);
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response) {
              // // Запрос был сделан, и сервер ответил кодом состояния, который выходит за пределы 2xx

              setError(error.response.data);
            } else if (error.request) {


              setError("Отсутствует интеренет");
            } else {


              setError("Неизвестная ошибка");
            }
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [tracks, fetchIsLoading, params.id]);


    // получить плэйлист текущей страницы
  const [playlist, setPlaylist] = useState<TrackType[]>([]);

  // получить плэйлист текущей страницы в зависимости от иcпользования фильтров, поиска


  useEffect(() => {
    const isFiltersEnabled = Object.entries(filters).map(([key, value]) => {
      if(key === 'years') { 
        return value !== 'По умолчанию';
      };

      return !!value.length;
    }).some(Boolean);

    const currentPlaylist = isFiltersEnabled ? filtredTracks : categoryTracks;
    setPlaylist(currentPlaylist);
  }, [categoryTracks, filtredTracks, filters]);



  return (
    <>
      <Centerblock
        categoryName={categoryName}
        pagePlaylist={categoryTracks}
        playlist={playlist}
        isLoading={isLoading}
        error={fetchError || error}
        isAuthRequired={isAuthRequired}
      />
    </>
  )
}
