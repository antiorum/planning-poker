import './story.sass';
import React from 'react';
import { Button } from 'react-bootstrap';

const Story = ({ id, theme, isCompleted, isOwner, service, room, onSwitch }) => {

  const onDelete = async() => {
    await service.deleteDiscussionResult(room.id, id);
  };

  const onEdit = async() => {
    let newName = prompt('Введите новое название для этого обсуждения');
    await service.renameDiscussionResult(room.id, id, newName);
  };

  let classes = 'stories-item';
  if (!isCompleted) {
    classes += ' stories-active-story';
  }

  return (
    <div className={classes}>
      <div className='stories-item-name' onClick={() => onSwitch(id)}>
        <p>
          {theme}
        </p>
      </div>
      {isCompleted && isOwner && <div className='stories-item-buttons'>
        <Button className='stories-button' size='sm' onClick={onEdit}>🖉</Button>
        <Button variant='danger' className='stories-button' size='sm' onClick={onDelete}>🗑</Button>
      </div>}
    </div>
  );
};

export default Story;
