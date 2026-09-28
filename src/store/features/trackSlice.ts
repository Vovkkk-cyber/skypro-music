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

      if (currentTrackIndex !== playlist.length - 1) {
        const nextTrackIndex = currentTrackIndex + 1;
        state.currentTrack = playlist[nextTrackIndex];
      }
    },
    setPrevTrack: (state) => {
      const playlist = state.isShuffle ? state.shuffledPlaylist : state.currentPlaylist;

      const currentTrackIndex = playlist.findIndex((track) => track._id === state.currentTrack?._id);

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
      localStorage.setItem("favoriteTracks", JSON.stringify(state.favoriteTracks));
    },
    removeLikedTracks: (state, action: PayloadAction<TrackType>) => {
      state.favoriteTracks = state.favoriteTracks.filter((track) => track._id !== action.payload._id);
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

      state.filtredTracks = applyFilters(state);
    },
    setFilterYears: (state, action: PayloadAction<string>) => {
      state.filters.years = action.payload;
      state.filtredTracks = applyFilters(state);
      state.filtredTracks = sortByReleaseDate(state.filtredTracks, state.filters.years);
    },
    setFilterGenres: (state, action: PayloadAction<string>) => {
      const genres = action.payload;

      if (state.filters.genres.includes(genres)) {
        state.filters.genres = state.filters.genres.filter((el) => el !== genres);
      } else {
        state.filters.genres = [...state.filters.genres, genres];
      };

      state.filtredTracks = applyFilters(state);
    },
    setPagePlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.pagePlaylist = action.payload;
    },
    setSearchString: (state, action: PayloadAction<string>) => {
      state.filters.searchString = action.payload;
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
