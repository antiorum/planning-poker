import './create-room.sass';
import { getFetchDecks, getFetchUserName } from '../../../actions';
import { compose } from '../../../util';
import withService from '../../hoc/with-service';
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

class CreateRoom extends React.Component {
  async componentDidMount(): void {
    await this.props.fetchDecks();
  }

  onSubmit = async(event) => {
    event.preventDefault();

    const { service, currentUserName } = this.props;
    const userName = document.querySelector('#owner-name').value;
    if (currentUserName === '') {
      await service.auth(userName);
      await this.props.fetchUserName();
    }
    const roomName = document.querySelector('#room-name').value;
    const deckId = document.querySelector('#available-decks').value;
    const timerDuration = document.querySelector('#timer-duration').value;
    const roomId = await service.createRoom('', roomName, timerDuration, deckId);

    this.props.history.push('/rooms/' + roomId);
  };

  renderOwnerName = () => {
    const { currentUserName } = this.props;
    return (
      currentUserName === '' ?
        <input type="text" className="form-input" disabled={false} id="owner-name" /> :
        <input type="text" className="form-input" disabled={true} id="owner-name" value={currentUserName} />
    );
  };

  renderDecks = () => {
    return (
      <select name="deck" id="available-decks" className="form-input">
        {
          this.props.availableDecks.map((deck) => {
            return (
              <option key={deck.id} value={deck.id}>{deck.name}</option>
            );
          })
        }
      </select>
    );
  };

  render() {
    return (
      <div className="flex-container form-container">
        <div className="form-header">Create new Room</div>
        <form className="form-inner" id="room-creation-form" onSubmit={this.onSubmit}>
          <label htmlFor="owner-name" className="input-label">Owner name</label>
          {this.renderOwnerName()}
          <label htmlFor="room-name" className="input-label">Room name</label>
          <input type="text" className="form-input" id="room-name" />
          <label htmlFor="available-decks" className="input-label">Deck</label>
          {this.renderDecks()}
          <label htmlFor="timer-duration" className="input-label">Timer Duration</label>
          <input type="time" step={1} className="form-input" id="timer-duration" />
          <Button as="input" type="submit" value="Create Room" size={'sm'} className={'create-room-button'} />
        </form>
      </div>);
  }
}

const mapStateToProperties = ({ currentUserName, availableDecks }) => {
  return { currentUserName, availableDecks };
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
)(CreateRoom);
