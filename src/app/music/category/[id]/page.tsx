'use client';


import { useParams } from "next/navigation";
import Centerblock from '@/components/Centerblock/Centerblock';
import { useEffect, useState } from 'react';
import { getCategoryTracks } from '@/app/services/tracks/trackApi';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';
import { useAppDispatch, useAppSelector } from "@/store/store";
import { resetFilters, setFetchIsLoading } from "@/store/features/trackSlice";


type CategoryType = {
  items: number[],
  name: string
}


export default function CategoryPage() {
  const params = useParams<{ id: string }>();

  const dispatch = useAppDispatch();

  const isAuthRequired = false;

  const { allTracks, fetchError, filters, filtredTracks } = useAppSelector((state) => state.tracks);

  const [categoryTracks, setCategoryTracks] = useState<TrackType[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(resetFilters());
  }, []);

  useEffect(() => {
    dispatch(setFetchIsLoading(true));
    setIsLoading(true);
    if (allTracks.length > 0) {
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
          dispatch(setFetchIsLoading(false));
        });
    }
  }, [params.id, allTracks.length, dispatch]);

    // получить плэйлист текущей страницы
  const [playlist, setPlaylist] = useState<TrackType[]>([]);

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
