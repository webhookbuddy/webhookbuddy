import React from 'react';

import './style.css';

const Loading = () => {
  return (
    <div className="webhooks__loading">
      <i className="fa fa-circle-o-notch fa-spin fa-fw webhooks__loading__icon"></i>
    </div>
  );
};

export default Loading;
