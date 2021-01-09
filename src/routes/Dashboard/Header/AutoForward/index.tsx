import styles from './styles.module.css';

const AutoForward = () => {
  return (
    <div className={styles.autoForward}>
      <div className={`${styles.icon} ${styles.iconOn}`}>
        <i className={`fa fa-circle fa-2x ${styles.button}`}></i>
      </div>
      <div>
        <select className="custom-select" disabled>
          <option>http://foobar</option>
        </select>
      </div>
    </div>
  );
};

export default AutoForward;
