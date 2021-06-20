import { Timestamp } from 'firebase/firestore';

export interface Forward {
  id: string;
  userId: string;
  user: ForwardUser;
  createdAt: Timestamp | Date; // Value is browser date when adding and server Timestamp once persisted
  url: string;
  method: string;
  statusCode: number;
  success: boolean;
  contentType: string | null;
  headers: Record<string, string>;
  query: Record<string, string>;
  body: string | null;
}

interface ForwardUser {
  id: string;
  firstName: string | null;
  lastName: string | null;
}
