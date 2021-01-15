import { useReactiveVar } from '@apollo/client';
import { forwardingIdsVar } from 'cache';

const useForwardingIds = (): {
  forwardingIds: string[];
  addForwardingIds: (ids: string[]) => void;
  removeForwardingId: (id: string) => void;
} => {
  const forwardingIds = useReactiveVar(forwardingIdsVar);

  const addForwardingIds = (ids: string[]) =>
    forwardingIdsVar(forwardingIdsVar().concat(ids));

  const removeForwardingId = (id: string) =>
    forwardingIdsVar(
      forwardingIdsVar().filter(forwardingId => forwardingId !== id),
    );

  return {
    forwardingIds,
    addForwardingIds,
    removeForwardingId,
  };
};

export default useForwardingIds;
