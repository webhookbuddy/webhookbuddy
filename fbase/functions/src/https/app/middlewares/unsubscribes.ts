import type { Request, Response } from 'express';
import { admin, db } from '../../../config/firebase';
import { verifyUnsubscribe } from '../../../signatures/unsubscribeSignature';

const update = async (
  req: Request,
  res: Response,
  unsubscribe: boolean,
) => {
  const {
    query: { email, hash },
  } = req;

  if (!verifyUnsubscribe(email, hash)) {
    res.status(400).send('Invalid hash');
    return;
  }

  if (unsubscribe)
    await db.doc(`unsubscribes/${email}`).set({
      unsubscribedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  else await db.doc(`unsubscribes/${email}`).delete();

  res.status(204).send();
};

export const subscribe = async (req: Request, res: Response) => {
  await update(req, res, false);
};

export const unsubscribe = async (req: Request, res: Response) => {
  await update(req, res, true);
};
