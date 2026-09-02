/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import Link from 'next/link';
import styles from './Track.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setCurrentTrack, setCurrentPlaylist, setIsPlay } from '@/store/features/trackSlice';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { formatTime } from '@/utils/helpers';
import classNames from 'classnames';
import { useLikeTrack } from '@/hooks/useLikeTrack';
import { useEffect, useState } from 'react';


type trackTypeProp = {
  track: TrackType,
  playlist: TrackType[]
}

export default function Track({ track, playlist }: trackTypeProp) {
  const dispatch = useAppDispatch();

   const isAccessToken = useAppSelector((state) => state.auth.access);

  const { toggleLike, isLike, isLoading } = useLikeTrack(track);
  const [isAnimating, setIsAnimating] = useState(false);

  // получить текущий трек
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  // console.log("currentTrack в PlaylistTrack: ", currentTrack);

  const currentTrackId = useAppSelector((state) => state.tracks.currentTrack?._id)
  // console.log("currentTrackId в PlaylistTrack: ", currentTrackId);

  // проверить, что текущий трек играет
  const currentTrackIsPlay = useAppSelector((state) => state.tracks.isPlay);
  // console.log("currentTrackIsPlay в PlaylistTrack: ", currentTrackIsPlay);


    // Эффект для отслеживания окончания загрузки
  useEffect(() => {
    if (!isLoading && isAnimating) {
      setIsAnimating(false);
    }
  }, [isLoading, isAnimating]);

  const handleLikeClick = async () => {
    setIsAnimating(true);
    toggleLike();
  };

  const onClickTrack = () => {
    dispatch(setCurrentTrack(track));
    dispatch(setIsPlay(true));
    dispatch(setCurrentPlaylist(playlist));
  }


  return (
    <div className={styles.playlist__item}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}
          onClick={onClickTrack}
        >
          <div className={styles.track__titleImage}>
            <svg className={classNames(
              styles.track__titleSvg,
              {
                [styles.track__selected]: currentTrack && currentTrackId === track._id,
                [styles.track__active]: currentTrackIsPlay === true && currentTrackId === track._id,
              }
            )}>
              {currentTrackId !== track._id && <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>}
            </svg>
          </div>
          <div className="track__title-text">
            <Link className={styles.track__titleLink} href="">
              {track.name} <span className={styles.track__titleSpan}></span>
            </Link>
          </div>
        </div>
        <div className={styles.track__author}>
          <Link className={styles.track__authorLink} href="">
            {track.author}
          </Link>
        </div>
        <div className={styles.track__album}>
          <Link className={styles.track__albumLink} href="">
            {track.album}
          </Link>
        </div>
        <div className={styles.track__time}>
          {/* <svg className={styles.track__timeSvgLike}
            onClick={toggleLike}
          > */}

          <svg
            className={classNames(
              styles.track__timeSvgLike,
              {
                [styles.track__timeSvgLikeActive]: isLike && isAccessToken,
                [styles.track__timeSvgAnimating]: isAnimating
              }
            )}
            onClick={handleLikeClick}
          >

            {
              isLike && isAccessToken ?
                <use xlinkHref="/img/icon/sprite.svg#icon-like-active"></use>
                :
                <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
            }
          </svg>
          <span className={styles.track__timeText}>{formatTime(track.duration_in_seconds)}</span>
        </div>
      </div>
    </div >
  )
}