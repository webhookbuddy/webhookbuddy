import * as dayjs from 'dayjs';
import { sign, verify } from './signature';

export const signInvite = (endpointId: string, email: string) =>
  sign(`${endpointId}|${email}`, dayjs().add(1, 'years').toDate());

export const verifyInvite = (
  endpointId: any,
  email: any,
  hash: any,
) => verify(`${endpointId}|${email}`, `${hash}`);
