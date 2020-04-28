import React from 'react';
import Forward from './Forward';

import './style.css';

const History = () => {
  return (
    <div className="main_body__history">
      <div className="forwards">
        <div className="forwards__title">Forwards</div>
        <div className="forwards__list">
          <Forward
            key="1"
            label="Apr 12, 17:43 http://localhost:3000/events/foo/bar"
            isSuccess={true}
          />
          <Forward
            key="2"
            label="Apr 12, 17:43 http://localhost:3000/events/foo/bar"
            isSuccess={true}
          />
          <Forward
            key="3"
            label="Apr 12, 17:43 http://localhost:3000/events/foo/bar"
            isSuccess={true}
          />
          <Forward
            key="4"
            label="Apr 12, 17:43 http://localhost:3000/events/foo/bar"
            isSuccess={false}
          />
        </div>
      </div>
    </div>
  );
};

export default History;
