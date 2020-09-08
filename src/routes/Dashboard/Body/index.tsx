import React, { useEffect, useRef } from 'react';
import ResizePanel from 'react-resize-panel';
import Sidebar from './Sidebar';
import Main from './Main';

import './style.css';

const Body = () => {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // flex-basis: 33.3333% first needs to be added when rendering to take up 1/3 of the space: https://css-tricks.com/flex-grow-is-weird/#flex-grow-and-flex-basis.
    // ResizePanel will use this as the default width, but then this flex-basis needs to be removed in order for ResizePanel to resize dynamically.
    // @ts-ignore
    bodyRef.current.children[0].style.flexBasis = null;
  }, []);

  return (
    <div className="body" ref={bodyRef}>
      <ResizePanel
        direction="e"
        style={{ flexGrow: 1, flexBasis: '33.3333%' }}
      >
        <Sidebar />
      </ResizePanel>
      <Main />
    </div>
  );
};

export default Body;
