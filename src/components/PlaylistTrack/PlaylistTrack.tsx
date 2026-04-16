'use client';

import Link from 'next/link';
import styles from './playlistTrack.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setCurrentTrack, setIsPlay } from '@/store/features/trackSlice';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { formatTime } from '@/utils/helpers';
import classNames from 'classnames';


type trackTypeProp = {
  // name: string,
  // author: string,
  // album: string,
  // time: string
  track: TrackType
}

// export default function PlaylistTrack({ name, author, album, time }: trackProp) {
export default function PlaylistTrack({ track }: trackTypeProp) {
  const dispatch = useAppDispatch();

  // получить текущий трек
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  // console.log("currentTrack в PlaylistTrack: ", currentTrack);

  const currentTrackId = useAppSelector((state) => state.tracks.currentTrack?._id)
  // console.log("currentTrackId в PlaylistTrack: ", currentTrackId);

  // проверить, что текущий трек играет
  const currentTrackIsPlay = useAppSelector((state) => state.tracks.isPlay);
  // console.log("currentTrackIsPlay в PlaylistTrack: ", currentTrackIsPlay);


  const onClickTrack = () => {
    dispatch(setCurrentTrack(track));
    dispatch(setIsPlay(true));
  }


  return (
    <div className={styles.playlist__item}
      onClick={onClickTrack}
    >
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
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
        <div className="track__time">
          <svg className={styles.track__timeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={styles.track__timeText}>{formatTime(track.duration_in_seconds)}</span>
        </div>
      </div>
    </div >
  )
}
