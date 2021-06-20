import styles from './styles.module.css';

const Error = ({ error }: { error: string }) => {
  return (
    <div className={styles.error}>
      <div
        className={`alert alert-danger text-center ${styles.alert}`}
      >
        {error}
      </div>
    </div>
  );
};

export default Error;
