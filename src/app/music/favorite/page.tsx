'use client';


import Centerblock from '@/components/Centerblock/Centerblock';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { resetFilters, setFavoriteTracks, setFetchIsLoading } from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect, useState } from 'react';


export default function FavoritePage() {
  const dispatch = useAppDispatch();
  const { fetchIsLoading, fetchError, filters, filtredTracks } = useAppSelector((state) => state.tracks);

  const isAuthRequired = true;

  // получить плэйлист текущей страницы
  const [playlist, setPlaylist] = useState<TrackType[]>([]);
  const [myTracks, setMyTracks] = useState<TrackType[]>([]);

  useEffect(() => {
    dispatch(resetFilters());
  }, []);

  useEffect(() => {
    dispatch(setFetchIsLoading(true));

    const savedFavorites = localStorage.getItem('favoriteTracks');

    const favoritePlaylist: TrackType[] | [] | null = savedFavorites ? JSON.parse(savedFavorites) : [];

    if (favoritePlaylist) {
      setMyTracks(favoritePlaylist);
      dispatch(setFavoriteTracks(favoritePlaylist));
    };

    const timer = setTimeout(() => {
      dispatch(setFetchIsLoading(false));
    }, 500);

    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    const isFiltersEnabled = Object.entries(filters).map(([key, value]) => {
      if (key === 'years') {
        return value !== 'По умолчанию';
      };

      return !!value.length;
    }).some(Boolean);

    const currentPlaylist = isFiltersEnabled ? filtredTracks : myTracks;
    setPlaylist(currentPlaylist);
  }, [myTracks, filtredTracks, filters]);


  return (
    <>
      <Centerblock
        categoryName="Мои треки"
        pagePlaylist={myTracks}
        playlist={playlist}
        isLoading={fetchIsLoading}
        error={fetchError || ''}
        isAuthRequired={isAuthRequired}
      />
    </>
  )
}
