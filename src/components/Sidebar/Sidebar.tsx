'use client'


import Image from "next/image";
import Link from "next/link";
import styles from './sidebar.module.css';
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useRouter } from 'next/navigation';
import { clearUser } from "@/store/features/authSlice";
import Skeleton from "react-loading-skeleton";
import { useEffect, useState } from "react";


export default function Sidebar() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const username = useAppSelector((state) => state.auth.username);

  const isLoading = useAppSelector((state) => state.tracks.fetchIsLoading);

  const currentTheme = useAppSelector((state) => state.theme.theme);

  const isAccessToken = useAppSelector((state) => state.auth.access);

  // состояние для отслеживания смонтированности компонента
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);


  const logout = () => {
    dispatch(clearUser());
    router.push("/auth/signin");
  };


  const login = () => {
    router.push("/auth/signin");
  };


  if (isLoading) {
    return (
      <div className={styles.main__sidebar}>
        {/* пользователь */}
        <div className={styles.sidebar__personal}>
          <Skeleton width={100} height={20} style={{ marginRight: '16px' }} />
          <Skeleton circle width={40} height={40} />
        </div>

        {/* карточки плейлистов */}
        <div className={styles.sidebar__block}>
          <div className={styles.sidebar__list}>
            {[1, 2, 3].map((item) => (
              <div key={item} className={styles.sidebar__item}>
                <Skeleton width={250} height={150} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebar__personal}>

        {
          isAccessToken ?
            <>
              <p className={styles.sidebar__personalName}>{username}</p>
              <div
                className={styles.sidebar__icon}
                onClick={logout}
              >
                <svg>
                  <use xlinkHref={currentTheme === 'dark' ? "/img/icon/sprite.svg#logout" : "/img/icon/sprite.svg#logout-dark"}></use>
                </svg>
              </div>
            </>
            :
            <p className={styles.sidebar__personalName} onClick={login}>Авторизуйтесь</p>
        }
      </div >
      <div className={styles.sidebar__block}>
        <div className={styles.sidebar__list}>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/2">
              <Image
                className="sidebar__img"
                src="/img/playlist01.png"
                alt="day's playlist"
                width={250}
                height={150}
                loading="eager"
              />
            </Link>
          </div>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/3">
              <Image
                className="sidebar__img"
                src="/img/playlist02.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </Link>
          </div>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/4">
              <Image
                className="sidebar__img"
                src="/img/playlist03.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </Link>
          </div>
        </div>
      </div>
    </div >
  )
}
