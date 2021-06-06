import * as firebase from '@firebase/testing';
import { setup, setupAdmin, teardown } from '../testHelpers';
import moment = require('moment');

const createUser = async (uid: string, payload: any) => {
  const admin = await setupAdmin();
  await admin.collection('users').doc(uid).set(payload);
};

beforeEach(async () => await teardown());

describe('User rules', () => {
  // Anonymous

  it('Denies anonymous user access to list users', async () => {
    const db = await setup();
    const ref = db.collection('users');
    await expect(ref.get()).toDeny();
  });

  it('Denies anonymous user access to get user', async () => {
    const db = await setup();
    const ref = db.collection('users').doc('123');
    await expect(ref.get()).toDeny();
  });

  it('Denies anonymous user access to set user', async () => {
    const db = await setup();
    const ref = db.collection('users').doc('123');
    await expect(ref.set({ foo: 'bar' }, { merge: true })).toDeny();
  });

  it('Denies anonymous user access to delete user', async () => {
    const db = await setup();
    const ref = db.collection('users').doc('123');
    await expect(ref.delete()).toDeny();
  });

  // Authenticated

  it('Denies verified user access to list users', async () => {
    const db = await setup({ uid: 'user123', email_verified: true });
    const ref = db.collection('users');
    await expect(ref.get()).toDeny();
  });

  it('Denies verified user access to get another user', async () => {
    createUser('another-user', { firstName: 'Bob' });
    const db = await setup({ uid: 'user123', email_verified: true });
    const ref = db.collection('users').doc('another-user');
    await expect(ref.get()).toDeny();
  });

  it('Denies verified user access to set another user', async () => {
    createUser('another-user', { firstName: 'Bob' });
    const db = await setup({ uid: 'user123', email_verified: true });
    const ref = db.collection('users').doc('another-user');
    await expect(ref.set({ firstName: 'Bob' })).toDeny();
  });

  it('Allows authenticated user access to get own user', async () => {
    const uid = 'user123';
    createUser(uid, { firstName: 'Bob' });

    const db = await setup({
      uid,
    });
    const ref = db.collection('users').doc(uid);
    await expect(ref.get()).toAllow();
  });

  it('Allows authenticated user access to create own user', async () => {
    const uid = 'user123';

    const db = await setup({ uid });
    const ref = db.collection('users').doc(uid);
    await expect(
      ref.set({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        firstName: 'Lou',
        lastName: 'Ferigno',
      }),
    ).toAllow();
  });

  it('Denies authenticated user access to create user without createdAt', async () => {
    const uid = 'user123';

    const db = await setup({ uid });
    const ref = db.collection('users').doc(uid);
    await expect(
      ref.set({
        firstName: 'Lou',
        lastName: 'Ferigno',
      }),
    ).toDeny();
  });

  it('Denies authenticated user access to set arbitrary createdAt', async () => {
    const uid = 'user123';

    const db = await setup({ uid });
    const ref = db.collection('users').doc(uid);
    await expect(
      ref.set({
        createdAt: moment().subtract(5, 'minutes').toDate(),
        firstName: 'Lou',
        lastName: 'Ferigno',
      }),
    ).toDeny();
  });

  it('Allows verified user access to update own user', async () => {
    const uid = 'user123';
    createUser(uid, {
      firstName: 'Lou',
      lastName: 'Ferigno',
    });

    const db = await setup({ uid, email_verified: true });
    const ref = db.collection('users').doc(uid);
    await expect(
      ref.set(
        {
          firstName: 'Cam',
          lastName: 'Neely',
        },
        { merge: true },
      ),
    ).toAllow();
  });

  it('Denies authenticated but unverified user access to update own user', async () => {
    const uid = 'user123';
    createUser(uid, {
      firstName: 'Lou',
      lastName: 'Ferigno',
    });

    const db = await setup({ uid });
    const ref = db.collection('users').doc(uid);
    await expect(
      ref.set(
        {
          firstName: 'Cam',
          lastName: 'Neely',
        },
        { merge: true },
      ),
    ).toDeny();
  });

  it('Denies verified user access to chnage createdAt', async () => {
    const uid = 'user123';
    createUser(uid, {
      createdAt: moment().subtract(5, 'minutes').toDate(),
      firstName: 'Lou',
      lastName: 'Ferigno',
    });

    const db = await setup({ uid, email_verified: true });
    const ref = db.collection('users').doc(uid);
    await expect(
      ref.set(
        {
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true },
      ),
    ).toDeny();
  });

  it('Denies verified user access to delete own user', async () => {
    const uid = 'user123';
    createUser(uid, { firstName: 'Bob' });

    const db = await setup({ uid, email_verified: true });
    const ref = db.collection('users').doc(uid);
    await expect(ref.delete()).toDeny();
  });
});

afterAll(async () => await teardown());
