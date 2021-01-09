import styles from './styles.module.css';

const Loading = () => {
  return (
    <div className={styles.loading}>
      <i
        className={`fa fa-circle-o-notch fa-spin fa-fw ${styles.icon}`}
      ></i>
    </div>
  );
};

export default Loading;
