const queryString = (query: Record<string, string>) =>
  Object.keys(query)
    .map(key => `${key}=${encodeURIComponent(query[key])}`)
    .join('&');

export const appendQuery = (
  url: string,
  query: Record<string, string>,
) =>
  !Object.keys(query).length
    ? url
    : url.includes('?')
    ? `${url}&${queryString(query)}`
    : `${url}?${queryString(query)}`;

export const mapRawHeaders = (rawHeaders: string[] | null) => {
  const headers: Record<string, string> = {};
  if (!rawHeaders) return headers;

  for (let i = 0; i < rawHeaders.length; i = i + 2)
    headers[rawHeaders[i]] = rawHeaders[i + 1];

  return headers;
};
export const extractContentType = (
  headers: Record<string, string>,
) => {
  const key =
    Object.keys(headers).find(
      k => k.toLowerCase() === 'content-type',
    ) ?? '';
  return headers[key] ?? null;
};
