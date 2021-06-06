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
      roles: {},
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

  it('Denies authorized but unverified user access to list endpoints even if in role', async () => {
    const uid = 'user123';
    const db = await setup({ uid });
    const ref = db
      .collection('endpoints')
      .where(`roles.${uid}`, '>', '');
    await expect(ref.get()).toDeny();
  });

  it('Allows verified user access to list endpoints if in role', async () => {
    const uid = 'user123';
    const db = await setup({ uid, email_verified: true });
    const ref = db
      .collection('endpoints')
      .where(`roles.${uid}`, '>', '');
    await expect(ref.get()).toAllow();
  });

  it('Denies authorized but unverified user access to get endpoint even if in role', async () => {
    const uid = 'user123';
    const endpointId = 'endpoint1';
    await createEndpoint(endpointId, { roles: { [uid]: 'Owner' } });

    const db = await setup({ uid });
    const ref = db.collection('endpoints').doc(endpointId);
    await expect(ref.get()).toDeny();
  });

  it('Allows verified user access to get endpoint if in role', async () => {
    const uid = 'user123';
    const endpointId = 'endpoint1';
    await createEndpoint(endpointId, { roles: { [uid]: 'Owner' } });

    const db = await setup({ uid, email_verified: true });
    const ref = db.collection('endpoints').doc(endpointId);
    await expect(ref.get()).toAllow();
  });

  it('Denies verified user access to get endpoint if not in role', async () => {
    const uid = 'user123';
    const endpointId = 'endpoint1';
    await createEndpoint(endpointId, {
      roles: { anotheruser: 'Owner' },
    });

    const db = await setup({ uid, email_verified: true });
    const ref = db.collection('endpoints').doc(endpointId);
    await expect(ref.get()).toDeny();
  });

  it('Denies verified user access to set endpoint even if in role', async () => {
    const uid = 'user123';
    const endpointId = 'endpoint1';
    await createEndpoint(endpointId, { roles: { [uid]: 'Owner' } });

    const db = await setup({ uid, email_verified: true });
    const ref = db.collection('endpoints').doc(endpointId);
    await expect(ref.set({ foo: 'bar' }, { merge: true })).toDeny();
  });

  it('Allows verified user access to forwardUrls if in role', async () => {
    const uid = 'user123';
    const endpointId = 'endpoint1';
    await createEndpoint(endpointId, { roles: { [uid]: 'Owner' } });

    const db = await setup({ uid, email_verified: true });
    const ref = db.collection('endpoints').doc(endpointId);
    await expect(
      ref.set(
        { forwardUrls: { [uid]: ['one', 'two'] } },
        { merge: true },
      ),
    ).toAllow();
  });

  it('Allows owner access to delete endpoint', async () => {
    const uid = 'user123';
    const endpointId = 'endpoint1';
    await createEndpoint(endpointId, { roles: { [uid]: 'Owner' } });

    const db = await setup({ uid, email_verified: true });
    const ref = db.collection('endpoints').doc(endpointId);
    await expect(ref.delete()).toAllow();
  });

  it('Denies editor access to delete endpoint', async () => {
    const uid = 'user123';
    const endpointId = 'endpoint1';
    await createEndpoint(endpointId, { roles: { [uid]: 'Editor' } });

    const db = await setup({ uid, email_verified: true });
    const ref = db.collection('endpoints').doc(endpointId);
    await expect(ref.delete()).toDeny();
  });
});

afterAll(async () => await teardown());
