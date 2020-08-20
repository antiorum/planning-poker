import UserInRoom from '../user-in-room';
import Reminder from '../reminder';
import UsersHeader from '../users-header';
import InviteBox from '../invite-box';
import { hasActiveDiscussion } from '../../util';
import { getActiveStoryId } from '../../util/users-util';
import React from 'react';
import { Button } from 'react-bootstrap';
import './users-container.sass';


class UsersContainer extends React.Component {
  onStart = async() => {
    const theme = prompt('Input discussion theme');
    await this.props.service.startDiscussion(this.props.room.id, theme);
  };

  onFinish = async() => {
    const resume = prompt('Input resume or comments');
    await this.props.service.endDiscussion(this.props.room.id, resume, getActiveStoryId(this.props.room));
  };

  onRestart = async() => {
    await this.props.service.resetDiscussion(this.props.room.id, getActiveStoryId(this.props.room));
  };


  renderUsers = () => {
    try {
      return (
        <div className="users-list">
          {
            this.props.room.users.map((user) => {
              return (
                <UserInRoom key={user.id} username={user.name} room={this.props.room} />
              );
            })
          }
        </div>
      );
    }
    catch {
      return null;
    }
  };

  renderManagementButtons = () => {
    try {
      if (this.props.currentUserName !== this.props.room.owner.name) {
        return null;
      }
      else {
        if (!hasActiveDiscussion(this.props.room)) {
          return (
            <div className="users-buttons">
              <Button variant='primary' onClick={this.onStart}>Start</Button>
            </div>
          );
        }
        else {
          return (
            <div className="users-buttons">
              <Button variant='primary' onClick={this.onRestart}>Reset Discussion</Button>
              <Button variant='primary' onClick={this.onFinish}>Finish</Button>
            </div>
          );
        }
      }
    }
    catch (error) {
      console.log(error);
      return null;
    }
  };

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <div className="users-container">
        <div className="members">
          <UsersHeader room={this.props.room} />
          <Reminder room={this.props.room} />
          {this.renderUsers()}
          {this.renderManagementButtons()}
        </div>
        <InviteBox />
      </div>
    );
  }
}

export default UsersContainer;
