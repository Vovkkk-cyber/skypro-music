'use client';

import classNames from 'classnames';
import styles from './filterItem.module.css';
import { data } from '@/data';
import { useState } from 'react';


type titleItemProp = {
  title: string,
  onClick: () => void,
  isOpen: boolean,
  activeFilter: string
}

export default function FilterItem({ title, onClick, isOpen, activeFilter }: titleItemProp) {
  // console.log("title в компоненте FilterItem: ", title);
  // console.log("activeFilter в компоненте FilterItem: ", activeFilter);
  // console.log("isOpen в компоненте FilterItem: ", isOpen);

  const uniqueAuthors = [...new Set(data.map(track => track.author))];
  // console.log("uniqueAuthors", uniqueAuthors);

  const uniqueReleaseYears = [...new Set(data.map(track => new Date(track.release_date).getFullYear()))];
  // console.log("uniqueReleaseYears", uniqueReleaseYears);

  const uniqueGenres = [...new Set(data.flatMap(track => track.genre))];
  // console.log("uniqueGenres", uniqueGenres);

  // let count: number = 0;
  // if (title === "исполнителю") {
  //   count = uniqueAuthors.length;
  // } else if (title === "году выпуска") {
  //   count = uniqueReleaseYears.length;
  // } else if (title === "жанру") {
  //   count = uniqueGenres.length;
  // }

  return (
    <>
      <div className={
        // activeFilter && title && isOpen
        isOpen
          ?
          classNames(styles.filter__button, {
            [styles.active]: activeFilter === title,
          })
          :
          styles.filter__button
      }
        onClick={() => onClick()}
      >{title}
        {isOpen &&
          <div className={styles.filter__wrapper}>
            <ul className={styles.filter__list}>

              {title === "исполнителю" &&
                uniqueAuthors.map((author) => (
                  <li className={styles.filter__item} key={author}>
                    {author}
                  </li>
                ))}

              {title === "году выпуска" &&
                uniqueReleaseYears.map((year) => (
                  <li className={styles.filter__item} key={year}>
                    {year}
                  </li>
                ))}

              {title === "жанру" &&
                uniqueGenres.map((genre) => (
                  <li className={styles.filter__item} key={genre}>
                    {genre}
                  </li>
                ))}

            </ul>
          </div>
        }
        {/* {isOpen ?
          <div className={styles.filter__count}>
            {count}
          </div>
          :
          null
        } */}
      </div>
    </>
  )
}