import * as dayjs from 'dayjs';
import { sign, verify } from './signature';

export const signUnsubscribe = (email: string) =>
  sign(email, dayjs().add(7, 'days').toDate());

export const verifyUnsubscribe = (email: any, hash: any) =>
  verify(`${email}`, `${hash}`);
