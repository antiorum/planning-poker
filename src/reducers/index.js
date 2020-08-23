import { fetchUsernameTypeName, fetchRoomTypeName, connectionUpTypeName, fetchDecksTypeName } from '../actions';

const initialState = {
  currentUserName : '',
  signalRConnection : undefined,
  currentRoom: undefined,
  availableDecks: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case fetchUsernameTypeName : return { ...state, currentUserName: action.username };
    case connectionUpTypeName: return { ...state, signalRConnection: action.connection };
    case fetchRoomTypeName: return { ...state, currentRoom: action.room };
    case fetchDecksTypeName: return { ...state, availableDecks: action.decks };
    default: return state;
  }
};

export default reducer;
