import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import Delete from './Delete';
import { Endpoint as EndpointType } from 'types/Endpoint';
import { functions } from 'config/firebase';

import styles from './styles.module.css';
import Copy from './Copy';

const emulator = process.env.REACT_APP_EMULATOR;
const endpointUrl = process.env.REACT_APP_ENDPOINT_URL;

const Endpoint = ({ endpoint }: { endpoint: EndpointType }) => {
  const urlPrefix = emulator
    ? `http://localhost:5001/${functions.app.options.projectId}/${functions.region}/point`
    : endpointUrl;

  const url = `${urlPrefix}/${endpoint.referenceId}`;

  return (
    <div className="list-group-item list-group-item-action list-group-item-secondary">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">
          <Link to={`/dashboard/${endpoint.id}`}>
            {endpoint.name}
          </Link>
        </h5>
        <small>
          Created {moment(endpoint.createdAt.toDate()).fromNow()}
        </small>
      </div>
      <div className="mb-1">Send your webhooks to this URL:</div>
      <div className={`mb-1 ${styles.url}`}>
        <div>
          <input
            type="text"
            value={url}
            onFocus={e => e.target.select()}
            readOnly
            className={styles.input}
          />
        </div>
        <Copy url={url} iconStyle={styles.icon} />
        <Delete endpoint={endpoint} iconStyle={styles.icon} />
      </div>
    </div>
  );
};

export default Endpoint;
