import { createConnection } from '../services/signal-r';

const usernameLoadedAction = (username) => {
  return {
    type: 'FETCH_USERNAME_REQUEST',
    payload: username
  };
};

const connectionUpAction = (connection) => {
  return {
    type: 'CONNECTION_UP',
    payload: connection
  };
};

const decksLoadedAction = (decks) => {
  return {
    type: 'FETCH_DECKS_REQUEST',
    payload: decks
  };
};

const roomLoadedAction = (room) => {
  return {
    type: 'FETCH_ROOM_REQUEST',
    payload: room
  };
};

const getFetchUserName = (service, dispatch) => async() => {
  const data = await service.getCurrentUsername();
  dispatch(usernameLoadedAction(data));
};

const getFetchDecks = (service, dispatch) => async() => {
  const data = await service.getAllDecks();
  dispatch(decksLoadedAction(data));
};

const getFetchRoom = (id, service, dispatch) => async() => {
  const data = await service.getRoom(id);
  dispatch(roomLoadedAction(data));
};

const createConnectionAndDispatch = (service, dispatch, connectionUp) => async() => {
  const data = await createConnection(connectionUp);
  await dispatch(connectionUpAction(data));
};

export {
  roomLoadedAction, getFetchUserName, getFetchDecks, getFetchRoom, createConnectionAndDispatch
};
