import React, { useRef } from 'react';
import Filter from './Filter';
import Webhooks from './Webhooks';

import './style.css';

const Sidebar = () => {
  const viewPort = useRef<HTMLDivElement>(null);
  const scrollElement = useRef<HTMLDivElement>(null);

  const ensureVisible = (element: HTMLElement) => {
    if (!viewPort.current) return;
    if (!scrollElement.current) return;
    if (element.offsetHeight > scrollElement.current.offsetHeight)
      return;

    if (element.offsetTop < scrollElement.current.scrollTop) {
      scrollElement.current.scrollTop = element.offsetTop;
      return;
    }

    const offset = 55; // TODO: hack...need to override offset in order for visibility calculation to work correctly

    if (
      element.offsetTop +
        element.offsetHeight -
        scrollElement.current.scrollTop >
      viewPort.current.offsetHeight - offset
    )
      scrollElement.current.scrollTop =
        element.offsetTop +
        element.offsetHeight -
        (viewPort.current.offsetHeight - offset);
  };

  return (
    <div className="sidebar" ref={viewPort}>
      <Filter />
      <div className="sidebar__content" ref={scrollElement}>
        <Webhooks ensureVisible={ensureVisible} />
      </div>
    </div>
  );
};

export default Sidebar;
