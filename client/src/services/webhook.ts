import { Webhook } from 'types/Webhook';

interface KeyValue {
  key: string;
  value: string;
}

const mapToKeyValue = (obj: Object) =>
  Object.entries(obj).map(
    o => ({ key: o[0], value: o[1] } as KeyValue),
  );

const parseJson = (obj: any) => {
  try {
    return JSON.parse(obj);
  } catch {
    return null;
  }
};

const getStripeCustomer = (webhook: Webhook) => {
  const body = parseJson(webhook.body);
  return `${
    body?.data?.object?.customer ??
    (body?.data?.object?.object === 'customer'
      ? body.data.object.id
      : '')
  }`;
};

const tryGetStripe = (webhook: Webhook) =>
  mapToKeyValue(webhook.headers).find(
    o =>
      o.key.toLowerCase() === 'user-agent' &&
      o.value.toLowerCase().startsWith('stripe'),
  )
    ? `${getStripeCustomer(webhook)} ${
        parseJson(webhook.body)?.type
      }`.trim()
    : null;

const tryGetSendgrid = (webhook: Webhook) => {
  const body = parseJson(webhook.body);
  return mapToKeyValue(webhook.headers).find(
    o =>
      o.key.toLowerCase() === 'user-agent' &&
      o.value === 'SendGrid Event API',
  ) && Array.isArray(body)
    ? body.length > 5
      ? `${body.length} messages: ${parseJson(webhook.body)
          .map((o: any) => o.event)
          .slice(0, 3)
          .join(',')}...`
      : body.map((o: any) => o.event).join(',')
    : null;
};

const tryGetEventbrite = (webhook: Webhook) =>
  mapToKeyValue(webhook.headers).find(
    o => o.key.toLowerCase() === 'x-eventbrite-event',
  )?.value;

const getMailgunRecipient = (webhook: Webhook) =>
  (parseJson(webhook.body)?.['event-data']?.recipient ?? '').split(
    '@',
  )[0];

const getMailgunEvent = (webhook: Webhook) =>
  parseJson(webhook.body)?.['event-data']?.event ?? '';

const tryGetMailgun = (webhook: Webhook) =>
  mapToKeyValue(webhook.headers).find(
    o =>
      o.key.toLowerCase() === 'user-agent' &&
      o.value.toLowerCase().startsWith('mailgun'),
  )
    ? `${getMailgunRecipient(webhook)} ${getMailgunEvent(
        webhook,
      )}`.trim()
    : null;

const tryGetArray = (webhook: Webhook) =>
  Array.isArray(parseJson(webhook.body))
    ? `${parseJson(webhook.body).length} messages`
    : null;

export const webhookDescription = (webhook: Webhook) =>
  tryGetStripe(webhook) ??
  tryGetSendgrid(webhook) ??
  tryGetEventbrite(webhook) ??
  tryGetMailgun(webhook) ??
  tryGetArray(webhook) ??
  webhook.method;
