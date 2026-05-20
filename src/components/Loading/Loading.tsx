import styles from './loading.module.css';


export default function Loading() {
  return (
    <div className={styles.loading}>Данные загружаются. Пожалуйста, подождите.</div>
  );
}