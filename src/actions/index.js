import { createConnection } from '../services/signal-r';

const fetchUsernameTypeName = 'FETCH_USERNAME_REQUEST';
const connectionUpTypeName = 'CONNECTION_UP';
const fetchDecksTypeName = 'FETCH_DECKS_REQUEST';
const fetchRoomTypeName = 'FETCH_ROOM_REQUEST';


const usernameLoadedAction = (username) => {
  return {
    type: fetchUsernameTypeName,
    payload: username
  };
};

const connectionUpAction = (connection) => {
  return {
    type: connectionUpTypeName,
    payload: connection
  };
};

const decksLoadedAction = (decks) => {
  return {
    type: fetchDecksTypeName,
    payload: decks
  };
};

const roomLoadedAction = (room) => {
  return {
    type: fetchRoomTypeName,
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
  fetchUsernameTypeName, fetchRoomTypeName, fetchDecksTypeName, connectionUpTypeName,
  roomLoadedAction, getFetchUserName, getFetchDecks, getFetchRoom, createConnectionAndDispatch
};
