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
    const { service, room } = this.props;
    await service.startDiscussion(room.id, theme);
  };

  onFinish = async(resume) => {
    const { service, room } = this.props;
    await service.endDiscussion(room.id, resume, getActiveStoryId(this.props.room));
  };

  onRestart = async() => {
    const { service, room } = this.props;
    await service.resetDiscussion(room.id, getActiveStoryId(this.props.room));
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
    const { room } = this.props;

    return (
      <div className="users-container">
        <div className="members">
          <UsersHeader room={room} />
          <Reminder room={room} />
          <Users room={room} />
          {this.renderManagementButtons()}
        </div>
        <Invite />
      </div>
    );
  }
}

export default RoomSidebar;
