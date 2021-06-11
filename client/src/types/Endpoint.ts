import { Timestamp } from 'firebase/firestore';

export interface Endpoint {
  id: string;
  createdAt: Timestamp;
  name: string;
  referenceId: string;
  roles: Record<string, string | undefined>;
  forwardUrls: Record<string, string[] | undefined>;
}
