import './room-timer.sass';
import { hasActiveDiscussion } from '../../util';
import ChangeTimerModal from '../change-timer-modal';
import React from 'react';

const RoomTimer = ({ room, currentUserName, service }) => {
  if (room == undefined) return null;

  const renderChangeTimerButton = () => {
    if (room.owner.name === currentUserName && !hasActiveDiscussion(room)) {
      return (
        <ChangeTimerModal roomId={room.id} service={service} />
      );
    }
    else {
      return null;
    }
  };

  if (room.timerDuration != null) {
    return (
      <div className='room-timer'>
        <p>Timer in this room set on value: {room.timerDuration}</p>
        {renderChangeTimerButton()}
      </div>
    );
  }
  else {
    return (<div className='room-timer'>
      This room does not have timer
      {renderChangeTimerButton()}
    </div>);
  }
};

export default RoomTimer;
