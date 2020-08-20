import './invite-box.sass';
import React from 'react';
import { Button } from 'react-bootstrap';

const InviteBox = () => {
  return (
    <div className='invite-box'>
      <h5 className="text-format">
        Invite new member
      </h5>
      <p className="text-format">
        Copy room url to clipboard and sent it to new member
      </p>
      <Button onClick={onClick} size='sm' className='invite-button'> Copy Url </Button>
    </div>
  );
};

const onClick = async() => {
  await navigator.clipboard.writeText(document.location.href);
};

export default InviteBox;
