import Jumbotron from 'components/Jumbotron';
import { useEffect, useState } from 'react';
import { auth } from 'config/firebase';
import { reload, getIdToken } from 'firebase/auth';

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
    error: string | undefined;
    sending: boolean;
    sent: boolean;
  }>({ error: undefined, sending: false, sent: false });

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
    }, 2000);

    return () => window.clearInterval(timer);
  }, [resetAuthState]);

  const onResendclick = () => {
    setState({ error: undefined, sending: true, sent: false });
    resendVerification(
      () =>
        setState({ error: undefined, sending: false, sent: true }),
      (message: string) =>
        setState({ error: message, sending: false, sent: false }),
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
              {state.error ? (
                <div className="alert alert-danger">
                  {state.error}
                </div>
              ) : state.sent ? (
                <div className="alert alert-info">
                  A fresh email was sent. Still didn't get it?
                </div>
              ) : (
                <p>Didn't get it?</p>
              )}

              <button
                className="btn btn-primary"
                onClick={onResendclick}
                disabled={state.sending}
              >
                Resend verification email
              </button>
              <button
                className="btn btn-primary ml-3"
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
