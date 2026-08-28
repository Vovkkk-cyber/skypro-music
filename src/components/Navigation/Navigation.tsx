'use client'

import Image from 'next/image';
import Link from 'next/link';
import styles from './navigation.module.css';
import { useEffect, useState } from 'react';
import { clearUser } from '@/store/features/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useRouter } from 'next/navigation';


export default function Navigation() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isAccessToken = useAppSelector((state) => state.auth.access);
  // console.log("isAccessToken: ", isAccessToken);

  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if (!isAccessToken) {
      setIsAuth(false);
      setIsLoading(false);
      return;
    } else if (isAccessToken) {
      setIsAuth(true);
      setIsLoading(false);
    }
  }, [isAccessToken]);

  const onOpenBurgerMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  const goToMain = () => {
    router.push("/music/main");
  };

  const logout = () => {
    dispatch(clearUser());
    router.push("/auth/signin");
  };

  const login = () => {
    router.push("/auth/signin");
  };


  return (
    <nav className={styles.main__nav}>
      <div
        className={styles.nav__logo}
        onClick={goToMain}
      >
        <Image
          width={250}
          height={170}
          className={styles.logo__image}
          src="/img/logo.png"
          alt={'logo'}
        />
      </div>
      <div className={styles.nav__burger}
        onClick={onOpenBurgerMenu}
      >
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>
      {isBurgerMenuOpen &&
        <div className={styles.nav__menu}>
          <ul className={styles.menu__list}>
            <li className={styles.menu__item}>
              <Link href="/music/main" className={styles.menu__link}>
                Главное
              </Link>
            </li>
            <li className={styles.menu__item}>
              <Link href="/music/favorite" className={styles.menu__link}>
                Мой плейлист
              </Link>
            </li>
            <li className={styles.menu__item}>
              {isAuth ?
                <p
                  className={styles.menu__link}
                  onClick={logout}
                >
                  Выйти
                </p>
                :
                <p
                  className={styles.menu__link}
                  onClick={login}
                >
                  Войти
                </p>
              }
            </li>
            <li>
              <div>
                <Image
                  width={39}
                  height={39}
                  className={styles.theme__image}
                  src="/img/icon/theme-dark.svg"
                  alt={'theme'}
                />
              </div>
            </li>
          </ul>
        </div>
      }
    </nav>
  )
}