import './story-in-container.sass';
import React from 'react';
import { Button } from 'react-bootstrap';

const StoryInContainer = ({ id, theme, isCompleted, isOwner, service, room, onSwitch }) => {

  const onDelete = async() => {
    await service.deleteDiscussionResult(room.id, id);
  };

  const onEdit = async() => {
    let newName = prompt('Введите новое название для этого обсуждения');
    await service.renameDiscussionResult(room.id, id, newName);
  };

  const buttons = isOwner ?
    <div className='stories-item-buttons'>
      <Button variant='info' className='stories-button' size='sm' onClick={onEdit}>🖉</Button>
      <Button variant='danger' className='stories-button' size='sm' onClick={onDelete}>🗑</Button>
    </div> :
    null;

  if (isCompleted) {
    return (
      <div className='stories-item'>
        <div className='stories-item-name' onClick={() => onSwitch(id)}>
          <p>
            {theme}
          </p>
        </div>
        {buttons}
      </div>
    );
  }
  else {
    return (
      <div className="stories-item stories-active-story">
        <div className='stories-item-name' onClick={() => onSwitch(id)}>
          <p>
            {theme}
          </p>
        </div>
      </div>
    );
  }
};

export default StoryInContainer;
