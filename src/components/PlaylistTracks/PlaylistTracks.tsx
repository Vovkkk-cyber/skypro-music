import styles from './playlistTracks.module.css';
import CenterblockTrack from '../PlaylistTrack/PlaylistTrack';


export default function PlaylistTracks() {
  return (
    <div className={styles.content__playlist}>
      <CenterblockTrack/>
      <CenterblockTrack/>
      <CenterblockTrack/>
      <CenterblockTrack/>
      <CenterblockTrack/>
    </div>
  )
}
