import { useState } from 'react';
import {
  HttpMessage as HttpMessageType,
  KeyValue,
} from 'schema/types';
import moment from 'moment';

import styles from './styles.module.css';

const isJSON = (json: string | undefined) => {
  try {
    JSON.parse(json ?? '');
    return true;
  } catch {
    return false;
  }
};

const formatJson = (body: string | undefined, format: boolean) =>
  !format
    ? body
    : !body
    ? body
    : !isJSON(body)
    ? body
    : JSON.stringify(JSON.parse(body), null, 2);

const HttpMessage = ({
  type,
  headings,
  message,
}: {
  type: string;
  headings: KeyValue[];
  message: HttpMessageType;
}) => {
  const [formatBody, setFormatBody] = useState(true);
  return (
    <div>
      <div className={styles.summary}>
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
            id="format-body-checkbox"
            defaultChecked={formatBody}
            onChange={e => setFormatBody(e.target.checked)}
          />
          <label
            className="custom-control-label"
            htmlFor="format-body-checkbox"
          >
            Format
          </label>
        </div>
        <div className={styles.title}>Body</div>
        <pre className={styles.raw}>
          {formatJson(message.body, formatBody)}
        </pre>
      </div>
    </div>
  );
};

export default HttpMessage;
