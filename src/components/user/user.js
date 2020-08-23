import './user.sass';
import { getVotedUsers } from '../../util';
import img from './img/verified.png';
import React from 'react';

const User = ({ room, username }) => {
  return (
    <div className="user-in-room">
      <div className="user-name">
        <p>{username}</p>
      </div>
      {isVoted(username, room) && <img src={img} alt="user-voted" height='30' width='30' />}
    </div>
  );
};

const isVoted = (username, room) => {
  if (!room || !username) return false;
  const votedUsers = getVotedUsers(room);
  return votedUsers.includes(username);
};

export default User;
