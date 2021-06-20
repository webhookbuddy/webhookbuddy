import { useCallback } from 'react';
import { nanoid } from 'nanoid';
import {
  extractContentType,
  mapRawHeaders,
} from 'utils/http-fragment';
import { User } from 'types/User';
import { Webhook } from 'types/Webhook';
import { Forward } from 'types/Forward';

const { ipcRenderer } = window.require('electron');

const useNodeSender = ({
  me,
  onForwarded,
}: {
  me: User;
  onForwarded: (webhook: Webhook, forward: Forward) => void;
}) => {
  const send = useCallback(
    (url: string, webhook: Webhook) => {
      ipcRenderer
        .invoke('forward-webhook', {
          method: webhook.method,
          url,
          headers: Object.keys(webhook.headers)
            .filter(key => key.toLowerCase() !== 'host')
            .reduce((headers, key) => {
              headers[key] = webhook.headers[key];
              return headers;
            }, {} as any),
          body: webhook.body,
          metadata: {
            url,
            webhook,
          },
        })
        .then(
          ({
            metadata,
            rawHeaders,
            statusCode,
            data,
            error,
          }: {
            metadata: {
              url: string;
              webhook: Webhook;
            };
            statusCode: number;
            rawHeaders: string[];
            data: string;
            error: any;
          }) => {
            onForwarded(metadata.webhook, {
              id: nanoid(),
              userId: me.id,
              user: {
                id: me.id,
                firstName: me.firstName,
                lastName: me.lastName,
              },
              createdAt: new Date(),
              url: metadata.url,
              method: metadata.webhook.method,
              statusCode: error ? 502 : statusCode,
              success: statusCode >= 200 && statusCode < 300,
              contentType: extractContentType(
                mapRawHeaders(rawHeaders),
              ),
              headers: mapRawHeaders(rawHeaders),
              query: metadata.webhook.query,
              body: data,
            });
          },
        );
    },
    [me, onForwarded],
  );

  return { send };
};

export default useNodeSender;
