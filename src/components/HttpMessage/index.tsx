import React from 'react';
import {
  HttpMessage as HttpMessageType,
  KeyValue,
} from 'schema/types';
import moment from 'moment';

import './style.css';

const HttpMessage = ({
  type,
  headings,
  message,
}: {
  type: string;
  headings: KeyValue[];
  message: HttpMessageType;
}) => {
  return (
    <div className="http">
      <div className="http__summary">
        <div>
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col" colSpan={2}>
                  {type}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Date</td>
                <td>{moment(message.createdAt).format('LLL')}</td>
              </tr>
              {headings.map((heading, i) => (
                <tr key={`heading-${i}`}>
                  <td>{heading.key}</td>
                  <td>{heading.value}</td>
                </tr>
              ))}
              <tr>
                <td>Size</td>
                <td>
                  {message.body?.length.toLocaleString('en')} bytes
                </td>
              </tr>
            </tbody>
          </table>
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col" colSpan={2}>
                  Query Strings
                </th>
              </tr>
            </thead>
            <tbody>
              {message.query.length ? (
                message.query.map((q, i) => (
                  <tr key={`query-${i}`}>
                    <td>{q.key}</td>
                    <td>{q.value}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>
                    <em>(empty)</em>
                  </td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div>
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col" colSpan={2}>
                  Headers
                </th>
              </tr>
            </thead>
            <tbody>
              {message.headers.map((header, i) => (
                <tr key={`header-${i}`}>
                  <td>{header.key}</td>
                  <td>{header.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="http__content">
        <div className="custom-control custom-switch float-right">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customSwitch1"
            defaultChecked={true}
          />
          <label
            className="custom-control-label"
            htmlFor="customSwitch1"
          >
            Format
          </label>
        </div>
        <div className="http__content__title">Body</div>
        <pre className="http__content__raw">{message.body}</pre>
      </div>
    </div>
  );
};

export default HttpMessage;
