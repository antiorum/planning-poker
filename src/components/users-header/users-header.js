import './users-header.sass';
import { hasActiveDiscussion, getVotedUsers } from '../../util';
import React from 'react';

const UsersHeader = ({ room }) => {
  if (room === undefined) return null;
  const isActiveDiscussion = hasActiveDiscussion(room);
  const votedUsers = getVotedUsers(room);

  let usersHeaderContent = '';
  if (isActiveDiscussion) {
    if (votedUsers.length === room.users.length) {
      usersHeaderContent = 'All users voted';
    }
    else {
      usersHeaderContent = 'Waiting for ';
      for (const user of room.users.map(u => u.name)) {
        if (!votedUsers.includes(user)) {
          usersHeaderContent += user + ', ';
        }
      }
      usersHeaderContent = usersHeaderContent.slice(0, -2);
      usersHeaderContent += ' to vote';
    }
  }
  else {
    usersHeaderContent = 'Discussion not started yet';
  }

  return (
    <div className='users-header'>{usersHeaderContent}</div>
  );
};

export default UsersHeader;
