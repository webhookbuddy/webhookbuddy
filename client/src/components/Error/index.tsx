import { ReactNode } from 'react';

const Error = ({
  message,
  children,
}: {
  message: any;
  children?: ReactNode;
}) => {
  return (
    <div className="alert alert-danger text-center">
      {message}
      <div>{children}</div>
    </div>
  );
};

export default Error;
