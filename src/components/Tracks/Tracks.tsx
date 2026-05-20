import styles from './Tracks.module.css';
import Track from '../Track/Track';
import { TrackType } from '@/sharedTypes/sharedTypes';
import Loading from '../Loading/Loading';
// import { data } from '@/data';
// import {formatTime} from '@/utils/helpers'

type PlaylistTracksProp = {
  // name: string,
  // author: string,
  // album: string,
  // time: string
  // track: TrackType,
  playlist: TrackType[],
  isLoading: boolean,
  error: string
}
export default function Tracks({ playlist, isLoading, error }: PlaylistTracksProp) {
   // console.log("data в PlaylistTracks: ", playlist);
  // console.log("data в isLoading: ", isLoading);
  return (
    <div className={styles.content__playlist}>
      {error ?
        <div className={styles.errorContainer}>{error}</div>
        :
        <div className={styles.errorContainer}>{error}</div>
      }
      {isLoading ?
        <Loading />
        :
        playlist.map((track) =>
        <Track
          key={track._id}
            // name={track.name}
            // author={track.author}
            // album={track.album}
            // time={formatTime(track.duration_in_seconds)}
            track={track}
            playlist={playlist}
          />
           )}
    </div>
  )
}
