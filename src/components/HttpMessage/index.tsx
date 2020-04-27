import React from 'react';

import './style.css';

const HttpMessage = ({ type }: { type: string }) => {
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
                <td>From</td>
                <td>Stripe (123.123.123.123)</td>
              </tr>
              <tr>
                <td>To</td>
                <td>http://www.example.com</td>
              </tr>
              <tr>
                <td>Date</td>
                <td>Apr 13, 20:33</td>
              </tr>
              <tr>
                <td>Size</td>
                <td>456 bytes</td>
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
              <tr>
                <td>
                  <em>(empty)</em>
                </td>
                <td></td>
              </tr>
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
              <tr>
                <td>content-length</td>
                <td>456</td>
              </tr>
              <tr>
                <td>host</td>
                <td>foobar.com</td>
              </tr>
              <tr>
                <td>stripe-signature</td>
                <td>blah blah blah</td>
              </tr>
              <tr>
                <td>accept</td>
                <td>*</td>
              </tr>
              <tr>
                <td>user-agent</td>
                <td>Stripe/1.0</td>
              </tr>
              <tr>
                <td>cache-control</td>
                <td>no-cache</td>
              </tr>
              <tr>
                <td>content-type</td>
                <td>application/json</td>
              </tr>
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
        <pre className="http__content__raw">
          test
          <br />
          test
          <br />
          test
          <br />
          test
          <br />
          test
          <br />
          test
          <br />
          test
          <br />
          test
          <br />
          test
          <br />
          test
          <br />
          test
          <br />
          test
          <br />
          test
          <br />
          test
          <br />
          test
          <br />
          test
          <br />
          test
          <br />
          test
          <br />
          test
          <br />
          test
          <br />
          test
          <br />
          test
          <br />
          test
          <br />
          test
          <br />
          test
          <br />
          test
          <br />
          test
          <br />
          test
          <br />
          test
          <br />
          test
          <br />
          test
          <br /> test
          <br /> test
          <br /> test
          <br /> test
          <br /> test
        </pre>
      </div>
    </div>
  );
};

export default HttpMessage;
