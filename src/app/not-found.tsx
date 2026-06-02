'use client';

import Navigation from '@/components/Navigation/Navigation';
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
                    alt={'плачущий смайлик'}
                  />
                </div>
                <p className={styles.not_found__message01}>Возможно, она была удалена</p>
                <p className={styles.not_found__message02}>или перенесена на другой адрес</p>
                <div className={styles.not_found__button_container}>
                  <button
                    className={styles.not_found__button}
                    onClick={goToMain}
                  >
                    Вернуться на главную
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.logout__container}>
            <div className={styles.main__sidebar}>
              <div className={styles.sidebar__personal}>
                <div className={styles.sidebar__icon}                >
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
              <div className={styles.trackPlay__time}></div>
            </div>
            <div className={styles.bar__playerBlock}>
              <div className={styles.bar__player}>
                <div className={styles.player__controls}>
                  <div className={classNames(styles.player__btnPrev, styles.btn)}                  >
                    <svg className={styles.player__btnPrevSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                    </svg>
                  </div>
                  <div className={classNames(styles.player__btnPlay, styles.btn)}                  >
                    <svg className={styles.player__btnPlaySvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-play"></use>
                    </svg>
                  </div>
                  <div className={classNames(styles.player__btnNext, styles.btn)}>
                    <svg className={styles.player__btnNextSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                    </svg>
                  </div>
                  <div className={classNames(styles.player__btnRepeat,)}                  >
                    <svg className={styles.player__btnRepeatSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                    </svg>
                  </div>
                  <div className={classNames(styles.player__btnShuffle,)}                  >
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
                      <Link className={styles.trackPlay__authorLink} href=""></Link>
                    </div>
                    <div className={styles.trackPlay__album}>
                      <Link className={styles.trackPlay__albumLink} href=""></Link>
                    </div>
                  </div>
                  <div className={styles.trackPlay__like}>
                    <div className={classNames(styles.player__btnLike, styles.btnIcon)}>
                      <svg className={styles.trackPlay__likeSvg}>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.bar__volumeBlock}>
                <div className={styles.volume__content}>
                  <div className={styles.volume__image}                >
                    <svg className={styles.volume__svg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
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
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div >
    </div >
  )
}