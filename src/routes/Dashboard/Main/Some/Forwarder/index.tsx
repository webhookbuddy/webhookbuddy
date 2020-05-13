import React, { useState, useRef } from 'react';

import './style.css';

const Forwarder = ({
  forwardTo,
}: {
  forwardTo: (url: string) => void;
}) => {
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
      <input
        type="url"
        className="form-control form-control-sm"
        value={url}
        onChange={e => setUrl(e.target.value)}
        placeholder="Forward to URL (e.g. http://localhost:8000/send-webhook-here)"
        required
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
