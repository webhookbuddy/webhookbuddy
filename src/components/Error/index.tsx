import React, { ReactNode } from 'react';

const Error = ({
  error,
  children,
}: {
  error: any;
  children?: ReactNode;
}) => {
  const message =
    error.graphQLErrors?.find(() => true)?.message ?? error.message;
  return (
    <div className="alert alert-danger text-center">
      {message}
      <div>{children}</div>
    </div>
  );
};

export default Error;
