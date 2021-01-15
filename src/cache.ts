import { makeVar } from '@apollo/client';

export const isLoggedInVar = makeVar<boolean>(
  !!localStorage.getItem('x-token'),
);

export const forwardingIdsVar = makeVar<string[]>([]);
