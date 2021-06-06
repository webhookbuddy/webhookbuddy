import * as firebase from '@firebase/testing';

const PROJECT_ID = 'webhook-buddy-dev';

export const setup = async (auth?: UserInfo) =>
  (
    await firebase.initializeTestApp({
      projectId: PROJECT_ID,
      auth,
    })
  ).firestore();

export const setupAdmin = async () =>
  (
    await firebase.initializeAdminApp({ projectId: PROJECT_ID })
  ).firestore();

export const teardown = async () => {
  await firebase.clearFirestoreData({ projectId: PROJECT_ID });
};

expect.extend({
  async toAllow(x) {
    let pass = false;
    try {
      await firebase.assertSucceeds(x);
      pass = true;
    } catch {}

    return {
      pass,
      message: () =>
        'Expected Firebase operation to be allowed, but it failed',
    };
  },
});

expect.extend({
  async toDeny(x) {
    let pass = false;
    try {
      await firebase.assertFails(x);
      pass = true;
    } catch {}

    return {
      pass,
      message: () =>
        'Expected Firebase operation to be denied, but it was allowed',
    };
  },
});

interface UserInfo {
  uid: string;
  email?: string | null;
  email_verified?: boolean | null;
}
