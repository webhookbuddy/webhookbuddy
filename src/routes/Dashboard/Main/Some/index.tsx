import React from 'react';
import { useParams } from 'react-router-dom';
import Jumbotron from 'components/Jumbotron';
import Forwarder from './Forwarder';
import Tabs from './Tabs';
import Body from './Body';

const Some = () => {
  const { webhookIds } = useParams();
  const ids = webhookIds.split(',');
  return (
    <>
      {ids.length === 1 ? (
        <>
          <Forwarder />
          <Tabs />
          <Body />
        </>
      ) : (
        <>
          <Forwarder />
          <Jumbotron>
            <div className="text-center">
              Multiple webhooks selected. Forward them all using the{' '}
              <strong>
                <em>Play</em>
              </strong>{' '}
              option above.
            </div>
          </Jumbotron>
        </>
      )}
    </>
  );
};

export default Some;
