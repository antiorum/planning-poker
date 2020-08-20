const hasActiveDiscussion = (room) => {
  let result = false;
  if (room !== undefined) {
    for (let discussion of room.discussionResults) {
      if (!discussion.isCompleted) result = true;
    }
  }
  return result;
};

const getVotedUsers = (room) => {
  let usersVoted = [];
  if (room !== undefined) {
    for (let discussion of room.discussionResults) {
      if (!discussion.isCompleted) usersVoted = Object.keys(discussion.usersMarks) ;
    }
  }
  return usersVoted;
};

const getActiveStoryId = (room) => {
  let result = -1;
  for (let discussion of room.discussionResults) {
    if (!discussion.isCompleted) result = discussion.id;
  }
  return result;
};

const getActiveStory = (room) => {
  let result;
  for (let discussion of room.discussionResults) {
    if (!discussion.isCompleted) result = discussion;
  }
  return result;
};

export { getVotedUsers, hasActiveDiscussion, getActiveStoryId, getActiveStory };
