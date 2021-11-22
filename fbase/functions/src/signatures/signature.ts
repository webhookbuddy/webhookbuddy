import * as crypto from 'crypto';
import * as dayjs from 'dayjs';
import config from '../config';

const key = config.signatureKey;

// Hashing technique: https://stackoverflow.com/a/7480211/188740
// See comment for timingSafeEqual technique

// https://stackoverflow.com/a/1145525/188740
const replaceAll = (
  str: string,
  searchValue: string,
  replaceValue: string,
) => str.split(searchValue).join(replaceValue);

const swap = (str: string, input: string, output: string) => {
  for (let i = 0; i < input.length; i++)
    str = replaceAll(str, input[i], output[i]);

  return str;
};

const createBase64Hmac = (message: string, expiresAt: Date) =>
  swap(
    crypto
      .createHmac('sha1', key)
      .update(`${expiresAt.getTime()}${message}`)
      .digest('hex'),
    '+=/', // Used to avoid characters that aren't safe in URLs
    '-_,',
  );

export const sign = (message: string, expiresAt: Date) =>
  `${expiresAt.getTime()}-${createBase64Hmac(message, expiresAt)}`;

export const verify = (message: string, hash: string) => {
  const matches = hash.match(/(.+?)-(.+)/);
  if (!matches) return false;

  const expires = matches[1];
  const hmac = matches[2];

  if (!/^\d+$/.test(expires)) return false;

  const expiresAt = dayjs(parseInt(expires, 10));
  if (expiresAt.isBefore(dayjs())) return false;

  const expectedHmac = createBase64Hmac(message, expiresAt.toDate());
  // Byte lengths must equal, otherwise crypto.timingSafeEqual will throw an exception
  if (hmac.length !== expectedHmac.length) return false;

  return crypto.timingSafeEqual(
    Buffer.from(hmac),
    Buffer.from(expectedHmac),
  );
};

// https://stackoverflow.com/a/54116079/188740
export const testables = {
  swap,
};
