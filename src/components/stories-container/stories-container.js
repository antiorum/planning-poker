import './stories-container.sass';
import CardsOrResult from '../cards-or-result';
import StoryInContainer from '../story-in-container';
import StoryHeader from '../story-header';
import React from 'react';

class StoriesContainer extends React.Component {
  state = {
    story: undefined
  };

  async componentDidMount(): void {
    if (this.props.room) {
      await this.getNewStoryAndPushItToState();
    }
  }

  async componentDidUpdate(previousProperties: Readonly<P>, previousState: Readonly<S>, snapshot: SS): void {
    if (previousProperties.room !== this.props.room) {
      await this.getNewStoryAndPushItToState();
    }
  }

  getNewStoryAndPushItToState = async() => {
    if (this.props.room.discussionResults.length > 0) {
      const id = this.props.room.discussionResults.sort(dr => dr.id).reverse()[0].id;
      const story = await this.props.service.getDiscussionResult(id);
      this.setState({ story });
    }
    else {
      this.setState({ story: undefined });
    }
  };

  switchStory = async(id) => {
    const story = await this.props.service.getDiscussionResult(id);
    this.setState({ story });
  };

  renderStories = () => {
    try {
      return (
        <div className='stories-body'>
          {
            this.props.room.discussionResults.sort(dr => dr.id).map((discussion) => {
              return (
                <StoryInContainer key={discussion.id} id={discussion.id} service={this.props.service} theme={discussion.theme} isCompleted={discussion.isCompleted} isOwner={this.props.currentUserName === this.props.room.owner.name} room={this.props.room} onSwitch={this.switchStory} />
              ) ;
            })
          }
        </div>
      );
    }
    catch {
      return null;
    }
  };

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <React.Fragment>
        <div className="stories-and-results-wrapper">
          <StoryHeader room={this.props.room} />
          <CardsOrResult discussionResult={this.state.story} cards={this.props.room ? this.props.room.deck.cards : []} service={this.props.service} />
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

export default StoriesContainer;
