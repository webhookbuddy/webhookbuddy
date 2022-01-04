import type { GetServerSideProps } from 'next';
import { db, functionsUrl } from '@config/firebase';

export const getServerSideProps: GetServerSideProps = async ({
  query,
}) => {
  const { email, hash } = query;

  const response = await fetch(
    `${functionsUrl}/verifySignature?type=unsubscribe&email=${encodeURIComponent(
      `${email}`,
    )}&hash=${hash}`,
  );

  const data = await response.json();

  if (!data.isValid)
    return {
      props: {
        isValid: false,
      },
    };

  // TODO:
  // So bizarre. This works b/c this user was loaded via import in Firestore's emulator :
  console.log(
    'old user',
    (await db.doc('users/bVbMADRY1CjxuDBRhROUz7MMIKcK').get()).exists,
  );
  // If I add a user via Emulator Console, the following returns !exists. Once I persist emulator state to disk (via npm run save)
  // and load it from the saved state via import, then exists will be true
  console.log(
    'new user',
    (await db.doc('users/newuser').get()).exists,
  );
  // Likewise, the function below always returns !exists:
  const unsubscribe = await db.doc(`unsubscribes/${email}`).get();

  return {
    props: {
      email,
      unsubscribed: unsubscribe.exists,
      isValid: true,
    },
  };
};

const Unsubscribe = ({
  isValid,
  email,
  unsubscribed,
}: {
  isValid: boolean;
  email?: string;
  unsubscribed?: boolean;
}) => {
  console.log('unsubscribed', unsubscribed);
  return !isValid ? (
    <div>Page expired!</div>
  ) : (
    <div>
      {email} {unsubscribed ? 'unsubscribed' : 'subscribed'}
    </div>
  );
};

export default Unsubscribe;
