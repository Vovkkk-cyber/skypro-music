import styles from './centerblock.module.css';
import Search from '../Search/Search';
import Filter from '../Filter/Filter';
import PlaylistTitle from '../PlaylistTitle/PlaylistTitle';
import PlaylistTracks from '../PlaylistTracks/PlaylistTracks';


export default function Centerblock() {
  return (
    <div className={styles.centerblock}>
      <Search/>
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <Filter />
      <div className={styles.centerblock__content}>
        <PlaylistTitle />
        <PlaylistTracks />
      </div>
    </div>
  )
}