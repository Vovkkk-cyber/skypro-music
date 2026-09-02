import styles from './Tracks.module.css';
import Track from '../Track/Track';
import { TrackType } from '@/sharedTypes/sharedTypes';
import Loading from '../Loading/Loading';
import { useAppSelector } from '@/store/store';
import { useEffect, useState } from 'react';


type PlaylistTracksProp = {
  playlist: TrackType[],
  isLoading: boolean,
  error: string,
  isAuthRequired: boolean
}


export default function PlaylistTracks({ playlist, isLoading, error, isAuthRequired }: PlaylistTracksProp) {
  // console.log("треки в PlaylistTracks: ", playlist);
  // console.log("data в isLoading: ", isLoading);
  const isAccessToken = useAppSelector((state) => state.auth.access);


  return (
    <div className={styles.content__playlist}>
      {
        !isAccessToken && isAuthRequired ?
          <div className={styles.messageContainer}>Авторизуйтесь чтобы посмотреть избранные треки</div>
          :
          error ?
            <div className={styles.errorContainer}>{error}</div>
            :
            isLoading ?
              <Loading />
              :
              !playlist.length ?
                <div className={styles.messageContainer}>Треки не найдены</div>
                :
                playlist.map((track) =>
                  <Track
                    key={track._id}

                    track={track}
                    playlist={playlist}
                  />
                )}
    </div>
  )
}
