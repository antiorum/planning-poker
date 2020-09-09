import './stories.sass';
import CardsOrResult from '../cards-or-result';
import Story from '../story';
import StoryHeader from '../story-header';
import { hasActiveDiscussion } from '../../util';
import { getActiveStory } from '../../util/users-util';
import React from 'react';

class Stories extends React.Component {
  state = {
    story: undefined
  };

  async componentDidMount(): void {
    const { room } = this.props;
    if (room) {
      await this.getNewStoryAndPushItToState();
    }
  }

  async componentDidUpdate(previousProperties: Readonly<P>, previousState: Readonly<S>, snapshot: SS): void {
    const { room } = this.props;
    const { story } = this.state;
    const previousRoom = previousProperties.room;
    if ((room !== previousRoom) && ((!story) ||
      (hasActiveDiscussion(room) && !hasActiveDiscussion(previousRoom)) ||
      (!hasActiveDiscussion(room) && hasActiveDiscussion(previousRoom)) ||
        this.isChangedUserMarkInCurrentStory)) {
      await this.getNewStoryAndPushItToState();
    }
  }

  isChangedUserMarkInCurrentStory = () => {
    const { story } = this.state;
    const { room, currentUserName } = this.props;
    const activeStory = getActiveStory(room);
    if (!activeStory) return false;

    if (!story.usersMarks[currentUserName] && activeStory.userMarks[currentUserName]) return true;
    return story.usersMarks[currentUserName] !== activeStory.userMarks[currentUserName];
  };

  getNewStoryAndPushItToState = async() => {
    const { room, service } = this.props;

    if (room.discussionResults.length > 0) {
      const id = room.discussionResults.sort(dr => dr.id).reverse()[0].id;
      const story = await service.getDiscussionResult(id);
      this.setState({ story });
    }
    else {
      this.setState({ story: undefined });
    }
  };

  switchStory = async(id) => {
    const { service } = this.props;
    const story = await service.getDiscussionResult(id);
    this.setState({ story });
  };

  renderStories = () => {
    const { room, service, currentUserName } = this.props;
    if (!room) return null;
    return (
      <div className='stories-body'>
        {
          room.discussionResults.sort(dr => dr.id).map((discussion) => {
            return (
              <Story key={discussion.id} id={discussion.id} service={service} theme={discussion.theme} isCompleted={discussion.isCompleted} isOwner={currentUserName === room.owner.name} room={room} onSwitch={this.switchStory} />
            ) ;
          })
        }
      </div>
    );
  };

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const { room, service } = this.props;
    const { story } = this.state;

    return (
      <React.Fragment>
        <div className="stories-and-results-wrapper">
          <StoryHeader room={room} />
          <CardsOrResult discussionResult={story} cards={room ? room.deck.cards : []} service={service} />
          <div className='stories-container'>
            <div className='stories-header'>
              <p>Stories:</p>
            </div>
            {this.renderStories()}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Stories;
