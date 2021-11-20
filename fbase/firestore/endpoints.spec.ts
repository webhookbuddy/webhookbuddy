import * as firebase from '@firebase/testing';
import { setup, setupAdmin, teardown } from '../testHelpers';

const createEndpoint = async (
  endpointId: string,
  overrides?: object,
) => {
  const admin = await setupAdmin();
  await admin
    .collection('endpoints')
    .doc(endpointId)
    .set({
      name: 'My Endpoint',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      users: {},
      ...overrides,
    });
};

beforeEach(async () => await teardown());

describe('Endpoint rules', () => {
  // Anonymous

  it('Denies anonymous user access to list endpoints', async () => {
    const db = await setup();
    const ref = db.collection('endpoints');
    await expect(ref.get()).toDeny();
  });

  it('Denies anonymous user access to get endpoint', async () => {
    const db = await setup();
    const ref = db.collection('endpoints').doc('123');
    await expect(ref.get()).toDeny();
  });

  it('Denies anonymous user access to set endpoint', async () => {
    const db = await setup();
    const ref = db.collection('endpoints').doc('123');
    await expect(ref.set({ foo: 'bar' }, { merge: true })).toDeny();
  });

  it('Denies anonymous user access to delete endpoint', async () => {
    const db = await setup();
    const ref = db.collection('endpoints').doc('123');
    await expect(ref.delete()).toDeny();
  });

  // Authenticated

  it('Denies verified user access to list endpoints', async () => {
    const db = await setup({ uid: 'user123', email_verified: true });
    const ref = db.collection('endpoints');
    await expect(ref.get()).toDeny();
  });

  it('Denies authorized but unverified user access to list endpoints even if in users list', async () => {
    const uid = 'user123';
    const db = await setup({ uid });
    const ref = db
      .collection('endpoints')
      .where(`users.${uid}.exists`, '==', true);
    await expect(ref.get()).toDeny();
  });

  it('Allows verified user access to list endpoints if in users list', async () => {
    const uid = 'user123';
    const db = await setup({ uid, email_verified: true });
    const ref = db
      .collection('endpoints')
      .where(`users.${uid}.exists`, '==', true);
    await expect(ref.get()).toAllow();
  });

  it('Denies authorized but unverified user access to get endpoint even if in users list', async () => {
    const uid = 'user123';
    const endpointId = 'endpoint1';
    await createEndpoint(endpointId, {
      users: {
        [uid]: {
          exists: true,
        },
      },
    });

    const db = await setup({ uid });
    const ref = db.collection('endpoints').doc(endpointId);
    await expect(ref.get()).toDeny();
  });

  it('Allows verified user access to get endpoint if in users list', async () => {
    const uid = 'user123';
    const endpointId = 'endpoint1';
    await createEndpoint(endpointId, {
      users: {
        [uid]: {
          exists: true,
        },
      },
    });

    const db = await setup({ uid, email_verified: true });
    const ref = db.collection('endpoints').doc(endpointId);
    await expect(ref.get()).toAllow();
  });

  it('Denies verified user access to get endpoint if not in users list', async () => {
    const uid = 'user123';
    const endpointId = 'endpoint1';
    await createEndpoint(endpointId, {
      users: { anotherUser: { exists: true } },
    });

    const db = await setup({ uid, email_verified: true });
    const ref = db.collection('endpoints').doc(endpointId);
    await expect(ref.get()).toDeny();
  });

  // forwardUrls

  it('Allows verified user access to add forwardUrls if in users list', async () => {
    const uid = 'user123';
    const endpointId = 'endpoint1';
    await createEndpoint(endpointId, {
      users: {
        [uid]: {
          exists: true,
        },
      },
    });

    const db = await setup({ uid, email_verified: true });
    const ref = db.collection('endpoints').doc(endpointId);
    await expect(
      ref.set(
        { forwardUrls: { [uid]: ['one', 'two'] } },
        { merge: true },
      ),
    ).toAllow();
  });

  it('Allows verified user access to update forwardUrls if in users list', async () => {
    const uid = 'user123';
    const endpointId = 'endpoint1';
    await createEndpoint(endpointId, {
      users: {
        [uid]: {
          exists: true,
        },
      },
    });

    const db = await setup({ uid, email_verified: true });
    const ref = db.collection('endpoints').doc(endpointId);
    await expect(
      ref.set(
        {
          forwardUrls: [
            'http://www.example.com/1',
            'http://www.example.com/2',
          ],
        },
        { merge: true },
      ),
    ).toAllow();
  });

  // webhookCount

  it('Denies verified user access to set webhookCount even if in users list ', async () => {
    const uid = 'user123';
    const endpointId = 'endpoint1';
    await createEndpoint(endpointId, {
      users: {
        [uid]: {
          exists: true,
        },
      },
    });

    const db = await setup({ uid, email_verified: true });
    const ref = db.collection('endpoints').doc(endpointId);
    await expect(
      ref.set({ webhookCount: 100 }, { merge: true }),
    ).toDeny();
  });

  // Delete

  it('Allows owner access to delete endpoint', async () => {
    const uid = 'user123';
    const endpointId = 'endpoint1';
    await createEndpoint(endpointId, {
      users: {
        [uid]: {
          exists: true,
          role: 'Owner',
        },
      },
    });

    const db = await setup({ uid, email_verified: true });
    const ref = db.collection('endpoints').doc(endpointId);
    await expect(ref.delete()).toAllow();
  });

  it('Denies guest from deleting endpoint', async () => {
    const uid = 'user123';
    const endpointId = 'endpoint1';
    await createEndpoint(endpointId, {
      users: {
        [uid]: {
          exists: true,
          role: 'Guest',
        },
      },
    });

    const db = await setup({ uid, email_verified: true });
    const ref = db.collection('endpoints').doc(endpointId);
    await expect(ref.delete()).toDeny();
  });
});

afterAll(async () => await teardown());
