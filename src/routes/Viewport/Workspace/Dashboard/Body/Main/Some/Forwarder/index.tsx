import { FormEvent, MouseEvent, useState, useRef } from 'react';
import useForwardUrls from 'hooks/useForwardUrls';
import Autosuggest from 'components/Autosuggest';

import styles from './styles.module.css';

const Forwarder = ({
  endpointId,
  forwardTo,
}: {
  endpointId: string;
  forwardTo: (url: string) => void;
}) => {
  const { forwardUrls } = useForwardUrls(endpointId);
  const [url, setUrl] = useState<string>('');
  const buttonRef = useRef<HTMLButtonElement>(null);

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
        suggestions={forwardUrls}
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
