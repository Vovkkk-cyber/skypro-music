import styles from './playlistTracks.module.css';
import PlaylistTrack from '../PlaylistTrack/PlaylistTrack';
import { data } from '@/data';
import {formatTime} from '@/utils/helpers'


export default function PlaylistTracks() {
  return (
    <div className={styles.content__playlist}>
      {data.map((track) =>
        <PlaylistTrack
          key={track._id}
          name={track.name}
          author={track.author}
          album={track.album}
          time={formatTime(track.duration_in_seconds)}
        />
      )}
    </div>
  )
}
