import { useState } from 'react';
import dayjs from 'dayjs';
import { toDate } from 'services/date';
import { Webhook } from 'types/Webhook';
import { Forward } from 'types/Forward';

import styles from './styles.module.css';

const isJSON = (json: string | undefined) => {
  try {
    JSON.parse(json ?? '');
    return true;
  } catch {
    return false;
  }
};

const formatJson = (body: string | null, format: boolean) =>
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
  headings: { key: string; value: string }[];
  message: Webhook | Forward;
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
                <td>
                  {dayjs(toDate(message.createdAt)).format('LLL')}
                </td>
              </tr>
              {headings.map((heading, i) => (
                <tr key={heading.key}>
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
              {Object.keys(message.query).length ? (
                Object.keys(message.query)
                  .sort((a, b) => a.localeCompare(b))
                  .map(key => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{message.query[key]}</td>
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
              {Object.keys(message.headers)
                .sort((a, b) => a.localeCompare(b))
                .map(key => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{message.headers[key]}</td>
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
