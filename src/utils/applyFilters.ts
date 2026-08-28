import { TrackType } from "@/sharedTypes/sharedTypes";
import { initialStateType } from "@/store/features/trackSlice";


export const applyFilters = (state: initialStateType): TrackType[] => {
  let filteredPlaylist = state.pagePlaylist;

  if (state.filters.authors.length) {
    filteredPlaylist = filteredPlaylist.filter((track) => {
      return state.filters.authors.includes(track.author);
    });
  };

  if (state.filters.genres.length) {
    filteredPlaylist = filteredPlaylist.filter((track) => {
      return state.filters.genres.some((el) => track.genre.includes(el));
    });
  };

  return filteredPlaylist;
}
