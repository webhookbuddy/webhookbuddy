import { Link, useHistory } from 'react-router-dom';

import styles from './styles.module.css';

const Header = ({
  title,
  backTo,
}: {
  title?: string;
  backTo?: string;
}) => {
  const history = useHistory();

  return (
    <div className={styles.header}>
      <div>
        {backTo && (
          <Link to={backTo}>
            <i
              className={`${styles.icon} fa fa-arrow-left fa-2x`}
            ></i>
          </Link>
        )}
        {title && <span className={styles.title}>{title}</span>}
      </div>
      <div className="text-right">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => history.push('/logout')}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Header;
