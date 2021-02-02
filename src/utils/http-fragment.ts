import { KeyValue } from 'schema/types';

const queryString = (query: KeyValue[]) =>
  query
    .map(pair => `${pair.key}=${encodeURIComponent(pair.value)}`)
    .join('&');

export const appendQuery = (url: string, query: KeyValue[]) =>
  !query.length
    ? url
    : url.includes('?')
    ? `${url}&${queryString(query)}`
    : `${url}?${queryString(query)}`;

export const mapHeaders = (rawHeaders: string[]) => {
  const headers = [];
  for (let i = 0; i < rawHeaders?.length ?? []; i = i + 2)
    headers.push({
      __typename: 'KeyValue',
      key: rawHeaders[i],
      value: rawHeaders[i + 1],
    } as KeyValue);

  return headers;
};

export const extractContentType = (headers: KeyValue[]) =>
  headers.find(header => header.key.toLowerCase() === 'content-type')
    ?.value ?? null;
