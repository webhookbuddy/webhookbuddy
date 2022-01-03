import * as functions from 'firebase-functions';
import { verifyInvite } from '../signatures/inviteSignature';
import { verifyUnsubscribe } from '../signatures/unsubscribeSignature';

export const verifySignature = functions.https.onRequest(
  async (req, res) => {
    const {
      query: { type, email, endpointId, hash },
    } = req;

    switch (type) {
      case 'invite':
        res.send({ isValid: verifyInvite(endpointId, email, hash) });
        break;
      case 'unsubscribe':
        res.send({ isValid: verifyUnsubscribe(email, hash) });
        break;
      default:
        res.status(400).send({ message: 'Unknown type' });
    }
  },
);
