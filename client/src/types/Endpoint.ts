import { Timestamp } from 'firebase/firestore';

export interface Endpoint {
  id: string;
  createdAt: Timestamp;
  name: string;
  referenceId: string;
  users: Record<string, EndpointUser>;
  forwardUrls: Record<string, string[] | undefined>;
}

export interface EndpointUser {
  exists: boolean;
  role: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
