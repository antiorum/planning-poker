import './room-sidebar.sass';
import Users from '../users';
import Reminder from '../reminder';
import UsersHeader from '../users-header';
import Invite from '../invite';
import { hasActiveDiscussion } from '../../util';
import { getActiveStoryId } from '../../util/users-util';
import UniversalWindow from '../modal-windows/universal-window';
import React from 'react';
import { Button } from 'react-bootstrap';

class RoomSidebar extends React.Component {
  startDiscussionModalText = 'Input theme of discussion';
  endDiscussionModalText = 'input resume or comments for this discussion';

  onStart = async(theme) => {
    await this.props.service.startDiscussion(this.props.room.id, theme);
  };

  onFinish = async(resume) => {
    await this.props.service.endDiscussion(this.props.room.id, resume, getActiveStoryId(this.props.room));
  };

  onRestart = async() => {
    await this.props.service.resetDiscussion(this.props.room.id, getActiveStoryId(this.props.room));
  };

  renderManagementButtons = () => {
    const { room, currentUserName } = this.props;

    if (!room || !room.owner || (currentUserName !== room.owner.name)) {
      return null;
    }
    else {
      return (
        <div className="users-buttons">
          {hasActiveDiscussion(room) && <Button variant='primary' onClick={this.onRestart} size={'sm'}>Reset Discussion</Button>}
          {hasActiveDiscussion(room) && <UniversalWindow title='End Discussion' onSubmit={this.onFinish} buttonText='Finish' modalText={this.endDiscussionModalText} />}
          {!hasActiveDiscussion(room) && <UniversalWindow title='Start Discussion' onSubmit={this.onStart} buttonText='Start' modalText={this.startDiscussionModalText} />}
        </div>
      );
    }
  };

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <div className="users-container">
        <div className="members">
          <UsersHeader room={this.props.room} />
          <Reminder room={this.props.room} />
          <Users room={this.props.room} />
          {this.renderManagementButtons()}
        </div>
        <Invite />
      </div>
    );
  }
}

export default RoomSidebar;
