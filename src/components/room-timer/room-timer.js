import './room-timer.sass';
import { hasActiveDiscussion } from '../../util';
import ChangeTimer from '../modal-windows/change-timer';
import React from 'react';

const RoomTimer = ({ room, currentUserName, service }) => {
  if (room == undefined) return null;

  return (
    <div className='room-timer'>
      {room.timerDuration && <p>Timer in this room set on value: {room.timerDuration}</p>}
      {!room.timerDuration && 'This room does not have timer'}
      {!hasActiveDiscussion(room) && (room.owner.name === currentUserName) && <ChangeTimer roomId={room.id} service={service} />}
    </div>
  );
};

export default RoomTimer;
