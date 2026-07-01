'use client';

import { useAppDispatch, useAppSelector } from "@/store/store";
import styles from "./search.module.css";
import { useEffect, useState } from "react";
import { setSearchString } from "@/store/features/trackSlice";


export default function Search() {
  const dispatch = useAppDispatch();

  const [searchInput, setSearchInput] = useState('');

  // const searchText = useAppSelector((state) => state.tracks.searchString);


  const onSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    dispatch(setSearchString(e.target.value));
  };


  return (
    <div className={styles.centerblock__search}>
      <svg className={styles.search__svg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
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