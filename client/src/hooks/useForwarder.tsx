import { appendQuery } from 'utils/http-fragment';
import isElectron from 'is-electron';
import useSetForwardUrl from './useSetForwardUrl';
import { useCallback } from 'react';
import { User } from 'types/User';
import { Webhook } from 'types/Webhook';
import { Forward } from 'types/Forward';
import useSetDocument from './useSetDocument';
import { arrayUnion } from 'firebase/firestore';
import { useSessionContext } from 'contexts/SessionContext';
import { Endpoint } from 'types/Endpoint';

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

const useForwarder = (me: User, endpointId: string) => {
  const { setForwardingIds } = useSessionContext();
  const { addForwardUrl } = useSetForwardUrl(me, endpointId);
  const { setDocument } = useSetDocument(
    `endpoints/${endpointId}/webhooks`,
  );

  const onForwarded = useCallback(
    (webhook: Webhook, forward: Forward) => {
      setForwardingIds(prev => prev.filter(id => id !== webhook.id));

      setDocument(webhook.id, {
        forwards: arrayUnion(forward),
      });
    },
    [setForwardingIds, setDocument],
  );

  const { send } = useSender({ me, onForwarded });

  const forwardWebhook = useCallback(
    (url: string, endpoint: Endpoint, webhooks: Webhook[]) => {
      setForwardingIds(prev => prev.concat(webhooks.map(w => w.id)));
      webhooks
        .sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10))
        .forEach(webhook =>
          send(appendQuery(url, webhook.query), webhook),
        );

      if (!endpoint.forwardUrls[me.id].some(u => u === url))
        addForwardUrl(url);
    },
    [me.id, addForwardUrl, setForwardingIds, send],
  );

  return {
    forwardWebhook,
  };
};

export default useForwarder;
