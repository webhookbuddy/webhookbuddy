import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useApolloClient } from '@apollo/react-hooks';
import { Endpoint as EndpointType } from 'schema/types';

import './style.css';
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
    <div className="dash-header__endpoint">
      <Link to="/">
        <i className="dash-header__endpoint__icon fa fa-exchange fa-2x"></i>
        <span className="dash-header__endpoint__title">
          {endpoint?.name}
        </span>
      </Link>
    </div>
  );
};

export default Endpoint;
