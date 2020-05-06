/*
Copied this from `react-apollo` to get `MutationFunctionOptions` for type referencing in useMutation
*/

import {
  PureQueryOptions,
  OperationVariables,
  MutationUpdaterFn,
  WatchQueryFetchPolicy,
} from 'apollo-client';

export declare type Context = Record<string, any>;
export declare type RefetchQueriesFunction = (
  ...args: any[]
) => Array<string | PureQueryOptions>;

export interface MutationFunctionOptions<
  TData = any,
  TVariables = OperationVariables
> {
  variables?: TVariables;
  optimisticResponse?: TData | ((vars: TVariables | {}) => TData);
  refetchQueries?:
    | Array<string | PureQueryOptions>
    | RefetchQueriesFunction;
  awaitRefetchQueries?: boolean;
  update?: MutationUpdaterFn<TData>;
  context?: Context;
  fetchPolicy?: WatchQueryFetchPolicy;
}

/*
======================================================================================================
*/

export type User = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  email: string;
};
