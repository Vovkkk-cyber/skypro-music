'use client'

import styles from './filter.module.css';
import FilterItem from '../FilterItem/FilterItem';
import { useState } from 'react';
import { TrackType } from '@/sharedTypes/sharedTypes';


type FilterProp = {
  // name: string,
  // author: string,
  // album: string,
  // time: string
  // track: TrackType,
  playlist: TrackType[]
}


export default function Filter({ playlist }: FilterProp) {
  const [isOpen, setIsOpen] = useState("");
  const [activeFilter, setActiveFilter] = useState("");

  const onOpenDropdownList = (title: string) => {
    setIsOpen(title === isOpen ? "" : title); // закрыть список, если он уже открыт
    setActiveFilter(title);
    // console.log("Открыть список: ", title);
  };

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>
      <FilterItem
        title="исполнителю"
        onClick={() => onOpenDropdownList("исполнителю")}
        isOpen={isOpen === "исполнителю"}
        activeFilter={activeFilter}
        playlist={playlist}
      />
      <FilterItem
        title="году выпуска"
        onClick={() => onOpenDropdownList("году выпуска")}
        isOpen={isOpen === "году выпуска"}
        activeFilter={activeFilter}
        playlist={playlist}
      />
      <FilterItem
        title="жанру"
        onClick={() => onOpenDropdownList("жанру")}
        isOpen={isOpen === "жанру"}
        activeFilter={activeFilter}
        playlist={playlist}
      />
    </div>
  )
}