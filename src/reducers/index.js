import { fetchUsernameTypeName, fetchRoomTypeName, connectionUpTypeName, fetchDecksTypeName } from '../actions';

const initialState = {
  currentUserName : '',
  signalRConnection : undefined,
  currentRoom: undefined,
  availableDecks: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case fetchUsernameTypeName : return { ...state, currentUserName: action.payload };
    case connectionUpTypeName: return { ...state, signalRConnection: action.payload };
    case fetchRoomTypeName: return { ...state, currentRoom: action.payload };
    case fetchDecksTypeName: return { ...state, availableDecks: action.payload };
    default: return state;
  }
};

export default reducer;
