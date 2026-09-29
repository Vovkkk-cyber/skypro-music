'use client';


import { useAppDispatch, useAppSelector } from "@/store/store";
import styles from "./search.module.css";
import { useEffect, useState } from "react";
import { setSearchString } from "@/store/features/trackSlice";


export default function Search() {
  const dispatch = useAppDispatch();

  const [searchInput, setSearchInput] = useState('');

  const currentTheme = useAppSelector((state) => state.theme.theme);

  // состояние для отслеживания смонтированности компонента
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);

  const onSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    dispatch(setSearchString(e.target.value));
  };


  return (
    <div className={styles.centerblock__search}>
      <svg className={styles.search__svg}>
        <use xlinkHref={!mounted || currentTheme === 'dark' ? "/img/icon/sprite.svg#icon-search" : "/img/icon/sprite.svg#icon-search-dark"}></use>
      </svg>
      <input
        className={styles.search__text}
        type="search"
        placeholder="Поиск"
        name="search"
        value={searchInput}
        onChange={onSearchInput}
      />
    </div>
  )
}