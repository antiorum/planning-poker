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
    const { currentRoom, service, fetchDecks, history, fetchUserName } = this.props;

    if (currentRoom) {
      await service.exitRoom(currentRoom.id);
    }
    await service.logout();
    await fetchDecks();
    history.push('/');
    await fetchUserName();
  };

  render() {
    const { currentRoom, currentUserName } = this.props;

    return (
      <div className='app-header'>
        <div className="app-header-room">
          <p>
            {currentRoom && currentRoom.name}
          </p>
        </div>
        <div className="app-header-user">
          {currentUserName === '' && <p>You are not logged in yet</p>}
          {currentUserName === '' && <LoginModal />}
          {currentUserName !== '' && <p>You logged in as: {currentUserName}</p> }
          {currentUserName !== '' && <img src={user} alt="user" height={35} />}
          {currentUserName !== '' && <Button variant={'danger'} onClick={this.onLogout} size={'sm'} className={'header-button'}>Logout</Button>}
        </div>
      </div>
    );
  }
}

const mapStateToProperties = ({ currentUserName, currentRoom }) => {
  return { currentUserName, currentRoom };
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
