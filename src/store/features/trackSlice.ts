import { TrackType } from '@/sharedTypes/sharedTypes';
import { applyFilters } from '@/utils/applyFilters';
import { searchTracks, sortByReleaseDate } from '@/utils/helpers';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type initialStateType = {
  currentTrack: null | TrackType,
  isPlay: boolean,
  currentPlaylist: TrackType[],
  isShuffle: boolean,
  shuffledPlaylist: TrackType[],
  allTracks: TrackType[],
  favoriteTracks: TrackType[],
  fetchError: null | string,
  fetchIsLoading: boolean,
  filters: {
    authors: string[],
    years: string,
    genres: string[],
    searchString: string,
  },
  pagePlaylist: TrackType[],
  filtredTracks: TrackType[],
}

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  currentPlaylist: [],
  isShuffle: false,
  shuffledPlaylist: [],
  allTracks: [],
  favoriteTracks: [],
  fetchError: null,
  fetchIsLoading: true,
  filters: {
    authors: [],
    years: 'По умолчанию',
    genres: [],
    searchString: '',
  },
  pagePlaylist: [],
  filtredTracks: [],
}


const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
    },
    setCurrentPlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.currentPlaylist = action.payload;
      // spread-оператор - чтобы не мутировал исходный плейлист
      state.shuffledPlaylist = [...state.currentPlaylist].sort(() => Math.random() - 0.5);
    },
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    setNextTrack: (state) => {
      const playlist = state.isShuffle ? state.shuffledPlaylist : state.currentPlaylist;

      const currentTrackIndex = playlist.findIndex((track) => track._id === state.currentTrack?._id);

      // if (currentTrackIndex === playlist.length - 1) {
      //   state.currentTrack = playlist[0];
      // } else {
      //   const nextTrackIndex = currentTrackIndex + 1;
      //   state.currentTrack = playlist[nextTrackIndex];
      // }

      if (currentTrackIndex !== playlist.length - 1) {
        const nextTrackIndex = currentTrackIndex + 1;
        state.currentTrack = playlist[nextTrackIndex];
      }
    },
    setPrevTrack: (state) => {
      const playlist = state.isShuffle ? state.shuffledPlaylist : state.currentPlaylist;

      const currentTrackIndex = playlist.findIndex((track) => track._id === state.currentTrack?._id);

      // if (currentTrackIndex === 0) {
      //   state.currentTrack = playlist[playlist.length - 1];
      // } else {
      //   const prevTrackIndex = currentTrackIndex - 1;
      //   state.currentTrack = playlist[prevTrackIndex];
      // }

      if (currentTrackIndex !== 0) {
        const prevTrackIndex = currentTrackIndex - 1;
        state.currentTrack = playlist[prevTrackIndex];
      }
    },
    toggleIsShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
    setAllTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.allTracks = action.payload;
    },
    setFavoriteTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.favoriteTracks = action.payload;
    },
    addLikedTracks: (state, action: PayloadAction<TrackType>) => {
      state.favoriteTracks = [...state.favoriteTracks, action.payload];
      // console.log("Добавили трек в избранное");
      localStorage.setItem("favoriteTracks", JSON.stringify(state.favoriteTracks));
    },
    removeLikedTracks: (state, action: PayloadAction<TrackType>) => {
      // console.log("Удаляем из избранного трек:", action.payload._id);
      state.favoriteTracks = state.favoriteTracks.filter((track) => track._id !== action.payload._id);
      // console.log("Удалили трек из избранного");
      localStorage.setItem("favoriteTracks", JSON.stringify(state.favoriteTracks));
    },
    setFetchError: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
    },
    setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsLoading = action.payload;
    },
    setFilterAuthors: (state, action: PayloadAction<string>) => {
      const author = action.payload;

      if (state.filters.authors.includes(author)) {
        state.filters.authors = state.filters.authors.filter((el) => el !== author);
      } else {
        state.filters.authors = [...state.filters.authors, author];
      };


      // let filteredPlaylist = state.pagePlaylist;

      // if (state.filters.authors.length) {
      //   filteredPlaylist = filteredPlaylist.filter((track) => {
      //     // return track.author === author;
      //     // чтобы выбор каждого следующего автора в выпадашке не затирал предыдущий выбор нужно сравнивать не с автором, а с массивом авторов, который хранится в списке
      //     return state.filters.authors.includes(track.author);
      //   })
      // };

      // if (state.filters.genres.length) {
      //   filteredPlaylist = filteredPlaylist.filter((track) => {
      //     return state.filters.genres.some((el) => track.genre.includes(el));
      //   })
      // };

      // state.filtredTracks = filteredPlaylist;a

      state.filtredTracks = applyFilters(state);
    },
    setFilterYears: (state, action: PayloadAction<string>) => {
      // const year = action.payload;
      // if(state.filters.years.includes(year)) {
      //   state.filters.years = state.filters.years.filter((el) => el !== year);
      // } else {
      //   state.filters.years = [...state.filters.years, year];
      // }
      state.filters.years = action.payload;

      state.filtredTracks = applyFilters(state);
      // console.log("Отфильтрованный массив: ", state.filtredTracks);

      // if (state.filters.years === 'Сначала новые') {
      //   // state.filtredTracks = [...state.filtredTracks].sort((a, b) => {
      //   //   return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
      //   // })
      //   state.filtredTracks = sortByReleaseDateAsc(state.filtredTracks);
      // } else if (state.filters.years === 'Сначала старые') {
      //   // state.filtredTracks = [...state.filtredTracks].sort((a, b) => {
      //   //   return new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
      //   // })
      //   state.filtredTracks = sortByReleaseDateDesc(state.filtredTracks);
      // } else if (state.filters.years === 'По умолчанию') {
      //   // state.filtredTracks = state.filtredTracks;
      //   return
      // }

      state.filtredTracks = sortByReleaseDate(state.filtredTracks, state.filters.years);

      // console.log("Отсортированный массив: ", state.filtredTracks);
    },
    setFilterGenres: (state, action: PayloadAction<string>) => {
      const genres = action.payload;

      if (state.filters.genres.includes(genres)) {
        state.filters.genres = state.filters.genres.filter((el) => el !== genres);
      } else {
        state.filters.genres = [...state.filters.genres, genres];
      };


      // let filteredPlaylist = state.pagePlaylist;

      // if (state.filters.authors.length) {
      //   filteredPlaylist = filteredPlaylist.filter((track) => {
      //     return state.filters.authors.includes(track.author);
      //   })
      // };

      // if (state.filters.genres.length) {
      //   filteredPlaylist = filteredPlaylist.filter((track) => {
      //     return state.filters.genres.some((el) => track.genre.includes(el));
      //   })
      // };

      // state.filtredTracks = filteredPlaylist;

      state.filtredTracks = applyFilters(state);
    },
    setPagePlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.pagePlaylist = action.payload;
    },
    setSearchString: (state, action: PayloadAction<string>) => {
      state.filters.searchString = action.payload;

      // state.filtredTracks = state.allTracks.filter((track) => track.name.startsWith(state.searchString));

      // state.filtredTracks = state.allTracks.filter((track) => track.name.toLowerCase().includes(state.filters.searchString.toLowerCase()));

      const filtredTracks = applyFilters(state);
      state.filtredTracks = searchTracks(state.filters.searchString, filtredTracks);
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  }
})


export const { setCurrentTrack, setCurrentPlaylist, setIsPlay, setNextTrack, setPrevTrack, toggleIsShuffle, setAllTracks, setFavoriteTracks, addLikedTracks, removeLikedTracks, setFetchError, setFetchIsLoading, setFilterAuthors, setFilterYears, setFilterGenres, setPagePlaylist, setSearchString, resetFilters } = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
