import Jumbotron from 'components/Jumbotron';
import { useEffect, useState } from 'react';
import { auth } from 'config/firebase';
import { reload, getIdToken } from 'firebase/auth';
import { toast } from 'react-toastify';

const EmailVerification = ({
  email,
  resetAuthState,
  resendVerification,
  logOut,
}: {
  email: string | null | undefined;
  resetAuthState: () => void;
  resendVerification: (
    onSuccess?: () => void,
    onError?: (message: string) => void,
  ) => void;
  logOut: () => void;
}) => {
  const [state, setState] = useState<{
    sending: boolean;
  }>({ sending: false });

  useEffect(() => {
    // Sadly we need to poll for emailVerified change
    const timer = window.setInterval(() => {
      if (!auth.currentUser) return;

      reload(auth.currentUser).then(() => {
        if (!auth.currentUser?.emailVerified) return;

        // It's not enough to reload the user.
        // We need to refresh the token that's sent to Firestore: https://stackoverflow.com/a/68043785/188740
        getIdToken(auth.currentUser, true).then(() => {
          resetAuthState();
        });
      });
    }, 4000);

    return () => window.clearInterval(timer);
  }, [resetAuthState]);

  const onResendclick = () => {
    setState(prev => ({ ...prev, sending: true }));
    resendVerification(
      () => {
        setState(prev => ({ ...prev, sending: false }));
        toast.info('A fresh verification email was sent.');
      },
      (message: string) => {
        setState(prev => ({ ...prev, sending: false }));
        return toast.error(message);
      },
    );
  };

  return (
    <div className="super-center">
      <Jumbotron>
        <div className="text-center">
          <h2>Verify Email</h2>
          {email ? (
            <>
              <p>
                An email was sent to <strong>{email}</strong> with a
                link to verify your email.
              </p>

              <p>Didn't get it?</p>

              <button
                className="btn btn-primary"
                onClick={onResendclick}
                disabled={state.sending}
              >
                Resend verification email
              </button>
              <button
                className="btn btn-secondary ml-3"
                onClick={logOut}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <p>
                Email is missing from your account. Please log out and
                create another.
              </p>
              <button className="btn btn-primary" onClick={logOut}>
                Log out
              </button>
            </>
          )}
        </div>
      </Jumbotron>
    </div>
  );
};

export default EmailVerification;
