import * as functions from 'firebase-functions';
import { admin, db } from '../config/firebase';
import ipAddress from '../services/ipAddress';
import { extractContentType } from '../services/http';

const keepHeader = (header: string) => {
  // Exclude Google Cloud specific headers:
  // https://cloud.google.com/functions/docs/reference/headers

  const loweredHeader = header.toLowerCase();
  return (
    loweredHeader !== 'host' && // Host is not relevant, as it'll be set to GCP's cloud function hostname (e.g. us-central1-webhookbuddy.cloudfunctions.net)
    // Cloudflare headers
    !loweredHeader.startsWith('cf-') && // Cloud function specific headers
    loweredHeader !== 'cdn-loop' &&
    // GCP headers
    !loweredHeader.startsWith('x-appengine') &&
    loweredHeader !== 'x-cloud-trace-context' && // A unique identifier for the request used for Cloud Trace and Cloud Logging
    loweredHeader !== 'traceparent' &&
    loweredHeader !== 'function-execution-id' &&
    loweredHeader !== 'forwarded' &&
    loweredHeader !== 'transfer-encoding' // GCP adds this and it causes problems when forwarding webhooks to servers
  );
};

const mapHeaders = (rawHeaders: string[]) => {
  const headers: any = {};
  for (let i = 0; i < rawHeaders.length; i = i + 2)
    if (keepHeader(rawHeaders[i]))
      headers[rawHeaders[i]] = rawHeaders[i + 1];

  return headers;
};

// We use this Cloudflare Worker: https://dash.cloudflare.com/2efb0d8be194463fe1d39cebdd7c179f/webhookbuddy.com/workers
// to proxy
// https://point.webhookbuddy.com/endpoint-reference-id to https://us-central1-webhookbuddy.cloudfunctions.net/point/endpoint-reference-id
// and
// https://point-dev.webhookbuddy.com/endpoint-reference-id to https://us-central1-webhookbuddy-dev.cloudfunctions.net/point/endpoint-reference-id
const point = functions.https.onRequest(async (req, res) => {
  // Trim off the first /, as req.params[0] comes in as:
  // - /
  // - /foo
  const referenceId = req.params[0]?.replace(/^\//, '');
  if (!referenceId.length) {
    res.status(404).send({ message: 'Resource not found.' });
    return;
  }

  const endpoints = await db
    .collection('endpoints')
    .where('referenceId', '==', referenceId)
    .get();

  if (endpoints.empty) {
    res.status(404).send({ message: 'Resource not found.' });
    return;
  }

  const promises = endpoints.docs.map(endpoint =>
    db.collection(`${endpoint.ref.path}/webhooks`).add({
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      ipAddress: ipAddress(req),
      method: req.method,
      contentType: extractContentType(req.headers),
      // Use rawHeaders instead of headers, as headers converts all keys to lower-case: https://github.com/nodejs/node-v0.x-archive/issues/1954
      // Note: Running in Emulator seems to be an exception where headers are converted to lower-case in rawHeaders. This isn't the case in GCP.
      headers: mapHeaders(req.rawHeaders),
      query: req.query,
      body:
        typeof req.body === 'object' // Running function in emulator seems to parse JSON to object, even though we're not using bodyParser
          ? JSON.stringify(req.body)
          : typeof req.body === 'string' // Note: won't work if string is constructed from new String(): https://stackoverflow.com/a/4059166/188740
          ? req.body
          : null,
      reads: {},
      forwards: [],
    }),
  );

  await Promise.all(promises);
  res.status(204).send();
});

export default point;
