/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import Centerblock from '@/components/Centerblock/Centerblock';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { resetFilters, setFavoriteTracks } from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect, useState } from 'react';


export default function FavoritePage() {
  const dispatch = useAppDispatch();
  // const { favoriteTracks, fetchIsLoading, fetchError, allTracks, filters, filtredTracks } = useAppSelector((state) => state.tracks);
  const { fetchIsLoading, fetchError, filters, filtredTracks } = useAppSelector((state) => state.tracks);

  const isAuthRequired = true;

  // получить плэйлист текущей страницы
  const [playlist, setPlaylist] = useState<TrackType[]>([]);
  const [myTracks, setMyTracks] = useState<TrackType[]>([]);

  useEffect(() => {
    dispatch(resetFilters());
  }, []);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteTracks');
    // console.log("savedFavorites: ", savedFavorites);

    const favoritePlaylist: TrackType[] | [] | null = savedFavorites ? JSON.parse(savedFavorites) : [];
    // console.log("favoritePlaylist: ", favoritePlaylist);

    if (favoritePlaylist) {
      setMyTracks(favoritePlaylist);
      dispatch(setFavoriteTracks(favoritePlaylist));
    }
  }, [dispatch]);

  // получить плэйлист текущей страницы в зависимости от иcпользования фильтров, поиска
  // useEffect(() => {
  //   const currentPlaylist = filters.authors.length ? filtredTracks : myTracks;
  //   setPlaylist(currentPlaylist);
  // }, [myTracks, filtredTracks]);

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
        // playlist={favoriteTracks}
        playlist={playlist}
        isLoading={fetchIsLoading}
        error={fetchError || ''}
        isAuthRequired={isAuthRequired}
      />
    </>
  )
}
