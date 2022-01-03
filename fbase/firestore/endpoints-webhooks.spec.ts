import * as firebase from '@firebase/testing';
import { setup, setupAdmin, teardown } from '../testHelpers';
import dayjs = require('dayjs');

const createWebhook = async (
  userId: string,
  endpointId: string,
  webhookId: string,
  overrides?: object,
) => {
  const admin = await setupAdmin();
  await admin.doc(`endpoints/${endpointId}`).set({
    name: 'My Endpoint',
    createdAt: dayjs().subtract(5, 'minutes').toDate(),
    users: {
      [userId]: {
        exists: true,
        role: 'Owner',
        id: userId,
      },
    },
  });
  await admin
    .doc(`endpoints/${endpointId}/webhooks/${webhookId}`)
    .set({
      method: 'POST',
      createdAt: dayjs().subtract(5, 'minutes').toDate(),
      ...overrides,
    });
};

beforeEach(async () => await teardown());

describe('Webhook rules', () => {
  // Anonymous

  it('Denies anonymous user access to list webhooks', async () => {
    const endpointId = 'endpoint1';
    const db = await setup();
    const ref = db.collection(`endpoints/${endpointId}/webhooks`);
    await expect(ref.get()).toDeny();
  });

  it('Denies anonymous user access to get webhook', async () => {
    const endpointId = 'endpoint1';
    const db = await setup();
    const ref = db
      .collection(`endpoints/${endpointId}/webhooks`)
      .doc('123');
    await expect(ref.get()).toDeny();
  });

  it('Denies anonymous user access to set webhook', async () => {
    const endpointId = 'endpoint1';
    const db = await setup();
    const ref = db
      .collection(`endpoints/${endpointId}/webhooks`)
      .doc('123');
    await expect(ref.set({ foo: 'bar' }, { merge: true })).toDeny();
  });

  it('Denies anonymous user access to delete webhook', async () => {
    const endpointId = 'endpoint1';
    const db = await setup();
    const ref = db
      .collection(`endpoints/${endpointId}/webhooks`)
      .doc('123');
    await expect(ref.delete()).toDeny();
  });

  // Authenticated

  it('Denies verified user access to list webhooks if not in role', async () => {
    const endpointId = 'endpoint1';
    await createWebhook('someUserId', endpointId, 'webhook1');
    const db = await setup({ uid: 'user123', email_verified: true });
    const ref = db.collection(`endpoints/${endpointId}/webhooks`);
    await expect(ref.get()).toDeny();
  });

  it('Allows verified user access to list webhooks if in role', async () => {
    const endpointId = 'endpoint1';
    const uid = 'user123';
    await createWebhook(uid, endpointId, 'webhook1');
    const db = await setup({ uid, email_verified: true });
    const ref = db.collection(`endpoints/${endpointId}/webhooks`);
    await expect(ref.get()).toAllow();
  });

  it('Allows verified user access to get webhook if in role', async () => {
    const endpointId = 'endpoint1';
    const uid = 'user123';
    const webhookId = 'webhook1';
    await createWebhook(uid, endpointId, webhookId);

    const db = await setup({ uid, email_verified: true });
    const ref = db
      .collection(`endpoints/${endpointId}/webhooks`)
      .doc(webhookId);
    await expect(ref.get()).toAllow();
  });

  it('Denies verified user access to get webhook if not in role', async () => {
    const endpointId = 'endpoint1';
    const uid = 'user123';
    const webhookId = 'webhook1';
    await createWebhook('someUserId', endpointId, webhookId);

    const db = await setup({ uid, email_verified: true });
    const ref = db
      .collection(`endpoints/${endpointId}/webhooks`)
      .doc(webhookId);
    await expect(ref.get()).toDeny();
  });

  it('Allows verified user access to update webhook if in role', async () => {
    const endpointId = 'endpoint1';
    const uid = 'user123';
    const webhookId = 'webhook1';
    await createWebhook(uid, endpointId, webhookId);

    const db = await setup({ uid, email_verified: true });
    const ref = db
      .collection(`endpoints/${endpointId}/webhooks`)
      .doc(webhookId);
    await expect(ref.set({ foo: 'bar' }, { merge: true })).toAllow();
  });

  it('Denies verified user access to create webhook even if in role', async () => {
    const endpointId = 'endpoint1';
    const uid = 'user123';
    const webhookId = 'webhook1';
    await createWebhook(uid, endpointId, 'someWebhookId');

    const db = await setup({ uid, email_verified: true });
    const ref = db
      .collection(`endpoints/${endpointId}/webhooks`)
      .doc(webhookId);
    await expect(
      ref.set(
        {
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true },
      ),
    ).toDeny();
  });

  it('Allows verified user access to delete webhook if in role', async () => {
    const endpointId = 'endpoint1';
    const uid = 'user123';
    const webhookId = 'webhook1';
    await createWebhook(uid, endpointId, webhookId);

    const db = await setup({ uid, email_verified: true });
    const ref = db
      .collection(`endpoints/${endpointId}/webhooks`)
      .doc(webhookId);
    await expect(ref.delete()).toAllow();
  });

  it('Denies user access to change createdAt', async () => {
    const endpointId = 'endpoint1';
    const uid = 'user123';
    const webhookId = 'webhook1';
    await createWebhook(uid, endpointId, webhookId);

    const db = await setup({ uid, email_verified: true });
    const ref = db
      .collection(`endpoints/${endpointId}/webhooks`)
      .doc(webhookId);
    await expect(
      ref.set(
        {
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true },
      ),
    ).toDeny();
  });
});

afterAll(async () => await teardown());
