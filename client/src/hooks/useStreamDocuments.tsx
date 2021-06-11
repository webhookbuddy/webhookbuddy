import { useState } from 'react';
import { db } from 'config/firebase';
import {
  FieldPath,
  WhereFilterOp,
  OrderByDirection,
  Query,
  CollectionReference,
  DocumentData,
  collection as collectionPath,
  collectionGroup,
  query as collectionQuery,
  where as collectionWhere,
  orderBy as collectionOrderBy,
  limit as collectionLimit,
  onSnapshot,
} from 'firebase/firestore';
import useDeepCompareEffect from 'use-deep-compare-effect';

export interface CollectionFilter {
  fieldPath: string | FieldPath;
  opStr: WhereFilterOp;
  value: any;
}

function useStreamDocuments<T extends { id: string }>(
  collection: string,
  wheres?: CollectionFilter[] | undefined,
  orderBy?:
    | {
        fieldPath: string;
        direction: OrderByDirection;
      }
    | undefined,
  limit?: number | undefined,
  asCollectionGroup: boolean = false,
) {
  const [state, setState] = useState<{
    loading: boolean;
    error: string | undefined;
    documents: T[] | undefined;
  }>({ loading: true, error: undefined, documents: undefined });

  useDeepCompareEffect(() => {
    setState(prev => ({ ...prev, loading: true, error: undefined }));
    let unsubscribed = false;
    const collectionRef:
      | Query<DocumentData>
      | CollectionReference<DocumentData> = asCollectionGroup
      ? collectionGroup(db, collection)
      : collectionPath(db, collection);

    let query = collectionQuery(collectionRef);
    for (const where of wheres ?? [])
      query = collectionQuery(
        query,
        collectionWhere(where.fieldPath, where.opStr, where.value),
      );

    if (orderBy)
      query = collectionQuery(
        query,
        collectionOrderBy(orderBy.fieldPath, orderBy.direction),
      );

    if (limit) query = collectionQuery(query, collectionLimit(limit));

    const unsubscribe = onSnapshot(
      query,
      snap => {
        if (unsubscribed) return;
        setState(prev => ({
          ...prev,
          error: undefined,
          loading: false,
          documents: snap.docs.map(
            doc =>
              ({
                ...doc.data(),
                id: doc.id,
              } as T),
          ),
        }));
      },
      error => {
        if (unsubscribed) return;
        setState(prev => ({
          ...prev,
          error: error.message,
          loading: false,
        }));
      },
    );

    return () => {
      unsubscribe();
      unsubscribed = true;
    };
  }, [
    collection,
    asCollectionGroup,
    wheres,
    limit,
    orderBy,
    setState,
  ]);

  return {
    documents: state.documents,
    error: state.error,
    loading: state.loading,
  };
}

export default useStreamDocuments;
