import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';
import config from '../config';
import { db } from '../config/firebase';
import { signInvite } from '../signatures/inviteSignature';
import { signUnsubscribe } from '../signatures/unsubscribeSignature';

// https://stackoverflow.com/a/66218866
const emailTemplate = fs.readFileSync(
  path.resolve(__dirname, '../emails/invite.hbs'),
  'utf8',
);

const template = handlebars.compile(emailTemplate);

const sendInvite = async (
  change: functions.Change<functions.firestore.DocumentSnapshot>,
  context: functions.EventContext,
) => {
  const invite = change.after.data();
  const before = change.before.data();
  if (!invite) return null;

  if (before && before.resendCount === invite.resendCount)
    return null;

  const endpoint = (
    await db.doc(`endpoints/${context.params.endpointId}`).get()
  ).data();

  if (!endpoint) return null;

  const lowerEmail = invite.invitee.email.toLowerCase().trim();
  if ((await db.doc(`unsubscribes/${lowerEmail}`).get()).exists)
    return null;

  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    auth: {
      user: config.smtpAuthUser,
      pass: config.smtpAuthPass,
    },
  });

  return transporter.sendMail({
    from: `"${invite.inviter.firstName} ${invite.inviter.lastName}" <${config.fromEmail}>`,
    to: lowerEmail,
    subject: `${invite.inviter.firstName} ${invite.inviter.lastName} invites you to Webhook Buddy`,
    html: template({
      inviter: `${invite.inviter.firstName} ${invite.inviter.lastName}`,
      endpointName: endpoint.name,
      inviteUrl: config.inviteUrlFormat
        .replace('{endpointId}', context.params.endpointId)
        .replace('{email}', encodeURIComponent(lowerEmail))
        .replace(
          '{hash}',
          signInvite(context.params.endpointId, lowerEmail),
        ),
      unsubscribeUrl: config.unsubscribeUrlFormat
        .replace('{email}', encodeURIComponent(lowerEmail))
        .replace('{hash}', signUnsubscribe(lowerEmail)),
    }),
  });
};

export const onInviteWrite = functions.firestore
  .document('endpoints/{endpointId}/invites/{inviteId}')
  .onWrite((change, context) => sendInvite(change, context));
