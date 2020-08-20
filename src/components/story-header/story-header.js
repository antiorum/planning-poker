import './story-header.sass';
import { hasActiveDiscussion } from '../../util';
import React from 'react';

const StoryHeader = ({ room }) => {
  let headerContent;

  if (hasActiveDiscussion(room)) {
    for (let story of room.discussionResults) {
      if (!story.isCompleted) {
        headerContent = 'Active discussion: ' + story.theme;
      }
    }
  }
  else {
    headerContent = 'No active discussion';
  }

  return (
    <div className="story-header">
      <p>
        {headerContent}
      </p>
    </div>
  );
};

export default StoryHeader;
