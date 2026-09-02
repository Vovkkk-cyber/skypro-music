export type TrackType = {
  _id: number,
  name: string,
  author: string,
  release_date: string,
  genre: string[],
  duration_in_seconds: number,
  album: string,
  logo: string | null,
  track_file: string,
  staredUser: string[],
}

export type CategoryType = {
  _id: number,
  items: [],
  name: string,
}

export type FavoriteType = []
