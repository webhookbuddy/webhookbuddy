import { Timestamp } from 'firebase/firestore';

export const toDate = (value: Date | Timestamp) =>
  value instanceof Date ? value : value.toDate();
