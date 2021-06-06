import { useHistory } from 'react-router-dom';

import styles from './styles.module.css';

const Header = () => {
  const history = useHistory();

  // history.length 2 seems to be the default for both HashRouter and BrowserRouter

  return (
    <div className={styles.header}>
      <div className={`${styles.content}`}>
        <span
          className={`pointer ${
            history.length < 3 ? 'invisible' : 'visible'
          }`}
          onClick={() => history.goBack()}
        >
          <i className={`${styles.icon} fa fa-arrow-left fa-2x`}></i>
          <span className={styles.title}>Back</span>
        </span>

        <button
          type="submit"
          className="btn btn-primary btn-lg"
          onClick={() => {
            localStorage.removeItem('x-token');
            history.go(0);
          }}
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Header;
