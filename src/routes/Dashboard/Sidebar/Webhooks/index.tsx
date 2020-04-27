import React from 'react';
import Item from './Item';

const Webhooks = () => {
  return (
    <div className="webhooks" style={{ height: '1500px' }}>
      <Item
        key="1"
        label="Apr 12, 16:43 Stripe invoice.created"
        isActive={false}
        isUnread={true}
        forwardSuccessCount={0}
        forwardErrorCount={0}
      />
      <Item
        key="2"
        label="Apr 12, 16:43 Stripe invoice.created"
        isActive={false}
        isUnread={true}
        forwardSuccessCount={0}
        forwardErrorCount={0}
      />
      <Item
        key="3"
        label="Apr 12, 16:43 Stripe invoice.created"
        isActive={true}
        isUnread={false}
        forwardSuccessCount={1}
        forwardErrorCount={3}
      />
      <Item
        key="4"
        label="Apr 12, 16:43 Stripe invoice.created"
        isActive={false}
        isUnread={false}
        forwardSuccessCount={1}
        forwardErrorCount={0}
      />
      <Item
        key="5"
        label="Apr 12, 16:43 Stripe invoice.created Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        isActive={false}
        isUnread={false}
        forwardSuccessCount={20}
        forwardErrorCount={15}
      />
      <Item
        key="6"
        label="Apr 12, 16:43 Stripe invoice.created"
        isActive={false}
        isUnread={false}
        forwardSuccessCount={1}
        forwardErrorCount={3}
      />
    </div>
  );
};

export default Webhooks;
