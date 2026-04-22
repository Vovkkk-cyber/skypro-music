'use client';

import Link from 'next/link';
import styles from './bar.module.css';
import classnames from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect, useRef, useState, ChangeEvent } from 'react';
import { setIsPlay, setNextTrack, setPrevTrack, toggleIsShuffle } from '@/store/features/trackSlice';
import { getTimePanel } from '@/utils/helpers';
import ProgressBar from '../ProgressBar/ProgressBar';


export default function Bar() {
  const dispatch = useAppDispatch();

  // получить текущий трек
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  // console.log("currentTrack в Bar: ", currentTrack);
  const currentTrackName = useAppSelector((state) => state.tracks.currentTrack?.name);
  const currentTrackAuthor = useAppSelector((state) => state.tracks.currentTrack?.author);

  // // получить текущий плейлист
  // const currentPlaylist = useAppSelector((state) => state.tracks.currentPlaylist);

  // const currentTrackIndex = currentPlaylist.findIndex((track) => track._id === currentTrack?._id)

  // // получить текущий перемешанный плейлист
  // const shaffledPlaylist = useAppSelector((state) => state.tracks.shuffledPlaylist);

  // const shuffledTrackIndex = shaffledPlaylist.findIndex((track) => track._id === currentTrack?._id)

  // проверить, что текущий трек играет
  const currentTrackIsPlay = useAppSelector((state) => state.tracks.isPlay);
  // console.log("currentTrackIsPlay в Bar: ", currentTrackIsPlay);

  // проверить, включен ли shuffle
  const isShuffle = useAppSelector((state) => state.tracks.isShuffle);


  const [volume, setVolume] = useState(0.5);
  // console.log("volume", volume);
  const [isLoop, setIsLoop] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoadedTrack, setIsLoadedTrack] = useState(false);
  const [progressBarTime, setProgressBarTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(0.5);
  // console.log("currentVolume: ", currentVolume);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // const playlist = isShuffle ? shaffledPlaylist : currentPlaylist;
  // const trackIndex = isShuffle ? shuffledTrackIndex : currentTrackIndex;


  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = 0;
      } else {
        audioRef.current.volume = volume;
      }
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // при смене трека обнулять состояние, что трек не загрузился
  useEffect(() => {
    setIsLoadedTrack(false);
  }, [currentTrack]);

  // useEffect(() => {
  //   if (audioRef.current && currentTrack) {
  //     audioRef.current.src = currentTrack.track_file;
  //     audioRef.current.play();
  //     setIsPlay(true);
  //   }
  // }, [currentTrack])


  if (!currentTrack) return <></>;

  if (currentTrack && currentTrackIsPlay && audioRef.current) {
    audioRef.current.play();
  }


  const playPauseTrack = () => {
    if (currentTrackIsPlay === false) {
      // console.log("Нажали кнопку Play");
      if (audioRef.current) {
        audioRef.current.play();
        dispatch(setIsPlay(true));
      }
    } else {
      // console.log("Нажали кнопку Pause");
      if (audioRef.current) {
        audioRef.current.pause();
        dispatch(setIsPlay(false));
      }
    }
  };

  const onVolumeChange = (currentVolumeLevel: number) => {
    if (audioRef.current) {
      if (currentVolumeLevel === 0) {
        setIsMuted(true);
        setVolume(0);
      } else if (currentVolumeLevel > 0) {
        setVolume(currentVolumeLevel);
        setIsMuted(false);
      }
    }
  };

  const onToggleLoop = () => {
    setIsLoop(!isLoop);
  };

  const onTimeUpdate = () => {
    // console.log(`трек "${currentTrackName}" isLoadedTrack: `, isLoadedTrack);
    if (audioRef.current && isLoadedTrack) {
      // // учесть загрузился трек или нет, начинать проиграывать только после загрузки
      // isLoadedTrack д.б. = true
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);

      // console.log("currentTime: ", currentTime);
      // console.log("duration: ", duration);
    }
  };

  const onLoadedMetadata = () => {
    // console.log("Start");
    if (audioRef.current) {
      audioRef.current.play();
      dispatch(setIsPlay(true));
      setIsLoadedTrack(true);
    }
  };

  const onEnded = () => {
    // console.log("isLoop: ", isLoop);
    // console.log("Next track");
    dispatch(setIsPlay(false));
    // setIsLoadedTrack(false);

    if (isLoop) {
      if (audioRef.current) {
        audioRef.current.play();
      }
    } else {
      dispatch(setNextTrack());
    }
  };

  // const onChangeProgress = (e: React.ChangeEvent<HTMLInputElement>) => { // React. - вместо импорта ChangeEvent
  const onChangeProgress = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log("e: ", e);
    // 0. получить новое время из события клика по шкале
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      // 1. сначала новое время установить в audio, чтобы аудиоплеер немедленно начал воспроизводить трек с нового времени
      audioRef.current.currentTime = newTime;

      // 2. обновить состояние currentTime, из него берётся время для вывода на экран. Обновляется после обновления в audio -> время в audio и на экране одинаковое. Если в обратном порядке, то м.б. ошибки
      setCurrentTime(newTime);

      // 3. обновить состояние progressBarTime после обновления currentTime, т.к. заполнение progressBarTime зависит от currentTime
      setProgressBarTime(newTime);
    }
  };

  const onSetNextTrack = () => {
    dispatch(setNextTrack());
  };

  const onSetPrevTrack = () => {
    dispatch(setPrevTrack());
  };

  const onToggleShuffle = () => {
    dispatch(toggleIsShuffle());
  };

  const onMute = () => {
    if (audioRef.current) {
      if (isMuted === false) {
        setCurrentVolume(audioRef.current.volume);
        setIsMuted(!isMuted);
        setVolume(0);
      } else if (isMuted === true) {
        setVolume(currentVolume);
        setIsMuted(!isMuted);
      }
    }
  };


  return (
    <div className={styles.bar}>
      <audio
        className={styles.audio}
        controls
        ref={audioRef}
        src={currentTrack?.track_file}
        loop={isLoop}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
        muted={isMuted}
      >
      </audio>
      <div className={styles.bar__content}>
        <div className={styles.trackPlay__timeBlock}>
          <div className={styles.trackPlay__time}>
            {getTimePanel(currentTime, duration)}
          </div>
        </div>
        {/* <div className={styles.bar__playerProgress}></div> */}
        <ProgressBar
          // max={audioRef.current?.duration || 0} // если duration нет, то показывает 0 (пустая шкала)
          max={duration || 0} // если duration нет, то показывает 0 (пустая шкала)
          value={currentTime || 0}
          step={0.1}
          onChange={onChangeProgress}
          readOnly={!isLoadedTrack} // когда трек загрузился readOnly = true
        />
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div
                className={classnames(styles.player__btnPrev, styles.btn)}
                onClick={onSetPrevTrack}
              >
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div className={classnames(styles.player__btnPlay, styles.btn)}
                onClick={playPauseTrack}
              >
                <svg className={styles.player__btnPlaySvg}>
                  <use xlinkHref={
                    currentTrackIsPlay ? "/img/icon/sprite.svg#icon-pause" : "/img/icon/sprite.svg#icon-play"}></use>
                </svg>
              </div>
              <div
                className={classnames(styles.player__btnNext, styles.btn)}
                onClick={onSetNextTrack}
              >
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div
                onClick={onToggleLoop}
                className={
                  classnames(
                    styles.player__btnRepeat,
                    { [styles.btnIcon__active]: isLoop, },
                    { [styles.btnIcon]: !isLoop, },
                  )}
              >
                <svg className={styles.player__btnRepeatSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div
                className={
                  classnames(
                    styles.player__btnShuffle, 
                    { [styles.btnIcon__active]: isShuffle, },
                    { [styles.btnIcon]: !isShuffle, }
                  )
                }
                onClick={onToggleShuffle}
              >
                <svg className={styles.player__btnShuffleSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackPlay__author}>
                  <Link className={styles.trackPlay__authorLink} href="">
                    {currentTrackName}
                  </Link>
                </div>
                <div className={styles.trackPlay__album}>
                  <Link className={styles.trackPlay__albumLink} href="">
                    {currentTrackAuthor}
                  </Link>
                </div>
              </div>

              <div className={styles.trackPlay__dislike}>
                <div className={classnames(styles.player__btnShuffle, styles.btnIcon)}>
                  <svg className={styles.trackPlay__likeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                  </svg>
                </div>
                <div className={classnames(styles.trackPlay__dislike, styles.btnIcon)}>
                  <svg className={styles.trackPlay__dislikeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <div
                className={styles.volume__image}
                onClick={onMute}
              >
                <svg className={styles.volume__svg}>
                  {/* <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use> */}
                  <use xlinkHref={isMuted ? "/img/icon/sprite.svg#icon-mute" : "/img/icon/sprite.svg#icon-volume"}></use>

                  {/* <svg className={styles.volume__svg}
                  width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="path-1-inside-1_8_34" fill="white">
                    <path d="M8 18L3 13H0V5H3L8 0V18Z" />
                  </mask>
                  <path d="M8 18L3 13H0V5H3L8 0V18Z" fill="none" />
                  <path d="M8 18L7.29289 18.7071L9 20.4142V18H8ZM3 13L3.70711 12.2929L3.41421 12H3V13ZM0 13H-1V14H0V13ZM0 5V4H-1V5H0ZM3 5V6H3.41421L3.70711 5.70711L3 5ZM8 0H9V-2.41421L7.29289 -0.707107L8 0ZM8 18L8.70711 17.2929L3.70711 12.2929L3 13L2.29289 13.7071L7.29289 18.7071L8 18ZM3 13V12H0V13V14H3V13ZM0 13H1V5H0H-1V13H0ZM0 5V6H3V5V4H0V5ZM3 5L3.70711 5.70711L8.70711 0.707107L8 0L7.29289 -0.707107L2.29289 4.29289L3 5ZM8 0H7V18H8H9V0H8Z" fill="white" mask="url(#path-1-inside-1_8_34)" />
                  <path d="M9 6L15 13M9 6L15 13" stroke="white" />
                  <path d="M15 6L9.02068 13.0177M15 6L9.02068 13.0177" stroke="white" /> */}
                </svg>
              </div>
              <div className={classnames(styles.volume__progress, styles.btn)}>
                <input
                  className={classnames(styles.volume__progressLine, styles.btn)}
                  type="range"
                  name="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => onVolumeChange(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}