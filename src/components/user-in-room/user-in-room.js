import './user-in-room.sass';
import { getVotedUsers } from '../../util';
import img from './img/verified.png';
import React from 'react';

class UserInRoom extends React.Component {
  state = {
    votedUsers: []
  };

  componentDidMount(): void {
    this.setState(
      { votedUsers: getVotedUsers(this.props.room) }
    );
  }

  componentDidUpdate(previousProperties: Readonly<P>, previousState: Readonly<S>, snapshot: SS): void {
    if (previousProperties.room !== this.props.room) {
      this.setState(
        { votedUsers: getVotedUsers(this.props.room) }
      );
    }
  }

  renderVotedImg = (username) => {
    if (this.state.votedUsers.includes(username)) return (
      <img src={img} alt="user-voted" height='30' width='30' />
    );
    else return null;
  };

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    console.log(this.props.room);
    console.log(this.state);

    if (this.usersVoted === []) {
      return (
        <div className="user-in-room">
          <div className="user-in-room">
            <p>{this.props.username}</p>
          </div>
        </div>
      );
    }

    else {
      return (
        <div className="user-in-room">
          <div className="user-name">
            <p>{this.props.username}</p>
          </div>
          {this.renderVotedImg(this.props.username)}
        </div>
      );
    }
  }
}

export default UserInRoom;
