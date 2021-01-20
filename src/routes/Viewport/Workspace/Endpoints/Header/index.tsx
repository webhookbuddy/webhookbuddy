import { useHistory } from 'react-router-dom';

import styles from './styles.module.css';

const Header = () => {
  const history = useHistory();

  // history.length 2 seems to be the default for both HashRouter and BrowserRouter

  return (
    <div className={styles.header} onClick={() => history.goBack()}>
      <div
        className={`${styles.content} ${
          history.length < 3 ? 'invisible' : 'visible'
        }`}
      >
        <span className="pointer">
          <i className={`${styles.icon} fa fa-arrow-left fa-2x`}></i>
          <span className={styles.title}>Back</span>
        </span>
      </div>
    </div>
  );
};

export default Header;
