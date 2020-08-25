import './create-room.sass';
import { getFetchDecks, getFetchUserName } from '../../../actions';
import { compose } from '../../../util';
import withService from '../../hoc/with-service';
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

class CreateRoom extends React.Component {
  state = {
    ownerName: undefined,
    roomName: undefined,
    deck: 1,
    timerDuration: '00:00:00'
  };

  async componentWillMount(): void {
    await this.props.fetchDecks();
  }

  handleChangeOwnerName = (event) => {
    this.setState({
      ownerName: event.target.value
    });
  };

  handleChangeRoomName = (event) => {
    this.setState({
      roomName: event.target.value
    });
  };

  handleChangeDecks = (event) => {
    this.setState({
      deck: event.target.value
    });
  };

  handleChangeTimerDuration = (event) => {
    this.setState({
      timerDuration: event.target.value
    });
  };

  onSubmit = async(event) => {
    event.preventDefault();
    const { ownerName, roomName, deck, timerDuration } = this.state;
    const { service, fetchUserName, currentUserName } = this.props;
    if (currentUserName === '') {
      await service.auth(ownerName);
      await fetchUserName();
    }

    const timerConverted = timerDuration === '00:00:00' ? '' : timerDuration;
    const roomId = await service.createRoom('', roomName, timerConverted, deck);

    this.props.history.push('/rooms/' + roomId);
  };

  renderOwnerName = () => {
    const { currentUserName } = this.props;
    const { ownerName } = this.state;
    return (
      currentUserName === '' ?
        <input type="text" className="form-input" disabled={false} id="owner-name" value={ownerName} onChange={this.handleChangeOwnerName} /> :
        <input type="text" className="form-input" disabled={true} id="owner-name" value={ownerName} />
    );
  };

  renderDecks = () => {
    const { availableDecks } = this.props;
    const { deck } = this.state;

    return (
      <select name="deck" id="available-decks" className="form-input" onChange={this.handleChangeDecks} value={deck}>
        {
          availableDecks.map((deck) => {
            return (
              <option key={deck.id} value={deck.id}>{deck.name}</option>
            );
          })
        }
      </select>
    );
  };

  render() {
    const { roomName, timerDuration } = this.state;

    return (
      <div className="flex-container form-container">
        <div className="form-header">Create new Room</div>
        <form className="form-inner" id="room-creation-form" onSubmit={this.onSubmit}>
          <label htmlFor="owner-name" className="input-label">Owner name</label>
          {this.renderOwnerName()}
          <label htmlFor="room-name" className="input-label">Room name</label>
          <input type="text" className="form-input" id="room-name" value={roomName} onChange={this.handleChangeRoomName} />
          <label htmlFor="available-decks" className="input-label">Deck</label>
          {this.renderDecks()}
          <label htmlFor="timer-duration" className="input-label">Timer Duration</label>
          <input type="time" step={1} className="form-input" id="timer-duration" value={timerDuration} onChange={this.handleChangeTimerDuration} />
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
