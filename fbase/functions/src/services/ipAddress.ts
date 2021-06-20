import * as functions from 'firebase-functions';

const ipAddress = (req: functions.https.Request) =>
  (<string>req.headers['x-forwarded-for'] || req.ip || '')
    .split(',')
    .shift()
    ?.trim() ?? '';

export default ipAddress;
