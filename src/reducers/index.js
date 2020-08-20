const initialState = {
  currentUserName : '',
  signalRConnection : undefined,
  currentRoom: undefined,
  currentRoomId : undefined,
  usersInRoom : [],
  roomStories : [],
  availableDecks: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USERNAME_REQUEST' : return { ...state, currentUserName: action.payload };
    case 'CONNECTION_UP': return { ...state, signalRConnection: action.payload };
    case 'FETCH_ROOM_REQUEST': return { ...state, currentRoom: action.payload };
    case 'FETCH_USERS_REQUEST' : return { ...state, usersInRoom: action.payload };
    case 'FETCH_STORIES_REQUEST' : return { ...state, roomStories: action.payload };
    case 'FETCH_DECKS_REQUEST': return { ...state, availableDecks: action.payload };
    default: return state;
  }
};

export default reducer;
