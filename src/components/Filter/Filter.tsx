'use client'

import styles from './filter.module.css';
import FilterItem from '../FilterItem/FilterItem';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { getUniqueValuesByKey } from '@/utils/helpers';
import { useAppDispatch } from '@/store/store';
import { setFilterAuthors, setFilterGenres, setFilterYears } from '@/store/features/trackSlice';


type FilterProp = {
  playlist: TrackType[]
}


export default function Filter({ playlist }: FilterProp) {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>('');
  const filterRef = useRef<HTMLDivElement | null>(null);


  const onOpenDropdownList = (title: string) => {
    setIsOpen(title === isOpen ? "" : title); // закрыть список, если он уже открыт
    setActiveFilter(title);
  };

  const uniqAuthors = useMemo(() => {
    return getUniqueValuesByKey(playlist, 'author');
  }, [playlist]);

  const uniqGenres = useMemo(() => {
    return getUniqueValuesByKey(playlist, 'genre');
  }, [playlist]);

  const years = ['По умолчанию', 'Сначала новые', 'Сначала старые'];

  const onSelectAuthor = useCallback((author: string) => {
    dispatch(setFilterAuthors(author));
  }, [dispatch]);

  const onSelectYear = useCallback((year: string) => {
    dispatch(setFilterYears(year));
  }, [dispatch]);

  const onSelectGenre = useCallback((genre: string) => {
    dispatch(setFilterGenres(genre));
  }, [dispatch]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsOpen("");
      }
    };

    // добавить обработчик клика вне окна
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      // удалить обработчик клика вне окна при размонтировании компонента
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);


  return (
    <div className={styles.centerblock__filter} ref={filterRef}>
      <div className={styles.filter__title}>Искать по:</div>
      <FilterItem
        title="исполнителю"
        onClick={() => onOpenDropdownList("исполнителю")}
        isOpen={isOpen === "исполнителю"}
        activeFilter={activeFilter}
        playlist={playlist}
        filterName='author'
        list={uniqAuthors}
        onSelect={onSelectAuthor}
      />
      <FilterItem
        title="году выпуска"
        onClick={() => onOpenDropdownList("году выпуска")}
        isOpen={isOpen === "году выпуска"}
        activeFilter={activeFilter}
        playlist={playlist}
        filterName='year'
        list={years}
        onSelect={onSelectYear}
      />
      <FilterItem
        title="жанру"
        onClick={() => onOpenDropdownList("жанру")}
        isOpen={isOpen === "жанру"}
        activeFilter={activeFilter}
        playlist={playlist}
        filterName='genre'
        list={uniqGenres}
        onSelect={onSelectGenre}
      />
    </div>
  )
}
