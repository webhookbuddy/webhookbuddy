import { Link, useParams } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { Endpoint as EndpointType } from 'schema/types';

import styles from './styles.module.css';
import { ENDPOINT_FRAGMENT } from 'schema/fragments';

const Endpoint = () => {
  const {
    endpointId,
  }: {
    endpointId: string;
  } = useParams();

  const client = useApolloClient();
  const endpoint = client.readFragment<EndpointType>(
    {
      id: `Endpoint:${endpointId}`,
      fragment: ENDPOINT_FRAGMENT,
      fragmentName: 'endpoint',
    },
    true,
  );

  return (
    <Link to="/">
      <i className={`fa fa-exchange fa-2x ${styles.icon}`}></i>
      <span className={styles.title}>{endpoint?.name}</span>
    </Link>
  );
};

export default Endpoint;
