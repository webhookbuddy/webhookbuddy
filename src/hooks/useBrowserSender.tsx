import { useMe } from 'context/user-context';
import { useEffect } from 'react';
import { Webhook } from 'schema/types';
import { extractContentType, mapHeaders } from 'utils/http-fragment';
import {
  AddForward_addForward_webhook,
  AddForward_addForward_webhook_forwards,
} from './types/AddForward';
const axios = require('axios').default;

const useBrowserSender = ({
  onForwarded,
}: {
  onForwarded: (
    webhook: AddForward_addForward_webhook,
    forward: AddForward_addForward_webhook_forwards,
  ) => void;
}) => {
  const me = useMe();

  const send = (url: string, webhook: Webhook) => {
    console.log(url);
    console.log(webhook);

    let ignoreHeaders = [
      'host',
      'content-length',
      'connection',
      'user-agent',
    ];
    axios({
      method: webhook.method,
      url: url,
      headers: webhook.headers
        .filter(
          header => !ignoreHeaders.includes(header.key.toLowerCase()),
        )
        .reduce((acc, cur) => {
          acc[cur.key] = cur.value;
          return acc;
        }, {} as any),
      data: webhook.body,
    }).then(
      (response: any) => {
        console.log(response);
        onForwarded(
          webhook as AddForward_addForward_webhook,
          {
            __typename: 'Forward',
            id: '_' + Math.round(Math.random() * 1000000),
            url: url,
            statusCode: response.status ? 502 : response.status,
            success: response.status >= 200 && response.status < 300,
            createdAt: new Date(),
            method: webhook.method,
            headers: mapHeaders(response.headers),
            query: webhook.query,
            contentType: extractContentType(
              mapHeaders(response.headers),
            ),
            body: response.data ?? '',
            user: me,
          } as AddForward_addForward_webhook_forwards,
        );
      },
      (error: any) => {
        console.log(error);
      },
    );
  };

  return { send };
};

export default useBrowserSender;
