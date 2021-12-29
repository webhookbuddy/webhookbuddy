import { admin } from '../config/firebase';
import { findAuthUserByEmail } from './findAuthUserByEmail';

export const findOrCreateAuthUser = async (email: string) =>
  (await findAuthUserByEmail(email)) ??
  (await admin.auth().createUser({
    email,
  }));
