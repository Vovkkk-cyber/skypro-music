'use client';

import classNames from 'classnames';
import styles from './filterItem.module.css';
import { useState } from 'react';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppSelector } from '@/store/store';


type titleItemProp = {
  title: string,
  onClick: () => void,
  isOpen: boolean,
  activeFilter: string,
  playlist: TrackType[],
  filterName: string,
  list: string[],
  onSelect: (value: string) => void,
}

export default function FilterItem({ title, onClick, isOpen, activeFilter, playlist, filterName, list, onSelect }: titleItemProp) {

  const selectedAuthor = useAppSelector((state) => state.tracks.filters.authors)
  const selectedYear = useAppSelector((state) => state.tracks.filters.years)
  const selectedGenre = useAppSelector((state) => state.tracks.filters.genres)

  const uniqueAuthors = [...new Set(playlist.map(track => track.author))];
  // console.log("uniqueAuthors", uniqueAuthors);

  const uniqueReleaseYears = [...new Set(playlist.map(track => new Date(track.release_date).getFullYear()))];
  // console.log("uniqueReleaseYears", uniqueReleaseYears);

  const uniqueGenres = [...new Set(playlist.flatMap(track => track.genre))];
  // console.log("uniqueGenres", uniqueGenres);


  return (
    <>
      <div className={
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
                  <li
                    className={
                      classNames(
                        styles.filter__item,
                        { [styles.filter__item_selected]: selectedAuthor.includes(author) }
                      )
                    }
                    key={author}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(author)
                    }}
                  >
                    {author}
                  </li>
                ))}

              {title === "году выпуска" &&
                // uniqueReleaseYears.map((year) => (
                list.map((year) => (
                  <li
                    className={classNames(
                      styles.filter__item,
                      { [styles.filter__item_selected]: selectedYear.includes(year) }
                    )}
                    key={year}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(String(year))
                    }}
                  >
                    {year}
                  </li>
                ))}

              {title === "жанру" &&
                uniqueGenres.map((genre) => (
                  <li
                    className={classNames(
                      styles.filter__item,
                      { [styles.filter__item_selected]: selectedGenre.includes(genre) }
                    )}
                    key={genre}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(genre)
                    }}
                  >
                    {genre}
                  </li>
                ))}

            </ul>
          </div>
        }
      </div>
    </>
  )
}