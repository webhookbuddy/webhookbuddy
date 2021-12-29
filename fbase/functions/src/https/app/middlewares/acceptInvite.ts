import type { Request, Response } from 'express';
import { findAuthUserByEmail } from '../../../auth/findAuthUserByEmail';
import { db } from '../../../config/firebase';
import { verifyInvite } from '../../../signatures/inviteSignature';

const acceptInviteForNewUser = async (
  req: Request,
  res: Response,
) => {
  console.log('TODO', req, res);
};

const acceptInviteForExistingUser = async (
  req: Request,
  res: Response,
) => {
  const {
    query: { email, endpointId },
  } = req;

  const authUser = await findAuthUserByEmail(email as string);
  if (!authUser) {
    res.status(404).send('User not found');
    return;
  }

  const user = (await db.doc(`users/${authUser.uid}`).get()).data();

  await db.doc(`endpoints/${endpointId}`).set(
    {
      users: {
        [authUser.uid]: {
          exists: true,
          email,
          role: 'Guest',
          firstName: user?.firstName ?? null,
          lastName: user?.lastName ?? null,
        },
      },
    },
    { merge: true },
  );

  res.status(204).send();
};

export const acceptInvite =
  (forNewUser: boolean) => async (req: Request, res: Response) => {
    const {
      query: { email, endpointId, hash },
    } = req;

    if (!verifyInvite(endpointId, email, hash)) {
      res.status(400).send('Invalid hash');
      return;
    }

    const invite = await db
      .doc(`endpoints/${endpointId}/invites/${email}`)
      .get();

    if (!invite.exists) {
      res.status(404).send('Invite not found');
      return;
    }

    if (forNewUser) await acceptInviteForNewUser(req, res);
    else await acceptInviteForExistingUser(req, res);
  };
