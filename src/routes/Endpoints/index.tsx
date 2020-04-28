import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

import './style.css';

const Endpoints = () => {
  return (
    <div className="viewport viewport--endpoints">
      <Header />
      <div className="endpoints">
        <div className="endpoints__container">
          <div className="endpoints__container__pad">
            <div className="container">
              <h2>Endpoints</h2>
              <div className="list-group">
                <Link
                  to={`/endpoints/1`}
                  className="list-group-item list-group-item-action list-group-item-secondary active"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">ACME w/ Stripe</h5>
                    <small>Created 3 days ago</small>
                  </div>
                  <p className="mb-1">
                    Send your webhooks to this URL:
                  </p>
                  <p className="mb-1">
                    http://proxy.example.com/some-random-value | Copy
                    to clipboard
                  </p>
                </Link>
                <Link
                  to={`/endpoints/1`}
                  className="list-group-item list-group-item-action list-group-item-secondary"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">ACME w/ Stripe</h5>
                    <small>Created 3 days ago</small>
                  </div>
                  <p className="mb-1">
                    Send your webhooks to this URL:
                  </p>
                  <p className="mb-1">
                    http://proxy.example.com/some-random-value | Copy
                    to clipboard
                  </p>
                </Link>
                <Link
                  to={`/endpoints/1`}
                  className="list-group-item list-group-item-action list-group-item-secondary"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">ACME w/ Stripe</h5>
                    <small>Created 3 days ago</small>
                  </div>
                  <p className="mb-1">
                    Send your webhooks to this URL:
                  </p>
                  <p className="mb-1">
                    http://proxy.example.com/some-random-value | Copy
                    to clipboard
                  </p>
                </Link>
                <Link
                  to={`/endpoints/1`}
                  className="list-group-item list-group-item-action list-group-item-secondary"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">ACME w/ Stripe</h5>
                    <small>Created 3 days ago</small>
                  </div>
                  <p className="mb-1">
                    Send your webhooks to this URL:
                  </p>
                  <p className="mb-1">
                    http://proxy.example.com/some-random-value | Copy
                    to clipboard
                  </p>
                </Link>
                <Link
                  to={`/endpoints/1`}
                  className="list-group-item list-group-item-action list-group-item-secondary"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">ACME w/ Stripe</h5>
                    <small>Created 3 days ago</small>
                  </div>
                  <p className="mb-1">
                    Send your webhooks to this URL:
                  </p>
                  <p className="mb-1">
                    http://proxy.example.com/some-random-value | Copy
                    to clipboard
                  </p>
                </Link>
                <Link
                  to={`/endpoints/1`}
                  className="list-group-item list-group-item-action list-group-item-secondary"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">ACME w/ Stripe</h5>
                    <small>Created 3 days ago</small>
                  </div>
                  <p className="mb-1">
                    Send your webhooks to this URL:
                  </p>
                  <p className="mb-1">
                    http://proxy.example.com/some-random-value | Copy
                    to clipboard
                  </p>
                </Link>
                <Link
                  to={`/endpoints/1`}
                  className="list-group-item list-group-item-action list-group-item-secondary"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">ACME w/ Stripe</h5>
                    <small>Created 3 days ago</small>
                  </div>
                  <p className="mb-1">
                    Send your webhooks to this URL:
                  </p>
                  <p className="mb-1">
                    http://proxy.example.com/some-random-value | Copy
                    to clipboard
                  </p>
                </Link>
                <Link
                  to={`/endpoints/1`}
                  className="list-group-item list-group-item-action list-group-item-secondary"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">ACME w/ Stripe</h5>
                    <small>Created 3 days ago</small>
                  </div>
                  <p className="mb-1">
                    Send your webhooks to this URL:
                  </p>
                  <p className="mb-1">
                    http://proxy.example.com/some-random-value | Copy
                    to clipboard
                  </p>
                </Link>
                <Link
                  to={`/endpoints/1`}
                  className="list-group-item list-group-item-action list-group-item-secondary"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">ACME w/ Stripe</h5>
                    <small>Created 3 days ago</small>
                  </div>
                  <p className="mb-1">
                    Send your webhooks to this URL:
                  </p>
                  <p className="mb-1">
                    http://proxy.example.com/some-random-value | Copy
                    to clipboard
                  </p>
                </Link>
                <Link
                  to={`/endpoints/1`}
                  className="list-group-item list-group-item-action list-group-item-secondary"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">ACME w/ Stripe</h5>
                    <small>Created 3 days ago</small>
                  </div>
                  <p className="mb-1">
                    Send your webhooks to this URL:
                  </p>
                  <p className="mb-1">
                    http://proxy.example.com/some-random-value | Copy
                    to clipboard
                  </p>
                </Link>
              </div>
              <button
                type="button"
                className="btn btn-primary btn-lg btn-block mt-4"
              >
                Create New Endpoint
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Endpoints;
