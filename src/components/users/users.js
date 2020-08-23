import User from '../user';
import React from 'react';

const Users = ({ room }) => {
  if (!room || !room.users) {
    return null;
  }

  return (
    <div className="users-list">
      {
        room.users.map((user) => {
          return (
            <User key={user.id} username={user.name} room={room} />
          );
        })
      }
    </div>
  );
};

export default Users;
