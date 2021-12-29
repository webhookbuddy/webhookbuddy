import type { Request, Response } from 'express';
import { findOrCreateAuthUser } from '../../../auth/findOrCreateAuthUser';
import { verifyInvite } from '../../../signatures/inviteSignature';

const authUser = async (req: Request, res: Response) => {
  const {
    query: { email, endpointId, hash },
  } = req;

  if (!verifyInvite(endpointId, email, hash)) {
    res.status(400).send('Invalid hash');
    return;
  }

  const user = await findOrCreateAuthUser(email as string);
  if (user) res.status(200).send(user);
  else res.status(404).send({ message: 'User not found' });
};

export default authUser;
