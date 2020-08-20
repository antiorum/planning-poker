import './app-header.sass';
import withService from '../hoc/with-service';
import { compose } from '../../util';
import { getFetchUserName, getFetchDecks } from '../../actions';
import LoginModal from '../login-modal';
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
    await this.props.service.logout();
    await this.props.fetchUserName();
    await this.props.fetchDecks();
    this.props.history.push('/');
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
      (<div className="app-header-room" />) :
      (<div className="app-header-room">
        <p>{this.props.currentRoom.name}</p>
      </div>);

    return (
      <div className='app-header'>
        {roomInHeader}
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
