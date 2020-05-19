import React, { useState, useRef } from 'react';
import useForwardUrls from 'hooks/useForwardUrls';
import Autosuggest from 'components/Autosuggest';

import './style.css';

const Forwarder = ({
  forwardTo,
}: {
  forwardTo: (url: string) => void;
}) => {
  const { forwardUrls } = useForwardUrls();
  const [url, setUrl] = useState<string>('');
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handlePlayClick = (e: React.MouseEvent<HTMLElement>) => {
    buttonRef.current?.click();
  };

  const onSubmit = (
    e: React.FormEvent<HTMLFormElement> | undefined,
  ) => {
    e?.preventDefault();
    forwardTo(url);
  };

  return (
    <form className="forwarder" onSubmit={onSubmit}>
      <i
        className="forwarder__icon fa fa-play fa-lg pointer"
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
