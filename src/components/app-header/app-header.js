import './app-header.sass';
import withService from '../hoc/with-service';
import { compose } from '../../util';
import { getFetchUserName, getFetchDecks } from '../../actions';
import LoginModal from '../modal-windows/login';
import user from './img/user.png';
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class AppHeader extends React.Component {
  async componentDidMount(): void {
    await this.props.fetchUserName();
    await this.props.fetchDecks();
  }

  onLogout = async() => {
    if (this.props.currentRoom) {
      await this.props.service.exitRoom(this.props.currentRoom.id);
    }
    await this.props.service.logout();
    await this.props.fetchDecks();
    this.props.history.push('/');
    await this.props.fetchUserName();
  };

  render() {
    const userInHeader = this.props.currentUserName === '' ?
      (<div className="app-header-user">
        <p>You are not logged in yet</p>
        <LoginModal />
      </div>) :
      (<div className="app-header-user">
        <p>You logged in as: {this.props.currentUserName}</p>
        <img src={user} alt="user" height={35} />
        <Button variant={'danger'} onClick={this.onLogout} size={'sm'} className={'header-button'}>Logout</Button>
      </div>);

    const roomInHeader = this.props.currentRoom === undefined ?
      null : this.props.currentRoom.name;


    return (
      <div className='app-header'>
        <div className="app-header-room">
          <p>
            {roomInHeader}
          </p>
        </div>
        {userInHeader}
      </div>
    );
  }
}

const mapStateToProperties = ({ currentUserName, currentRoom, signalRConnection }) => {
  return { currentUserName, currentRoom, signalRConnection };
};

const mapDispatchToProperties = (dispatch, { service }) => {
  return {
    fetchUserName: getFetchUserName(service, dispatch),
    fetchDecks: getFetchDecks(service, dispatch),
  };
};

export default compose(
  withService(),
  connect(mapStateToProperties, mapDispatchToProperties)
)(withRouter(AppHeader));
