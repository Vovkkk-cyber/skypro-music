import styles from './Title.module.css';
import classNames from 'classnames';


export default function CenterblockTitle() {
  return (
    <div className={styles.content__title}>
      <div className={classNames(styles.Title__col, styles.col01)}>Трек</div>
      <div className={classNames(styles.Title__col, styles.col02)}>Исполнитель</div>
      <div className={classNames(styles.Title__col, styles.col03)}>Альбом</div>
      <div className={classNames(styles.Title__col, styles.col04)}>
        <svg className={styles.Title__svg}>
          <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
        </svg>
      </div>
    </div>
  )
}
