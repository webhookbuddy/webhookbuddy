import { setup, setupAdmin, teardown } from '../testHelpers';
import dayjs = require('dayjs');

const createUser = async (
  endpointId: string,
  userId: string,
  firstName: string,
  lastName: string,
  email: string,
  role: string = 'Owner',
) => {
  const admin = await setupAdmin();
  await admin.doc(`endpoints/${endpointId}`).set({
    name: 'My Endpoint',
    createdAt: dayjs().subtract(5, 'minutes').toDate(),
    users: {
      [userId]: {
        exists: true,
        role,
        id: userId,
      },
    },
  });
  await admin.doc(`users/${userId}`).set({
    firstName,
    lastName,
    email,
  });
};

beforeEach(async () => await teardown());

describe('Invite rules', () => {
  it('Allows access to set valid invite', async () => {
    const endpointId = 'endpoint1';
    const userId = 'user1';
    const firstName = 'Bob';
    const lastName = 'Smith';
    const email = 'bob@email.com';

    await createUser(endpointId, userId, firstName, lastName, email);

    const db = await setup({
      uid: userId,
      email,
      email_verified: true,
    });
    const ref = db.doc(
      `endpoints/${endpointId}/invites/invitee@email.com`,
    );
    await expect(
      ref.set({
        inviter: {
          id: userId,
          email,
          firstName,
          lastName,
        },
      }),
    ).toAllow();
  });

  it('Denies access to set invite with wrong inviter email', async () => {
    const endpointId = 'endpoint1';
    const userId = 'user1';
    const firstName = 'Bob';
    const lastName = 'Smith';
    const email = 'bob@email.com';

    await createUser(endpointId, userId, firstName, lastName, email);

    const db = await setup({
      uid: userId,
      email,
      email_verified: true,
    });
    const ref = db.doc(
      `endpoints/${endpointId}/invites/invitee@email.com`,
    );
    await expect(
      ref.set({
        inviter: {
          id: userId,
          email: 'someone@email.com',
          firstName,
          lastName,
        },
      }),
    ).toDeny();
  });

  it('Denies access to set invite with wrong inviter firstName', async () => {
    const endpointId = 'endpoint1';
    const userId = 'user1';
    const firstName = 'Bob';
    const lastName = 'Smith';
    const email = 'bob@email.com';

    await createUser(endpointId, userId, firstName, lastName, email);

    const db = await setup({
      uid: userId,
      email,
      email_verified: true,
    });
    const ref = db.doc(
      `endpoints/${endpointId}/invites/invitee@email.com`,
    );
    await expect(
      ref.set({
        inviter: {
          id: userId,
          email,
          firstName: 'Foo',
          lastName,
        },
      }),
    ).toDeny();
  });

  it('Denies access to set invite with wrong lastName', async () => {
    const endpointId = 'endpoint1';
    const userId = 'user1';
    const firstName = 'Bob';
    const lastName = 'Smith';
    const email = 'bob@email.com';

    await createUser(endpointId, userId, firstName, lastName, email);

    const db = await setup({
      uid: userId,
      email,
      email_verified: true,
    });
    const ref = db.doc(
      `endpoints/${endpointId}/invites/invitee@email.com`,
    );
    await expect(
      ref.set({
        inviter: {
          id: userId,
          email,
          firstName,
          lastName: 'Bar',
        },
      }),
    ).toDeny();
  });

  it('Denies non-Owner access to set invite', async () => {
    const endpointId = 'endpoint1';
    const userId = 'user1';
    const firstName = 'Bob';
    const lastName = 'Smith';
    const email = 'bob@email.com';

    await createUser(
      endpointId,
      userId,
      firstName,
      lastName,
      email,
      'Guest',
    );

    const db = await setup({
      uid: userId,
      email,
      email_verified: true,
    });
    const ref = db.doc(
      `endpoints/${endpointId}/invites/invitee@email.com`,
    );
    await expect(
      ref.set({
        inviter: {
          id: userId,
          email,
          firstName,
          lastName,
        },
      }),
    ).toDeny();
  });
});

afterAll(async () => await teardown());
