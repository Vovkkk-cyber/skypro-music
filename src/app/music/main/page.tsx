'use client';


import Centerblock from '@/components/Centerblock/Centerblock';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { resetFilters, setFavoriteTracks } from '@/store/features/trackSlice';
import { useAppSelector } from '@/store/store';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';


export default function Home() {
  const dispatch = useDispatch();

  const { fetchError, fetchIsLoading, allTracks, filters, filtredTracks } = useAppSelector((state) => state.tracks);

  const isAuthRequired = false;

  // получить плэйлист текущей страницы
  const [playlist, setPlaylist] = useState<TrackType[]>([]);

  useEffect (() => {
    dispatch(resetFilters());
  }, []);

  // получить плэйлист текущей страницы в зависимости от иcпользования фильтров, поиска
  useEffect(() => {
    const isFiltersEnabled = Object.entries(filters).map(([key, value]) => {
      if(key === 'years') { 
        return value !== 'По умолчанию';
      };

      return !!value.length;
    }).some(Boolean);

    const currentPlaylist = isFiltersEnabled ? filtredTracks : allTracks;
    setPlaylist(currentPlaylist);
  }, [allTracks, filtredTracks, filters]);


  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteTracks');
    const favoriteTracks = savedFavorites ? JSON.parse(savedFavorites) : [];
    dispatch(setFavoriteTracks(favoriteTracks));
  }, [dispatch]);


  return (
    <>
      <Centerblock
        pagePlaylist={allTracks}
        playlist={playlist}
        isLoading={fetchIsLoading}
        error={fetchError ? fetchError : ''}
        isAuthRequired={isAuthRequired}
      />
    </>
  );
}