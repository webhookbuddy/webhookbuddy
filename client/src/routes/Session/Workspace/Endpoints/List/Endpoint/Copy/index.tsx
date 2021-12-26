import { MouseEvent, useEffect, useRef, useState } from 'react';

const Copy = ({
  url,
  iconStyle,
}: {
  url: string;
  iconStyle: string;
}) => {
  const [copied, setCopied] = useState(false);
  const mountedRef = useRef(false);
  const timerRef = useRef<number>();

  const copy = (e: MouseEvent<HTMLElement>) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      if (mountedRef.current) setCopied(false);
    }, 2000);
  };

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return copied ? (
    <i className={`fa fa-check ${iconStyle}`}></i>
  ) : (
    <i
      className={`fa fa-clipboard pointer ${iconStyle}`}
      onClick={copy}
      title="Copy to clipboard"
    ></i>
  );
};

export default Copy;
