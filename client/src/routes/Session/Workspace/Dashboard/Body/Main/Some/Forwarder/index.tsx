import { FormEvent, MouseEvent, useState, useRef } from 'react';
import Autosuggest from 'components/Autosuggest';
import { useDashboardContext } from 'contexts/DashboardContext';
import { useSessionContext } from 'contexts/SessionContext';
import useSetForwardUrl from 'hooks/useSetForwardUrl';

import styles from './styles.module.css';

const Forwarder = ({
  forwardTo,
}: {
  forwardTo: (url: string) => void;
}) => {
  const { me } = useSessionContext();
  const { endpoint } = useDashboardContext();
  const [url, setUrl] = useState<string>('');
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { removeForwardUrl } = useSetForwardUrl(me, endpoint.id);

  const handlePlayClick = (e: MouseEvent<HTMLElement>) => {
    buttonRef.current?.click();
  };

  const onSubmit = (e: FormEvent<HTMLFormElement> | undefined) => {
    e?.preventDefault();
    forwardTo(url);
  };

  return (
    <form className={styles.forwarder} onSubmit={onSubmit}>
      <i
        className={`fa fa-play fa-lg pointer ${styles.icon}`}
        onClick={handlePlayClick}
      ></i>
      <Autosuggest
        type="url"
        placeholder="Forward to URL (e.g. http://localhost:8000/send-webhook-here)"
        userInput={url}
        setUserInput={setUrl}
        suggestions={endpoint?.forwardUrls[me.id] ?? []}
        deleteForwardUrl={removeForwardUrl}
      />
      <button
        type="submit"
        className="d-none"
        ref={buttonRef}
      ></button>
    </form>
  );
};

export default Forwarder;
