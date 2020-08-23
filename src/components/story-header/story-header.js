import './story-header.sass';
import { getActiveStory } from '../../util/users-util';
import React from 'react';

const StoryHeader = ({ room }) => {
  const activeStory = getActiveStory(room);
  const headerContent = activeStory ? 'Active story: ' + activeStory.theme : 'No active story';

  return (
    <div className="story-header">
      <p>
        {headerContent}
      </p>
    </div>
  );
};

export default StoryHeader;
