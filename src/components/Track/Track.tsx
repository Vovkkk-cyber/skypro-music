'use client';

import Link from 'next/link';
import styles from './Track.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setCurrentTrack, setCurrentPlaylist, setIsPlay } from '@/store/features/trackSlice';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { checkAccessToken, formatTime } from '@/utils/helpers';
import classNames from 'classnames';
import { MouseEvent, useEffect, useState } from 'react';
import { addTrackToFavorite, getFavoriteTracks, refreshAccessToken } from '@/app/services/tracks/trackApi';

type trackTypeProp = {
  // name: string,
  // author: string,
  // album: string,
  // time: string
  track: TrackType;
  playlist: TrackType[];
};

// export default function Track({ name, author, album, time }: trackProp) {
export default function Track({ track, playlist }: trackTypeProp) {
  const dispatch = useAppDispatch();

  // получить id пользователя из LS
  const userId = localStorage.getItem("userId");
  // console.log("Id юзера из LS: ", userId);

  const usersList = track.stared_user;
  // console.log("Список пользователей в треке: ", usersList);
  // console.log(typeof usersList[0]);

  let isTrackInFavorite;

  if (userId) {
    // проверить, есть ли id пользователя в списке пользователей трека
    isTrackInFavorite = usersList.includes(userId);
    // console.log("Id юзера есть в списке трека: ", isTrackInFavorite);
  }


  const [isLiked, setIsLiked] = useState(isTrackInFavorite);
  // const [isLikedInPlaylist, setIsLikedInPlaylist] = useState(false);
  // const [isLikedInPlayer, setIsLikedInPlayer] = useState(false);
  const [error, setError] = useState('');
  const [access, setAccess] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState();
  ;


  // получить текущий трек
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  // console.log("currentTrack в PlaylistTrack: ", currentTrack);

  const currentTrackId = useAppSelector((state) => state.tracks.currentTrack?._id)
  // console.log("currentTrackId в PlaylistTrack: ", currentTrackId);

  // const currentTrackStaredUser = useAppSelector((state) => state.tracks.currentTrack?.staredUser)
  // console.log("currentTrackStaredUser в PlaylistTrack: ", currentTrackStaredUser);

  // проверить, что текущий трек играет
  const currentTrackIsPlay = useAppSelector((state) => state.tracks.isPlay);
  // console.log("currentTrackIsPlay в PlaylistTrack: ", currentTrackIsPlay);


  const onClickTrack = () => {
    dispatch(setCurrentTrack(track));
    dispatch(setIsPlay(true));
    dispatch(setCurrentPlaylist(playlist));

    // console.log("playlist: ", playlist);
  }

  const onClickLikeInPlaylist = async (e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>, trackId: number, staredUser: string[]) => {
    console.log("Кликнули по лайку");

    // проверить наличие id пользователя в списке пользователей трека


    setIsLiked(!isLiked);


    // получить данные из localStorage
    const accessToken = localStorage.getItem("access");
    const refreshToken = localStorage.getItem("refresh");
    // const userId = localStorage.getItem("userId");
    let newAccessToken = "";

    // проверить access token
    const isAccessTokenExpired = checkAccessToken();

    // если access token протух, то обновить его
    if (isAccessTokenExpired) {
      // console.log("Токен протух: ", isAccessTokenExpired);
      if (typeof refreshToken === "string" && typeof accessToken === "string") {
        newAccessToken = await refreshAccessToken(refreshToken);
        // console.log("Новый access token: ", newAccessToken);

        // текущее время в секундах
        const currentTime = new Date().getTime() / 1000;

        // обновить время получения токена в LS
        localStorage.setItem("tokenGetTime", String(currentTime));

        // обновить access token в LS
        localStorage.setItem("access", newAccessToken);
        // console.log("Токен обновили и записали новый в LS");
      }
    }


    const accessTokenToUse = isAccessTokenExpired ? newAccessToken : accessToken;


    console.log("accessTokenToUse перед добавлением трека в избранное: ", accessTokenToUse);
    console.log("currentTrackId перед добавлением трека в избранное: ", currentTrackId);

    if (accessTokenToUse) {
      try {
        await addTrackToFavorite(trackId, accessTokenToUse);
        console.log("Добавили трек в избранное");
        // setIsLiked(true);
      } catch (error) {
        console.error("Ошибка при добавлении трека в избранное: ", error);
      }
    }
  };


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
        <div className="track__time">
          <svg className={styles.track__timeSvg}
            onClick={(e) => onClickLikeInPlaylist(e, track._id, track.stared_user)}
          >
            {
              isLiked ?
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
