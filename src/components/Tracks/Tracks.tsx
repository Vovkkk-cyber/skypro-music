import styles from './Tracks.module.css';
import Track from '../Track/Track';
import { data } from '@/data';
// import {formatTime} from '@/utils/helpers'


export default function Tracks() {
  return (
    <div className={styles.content__playlist}>
      {data.map((track) =>
        <Track
          key={track._id}
          // name={track.name}
          // author={track.author}
          // album={track.album}
          // time={formatTime(track.duration_in_seconds)}
          track={track}
        />
      )}
    </div>
  )
}
