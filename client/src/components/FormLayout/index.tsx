import { ReactNode } from 'react';
import Error from 'components/Error';

import styles from './styles.module.css';

export enum FormAlignment {
  CenterX,
  CenterXY,
}

const FormLayout = ({
  children,
  alignment,
  loading,
  error,
}: {
  children: ReactNode;
  alignment: FormAlignment;
  loading: boolean;
  error: string | undefined;
}) => {
  return (
    <div
      className={
        alignment === FormAlignment.CenterXY ? 'super-center' : ''
      }
    >
      <div
        className={`${styles.form} ${
          alignment === FormAlignment.CenterX ? 'mx-auto' : ''
        }`}
      >
        <div
          className={`${styles.overlay} ${loading ? '' : 'd-none'}`}
        />
        {error && <Error message={error} />}
        {children}
      </div>
    </div>
  );
};

export default FormLayout;
