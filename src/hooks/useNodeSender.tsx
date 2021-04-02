import { useMe } from 'context/user-context';
import { useEffect } from 'react';
import { Webhook } from 'schema/types';
import { extractContentType, mapHeaders } from 'utils/http-fragment';
import {
  AddForward_addForward_webhook,
  AddForward_addForward_webhook_forwards,
} from './types/AddForward';

const { ipcRenderer } = window.require('electron');

const useNodeSender = ({
  onForwarded,
}: {
  onForwarded: (
    webhook: AddForward_addForward_webhook,
    forward: AddForward_addForward_webhook_forwards,
  ) => void;
}) => {
  const me = useMe();

  useEffect(() => {
    const onForwardedListener = (
      _: any,
      {
        metadata,
        rawHeaders,
        statusCode,
        data,
        error,
      }: {
        metadata: {
          url: string;
          webhook: AddForward_addForward_webhook;
        };
        statusCode: number;
        rawHeaders: string[];
        data: string;
        error: any;
      },
    ) => {
      onForwarded(metadata.webhook, {
        __typename: 'Forward',
        id: '_' + Math.round(Math.random() * 1000000),
        url: metadata.url,
        statusCode: error ? 502 : statusCode,
        success: statusCode >= 200 && statusCode < 300,
        createdAt: new Date(),
        method: metadata.webhook.method,
        headers: mapHeaders(rawHeaders),
        query: metadata.webhook.query,
        contentType: extractContentType(mapHeaders(rawHeaders)),
        body: data ?? '',
        user: me,
      } as AddForward_addForward_webhook_forwards);
    };

    ipcRenderer.on('http-request-completed', onForwardedListener);

    return () => {
      ipcRenderer.removeListener(
        'http-request-completed',
        onForwardedListener,
      );
    };
  }, [me, onForwarded]);

  const send = (url: string, webhook: Webhook) => {
    ipcRenderer.send('http-request', {
      method: webhook.method,
      url,
      headers: webhook.headers
        .filter(header => header.key.toLowerCase() !== 'host')
        .reduce((acc, cur) => {
          acc[cur.key] = cur.value;
          return acc;
        }, {} as any),
      body: webhook.body,
      metadata: {
        url,
        webhook,
      },
    });
  };

  return { send };
};

export default useNodeSender;
