import { Webhook } from 'schema/types';
import useForwardingIds from './useForwardingIds';
import useForwardUrls from './useForwardUrls';
import {
  AddForward_addForward_webhook,
  AddForward_addForward_webhook_forwards,
} from './types/AddForward';
import useAddForward from './useAddForward';
import { appendQuery } from 'utils/http-fragment';
import isElectron from 'is-electron';
//import useSender from './useNodeSender';

// let useSender = await import('./useNodeSender');

// function importModule(moduleName: string): Promise<object> {
//   console.log('importing ', moduleName);
//   const importedModule = import(moduleName);
//   console.log('\timported ...');
//   return importedModule;
// }

// let moduleName: string = './useNodeSender';
// let useSender = await importModule(moduleName);

// let useSender: any = null;
// if (isElectron()) {
//   useSender = require('./useNodeSender');
// } else {
//   //useSender = require('./useNodeSender');
// }

// let useSender: any;
// let moduleName: string = './useNodeSender';
// import(moduleName).then(a => {
//   useSender = a;
// });

// async function load() {
//   let obj = await import('./useNodeSender');
//   let useSender = obj.default;
//   return useSender;
// }

// let useSender: {
//   (arg0: {
//     onForwarded: (
//       webhook: AddForward_addForward_webhook,
//       forward: AddForward_addForward_webhook_forwards,
//     ) => void;
//   }): { send: any };
//   ({
//     onForwarded,
//   }: {
//     onForwarded: (
//       webhook: AddForward_addForward_webhook,
//       forward: AddForward_addForward_webhook_forwards,
//     ) => void;
//   }): { send: (url: string, webhook: Webhook) => void };
// };

// if (isElectron()) {
//   import('./useNodeSender').then(module => {
//     useSender = module.default;
//   });
// } else {
//   import('./useBrowserSender').then(module => {
//     useSender = module.default;
//   });
// }

let obj = { prop1: 123 };
let obj2: typeof obj;

let useSender: any;

if (isElectron()) {
  import('./useNodeSender').then(module => {
    useSender = module.default;
  });
} else {
  import('./useBrowserSender').then(module => {
    useSender = module.default;
  });
}

const useForwarder = (endpointId: string) => {
  const { addForwardingIds, removeForwardingId } = useForwardingIds();
  const { addForwardUrl } = useForwardUrls(endpointId);
  const { addForward } = useAddForward();

  const onForwarded = (
    webhook: AddForward_addForward_webhook,
    forward: AddForward_addForward_webhook_forwards,
  ) => {
    removeForwardingId(webhook.id);

    addForward({
      variables: {
        input: {
          webhookId: webhook.id,
          url: forward.url,
          method: forward.method,
          statusCode: forward.statusCode,
          // need to remap here b/c server rejects __typename property
          headers: forward.headers.map(kv => ({
            key: kv.key,
            value: kv.value,
          })),
          // need to remap here b/c server rejects __typename property
          query: forward.query.map(kv => ({
            key: kv.key,
            value: kv.value,
          })),
          body: forward.body,
        },
      },
      optimisticResponse: {
        addForward: {
          __typename: 'AddForwardPayload',
          webhook: {
            ...webhook,
            forwards: [forward, ...webhook.forwards],
          },
        },
      },
    });
  };

  const { send } = useSender({ onForwarded });

  const forwardWebhook = (url: string, webhooks: Webhook[]) => {
    addForwardUrl(url);
    addForwardingIds(webhooks.map(w => w.id));
    webhooks
      .sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10))
      .forEach(webhook =>
        send(appendQuery(url, webhook.query), webhook),
      );
  };

  return {
    forwardWebhook,
  };
};

export default useForwarder;
