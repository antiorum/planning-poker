import './users-header.sass';
import { hasActiveDiscussion, getVotedUsers } from '../../util';
import { connect } from 'react-redux';
import React from 'react';

const UsersHeader = ({ headerContent }) => {
  return (
    <div className='users-header'>{headerContent}</div>
  );
};

const mapStateToProperties = ({ currentUserName, currentRoom }) => {
  return { currentUserName, currentRoom, headerContent: getHeaderContent(currentRoom) };
};

const getHeaderContent = (room) => {
  if (room === undefined || room.errors) return null;
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
  return usersHeaderContent;
};

export default connect(mapStateToProperties)(UsersHeader);
