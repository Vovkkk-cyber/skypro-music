'use client';

import styles from './centerblock.module.css';
import Search from '../Search/Search';
import Filter from '../Filter/Filter';
import Title from '../Title/Title';
import Tracks from '../Tracks/Tracks';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useEffect } from 'react';
import { useAppDispatch } from '@/store/store';
import { setPagePlaylist } from '@/store/features/trackSlice';


type CenterblockProp = {
  pagePlaylist: TrackType[],
  playlist: TrackType[],
  categoryName?: string,
  isLoading: boolean,
  error: string,
  isAuthRequired: boolean
}
export default function Centerblock({ pagePlaylist, playlist, categoryName, isLoading, error, isAuthRequired }: CenterblockProp) {
  // console.log("Отфильтрованные треки в Centerblock: ", playlist);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoading && !error) {
      dispatch(setPagePlaylist(pagePlaylist));
    }
  }, [isLoading, error]);

  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>{categoryName || 'Треки'}</h2>
      <Filter playlist={pagePlaylist} />
      <div className={styles.centerblock__content}>
        <Title />
        <Tracks playlist={playlist} isLoading={isLoading} error={error} isAuthRequired={isAuthRequired}/>
      </div>
    </div>
  )
}