import styles from './Tracks.module.css';
import Track from '../Track/Track';
import { TrackType } from '@/sharedTypes/sharedTypes';
import Loading from '../Loading/Loading';
import { useAppSelector } from '@/store/store';

type PlaylistTracksProp = {
  // name: string,
  // author: string,
  // album: string,
  // time: string
  // track: TrackType,
  playlist: TrackType[],
  isLoading: boolean,
  error: string,
  isAuthRequired: boolean
}
export default function Tracks({ playlist, isLoading, error, isAuthRequired }: PlaylistTracksProp) {
   // console.log("data в PlaylistTracks: ", playlist);
  // console.log("data в isLoading: ", isLoading);
  const isAccessToken = useAppSelector((state) => state.auth.access);
  return (
    <div className={styles.content__playlist}>
      {
        !isAccessToken && isAuthRequired ?
          <div className={styles.messageContainer}>Авторизуйтесь чтобы посмотреть избранные треки</div>
          :
          error ?
            <div className={styles.errorContainer}>{error}</div>
            :
            isLoading ?
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
