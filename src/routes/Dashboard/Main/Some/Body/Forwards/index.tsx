import React from 'react';
import Forward from './Forward';
import { Webhook } from 'schema/types';

import './style.css';

const Forwards = ({ webhook }: { webhook: Webhook }) => {
  return (
    <div className="main_body__forwards">
      <div className="forwards">
        <div className="forwards__list">
          {webhook.forwards.map(forward => (
            <Forward key={forward.id} forward={forward} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Forwards;
