import React from 'react';
import { Link } from 'react-router-dom';
import { Endpoint as EndpointType } from 'schema/types';
import moment from 'moment';

const Endpoint = ({ endpoint }: { endpoint: EndpointType }) => {
  const handleCopyClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(endpoint.url);
  };

  return (
    <div className="list-group-item list-group-item-action list-group-item-secondary">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">
          <Link to={`/endpoints/${endpoint.id}`}>
            {endpoint.name}
          </Link>
        </h5>
        <small>Created {moment(endpoint.createdAt).fromNow()}</small>
      </div>
      <p className="mb-1">Send your webhooks to this URL:</p>
      <p className="mb-1">
        <mark>{endpoint.url}</mark>{' '}
        <a
          href=""
          className="fa fa-clipboard"
          onClick={handleCopyClick}
        ></a>
      </p>
    </div>
  );
};

export default Endpoint;
