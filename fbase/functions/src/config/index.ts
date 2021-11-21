import * as functions from 'firebase-functions';

const config = functions.config().env as {
  signatureKey: string;
  fromEmail: string;
  unsubscribeUrlFormat: string;
  inviteUrlFormat: string;
  smtpHost: string;
  smtpPort: number;
  smtpAuthUser: string;
  smtpAuthPass: string;
};

export default config;
