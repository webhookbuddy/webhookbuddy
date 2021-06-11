import { nanoid } from 'nanoid';
import { extractContentType } from 'utils/http-fragment';
import { User } from 'types/User';
import { Webhook } from 'types/Webhook';
import { Forward } from 'types/Forward';
import { useCallback } from 'react';

const axios = require('axios').default;

const useBrowserSender = ({
  me,
  onForwarded,
}: {
  me: User;
  onForwarded: (webhook: Webhook, forward: Forward) => void;
}) => {
  const send = useCallback(
    (url: string, webhook: Webhook) => {
      let ignoreHeaders = [
        'host',
        'accept-encoding',
        'content-length',
        'connection',
        'user-agent',
      ];
      axios({
        method: webhook.method,
        url: url,
        headers: Object.keys(webhook.headers)
          .filter(key => !ignoreHeaders.includes(key.toLowerCase()))
          .reduce((headers, key) => {
            headers[key] = webhook.headers[key];
            return headers;
          }, {} as any),
        data: webhook.body,
        transformResponse: (data: any) => {
          return data;
        },
      }).then(
        (response: any) => {
          onForwarded(webhook, {
            id: nanoid(),
            userId: me.id,
            user: {
              id: me.id,
              firstName: me.firstName,
              lastName: me.lastName,
            },
            createdAt: new Date(),
            url: url,
            method: webhook.method,
            statusCode: response.status ?? 502,
            success: response.status >= 200 && response.status < 300,
            headers: response.headers,
            query: webhook.query,
            contentType: extractContentType(response.headers),
            body: response.data,
          });
        },
        (error: any) => {
          console.log(error);
        },
      );
    },
    [me, onForwarded],
  );

  return { send };
};

export default useBrowserSender;
