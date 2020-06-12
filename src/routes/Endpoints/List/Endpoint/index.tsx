import React from 'react';
import { Link } from 'react-router-dom';
import { Endpoint } from 'schema/types';
import moment from 'moment';

import './style.css';

const List = ({ endpoint }: { endpoint: Endpoint }) => {
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
      <div className="mb-1">Send your webhooks to this URL:</div>
      <div className="mb-1 endpoint-url">
        <div>
          <input
            type="text"
            value={endpoint.url}
            onFocus={e => e.target.select()}
            readOnly
            className="endpoint-url__input"
          />
        </div>
        <i
          className="fa fa-clipboard pointer endpoint-url__icon"
          onClick={handleCopyClick}
        ></i>
      </div>
    </div>
  );
};

export default List;
