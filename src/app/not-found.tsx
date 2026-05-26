'use client';

import Bar from '@/components/Bar/Bar';
import Navigation from '@/components/Navigation/Navigation';
import Sidebar from '@/components/Sidebar/Sidebar';
// import Link from 'next/link';
import styles from '@/app/not-found.module.css';
import Image from 'next/image';
import classNames from 'classnames';
import Link from 'next/link';
import Search from '@/components/Search/Search';
import { useRouter } from 'next/navigation';


export default function NotFound() {
  const router = useRouter();

  const goToMain = () => {
    router.push('/music/main/');
  }


  return (
    // <div>
    //   <h1>404 Страница не найдена</h1>
    //   <Link href="/music/main">На главную</Link>
    // </div>



    // <>
    //   <div className={styles.wrapper}>
    //     <div className={styles.container}>
    //       <main className={styles.main}>
    //         {/* <Navigation /> */}
    //         <div className={styles.not_found__wrapper}>
    //           <div className={styles.not_found__container}>
    //             <div className={styles.not_found__error}>404</div>
    //             <div className={styles.not_found__text_container}>
    //               <div className={styles.not_found__text}>Страница не найдена</div>
    //               <Image
    //                 width={52}
    //                 height={52}
    //                 className={styles.not_found__image}
    //                 src="/img/icon/smile_crying.svg"
    //                 alt={'crying smile'}
    //               />
    //             </div>
    //             <div className={styles.not_found__message01}>Возможно, она была удалена</div>
    //             <div className={styles.not_found__message02}>или перенесена на другой адрес</div>
    //             <div className={styles.not_found__button_container}>
    //               <button className={styles.not_found__button}>
    //                 Вернуться на главную
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //         {/* <Sidebar /> */}
    //       </main>
    //       {/* <Bar /> */}
    //       <footer className="footer"></footer>
    //     </div>
    //   </div>
    // </>



    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>

          <div className={styles.nav__container}>
            <Navigation />
          </div>

          <div className={styles.centerblock__container}>
            <Search />

            <div className={styles.not_found__wrapper}>
              <div className={styles.not_found__container}>
                <div className={styles.not_found__error}>404</div>
                <div className={styles.not_found__text_container}>
                  <div className={styles.not_found__text}>Страница не найдена</div>
                  <Image
                    width={52}
                    height={52}
                    className={styles.not_found__image}
                    src="/img/icon/smile_crying.svg"
                    alt={'crying smile'}
                  />
                </div>
                <p className={styles.not_found__message01}>Возможно, она была удалена</p>
                <p className={styles.not_found__message02}>или перенесена на другой адрес</p>
                <div className={styles.not_found__button_container}>
                  <button className={styles.not_found__button}
                    onClick={goToMain}
                  >
                    Вернуться на главную
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* <Sidebar /> */}
          <div className={styles.logout__container}>
            <div className={styles.main__sidebar}>
              <div className={styles.sidebar__personal}>
                {/* <p className={styles.sidebar__personalName}>{"Авторизуйтесь"}</p> */}
                <div
                  className={styles.sidebar__icon}
                // onClick={logout}
                >
                  <svg>
                    <use xlinkHref="/img/icon/sprite.svg#logout"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>

        </main>

        <footer className="footer">


          <div className={styles.bar__content}>
            <div className={styles.trackPlay__timeBlock}>
              <div className={styles.trackPlay__time}>
                {/* {getTimePanel(currentTime, duration)} */}
              </div>
            </div>
            {/* <ProgressBar
              max={duration || 0} // если duration нет, то показывает 0 (пустая шкала)
              value={currentTime || 0}
              step={0.1}
              onChange={onChangeProgress}
              readOnly={!isLoadedTrack} // когда трек загрузился readOnly = true
            /> */}
            <div className={styles.bar__playerBlock}>
              <div className={styles.bar__player}>
                <div className={styles.player__controls}>
                  <div
                    className={classNames(styles.player__btnPrev, styles.btn)}
                  // onClick={onSetPrevTrack}
                  >
                    <svg className={styles.player__btnPrevSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                    </svg>
                  </div>
                  <div className={classNames(styles.player__btnPlay, styles.btn)}
                  // onClick={playPauseTrack}
                  >
                    <svg className={styles.player__btnPlaySvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-play"></use>
                      {/* <use xlinkHref={
                        currentTrackIsPlay ? "/img/icon/sprite.svg#icon-pause" : "/img/icon/sprite.svg#icon-play"}></use> */}
                    </svg>
                  </div>
                  <div
                    className={classNames(styles.player__btnNext, styles.btn)}
                  // onClick={onSetNextTrack}
                  >
                    <svg className={styles.player__btnNextSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                    </svg>
                  </div>
                  <div
                    // onClick={onToggleLoop}
                    className={
                      classNames(
                        styles.player__btnRepeat,
                        // { [styles.btnIcon__active]: isLoop, },
                        // { [styles.btnIcon]: !isLoop, },
                      )}
                  >
                    <svg className={styles.player__btnRepeatSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                    </svg>
                  </div>
                  <div
                    className={
                      classNames(
                        styles.player__btnShuffle,
                        // { [styles.btnIcon__active]: isShuffle, },
                        // { [styles.btnIcon]: !isShuffle, }
                      )
                    }
                  // onClick={onToggleShuffle}
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
                        {/* {currentTrackName} */}
                      </Link>
                    </div>
                    <div className={styles.trackPlay__album}>
                      <Link className={styles.trackPlay__albumLink} href="">
                        {/* {currentTrackAuthor} */}
                      </Link>
                    </div>
                  </div>

                  <div className={styles.trackPlay__like}>
                    <div
                      className={classNames(styles.player__btnLike, styles.btnIcon)}
                    // onClick={toggleLike}
                    >
                      <svg className={styles.trackPlay__likeSvg}>
                        {/* <use xlinkHref={`/img/icon/sprite.svg#${isLike && isAccessToken ? "icon-like-active" : "icon-like"}`}></use> */}
                      </svg>
                    </div>

                  </div>
                </div>
              </div>
              <div className={styles.bar__volumeBlock}>
                <div className={styles.volume__content}>
                  <div
                    className={styles.volume__image}
                  // onClick={onMute}
                  >
                    <svg className={styles.volume__svg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                      {/* <use xlinkHref={isMuted ? "/img/icon/sprite.svg#icon-mute" : "/img/icon/sprite.svg#icon-volume"}></use> */}

                    </svg>
                  </div>
                  <div className={classNames(styles.volume__progress, styles.btn)}>
                    <input
                      className={classNames(styles.volume__progressLine, styles.btn)}
                      type="range"
                      name="range"
                      min="0"
                      max="1"
                      step="0.01"
                    // value={volume}
                    // onChange={(e) => onVolumeChange(Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>


        </footer>
      </div>
    </div>
  )
}