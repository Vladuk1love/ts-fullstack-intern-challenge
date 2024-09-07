import styles from './Loading.module.css'

function Loading() {
  return (
    <div className={styles.loading_background}>
      <div className={styles.loading_container}></div>
    </div>
  );
}

export default Loading;