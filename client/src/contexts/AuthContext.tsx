import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth, db } from 'config/firebase';
import {
  signInWithEmailAndPassword,
  signOut as signOutAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { User } from 'types/User';
import { doc, onSnapshot } from 'firebase/firestore';

interface AuthResponse {
  code: string;
  message: string;
}

interface FirebaseUser {
  uid: string;
  email: string | null;
  emailVerified: boolean;
}

const AuthContext =
  createContext<
    | {
        me: User | null | undefined;
        resetAuthState: () => void;
        signIn: (
          email: string,
          password: string,
        ) => Promise<AuthResponse | null>;
        signOut: () => Promise<AuthResponse | null>;
        verifyEmail: () => Promise<AuthResponse | null>;
        resetPassword: (
          email: string,
        ) => Promise<AuthResponse | null>;
      }
    | undefined
  >(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [firebaseUser, setFirebaseUser] =
    useState<FirebaseUser | null | undefined>(undefined);

  const [authCounter, setAuthCounter] = useState(0);

  const [user, setUser] =
    useState<
      | {
          firstName: string | null;
          lastName: string | null;
        }
      | null
      | undefined
    >(undefined);

  const [authUser, setAuthUser] =
    useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      // Use our own FirebaseUser object as Firebase returns the same user instance if we simply unsubscribe and resubscribe to onAuthStateChanged,
      // even if emailVerified has changed.
      if (!user) setFirebaseUser(user);
      else
        setFirebaseUser({
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
        });
    });

    return () => unsubscribe();
  }, [setFirebaseUser, authCounter]);

  useEffect(() => {
    if (!firebaseUser) {
      setUser(firebaseUser);
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, 'users', firebaseUser.uid),
      snap => {
        if (snap.exists()) setUser({ ...snap.data() } as User);
        else setUser(null);
      },
    );

    return () => unsubscribe();
  }, [firebaseUser, setUser]);

  useEffect(() => {
    if (!firebaseUser) {
      setAuthUser(firebaseUser);
      return;
    }

    setAuthUser({
      id: firebaseUser.uid,
      email: firebaseUser.email,
      emailVerified: firebaseUser.emailVerified,
      firstName: user?.firstName ?? null,
      lastName: user?.lastName ?? null,
    });
  }, [firebaseUser, user]);

  const resetAuthState = useCallback(() => {
    setAuthCounter(prev => prev + 1);
  }, [setAuthCounter]);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return null;
    } catch (error) {
      return error as AuthResponse;
    }
  };

  const signOut = async () => {
    try {
      await signOutAuth(auth);
      return null;
    } catch (error) {
      return error as AuthResponse;
    }
  };

  const verifyEmail = async () => {
    try {
      if (!auth.currentUser) throw new Error('currentUser missing.');

      if (firebaseUser) await sendEmailVerification(auth.currentUser);
      return null;
    } catch (error) {
      return error as AuthResponse;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return null;
    } catch (error) {
      return error as AuthResponse;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        me: authUser,
        resetAuthState,
        signIn,
        signOut,
        verifyEmail,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error(
      'useAuthContext must be used within an AuthProvider',
    );

  return context;
};

export { AuthProvider, useAuthContext };
