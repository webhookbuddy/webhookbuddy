import { admin } from '../config/firebase';

export const findAuthUserByEmail = async (email: string) => {
  try {
    return await admin.auth().getUserByEmail(email);
  } catch (error) {
    if ((error as any).code !== 'auth/user-not-found') throw error;

    return null;
  }
};
