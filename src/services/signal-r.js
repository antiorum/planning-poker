import * as signalR from '@aspnet/signalr';

async function createConnection(fetchRoom) {
  const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:44346/roomsHub')
    .build();
  await hubConnection.start();

  hubConnection.on('UpdateUsersInRoom', () => {
    fetchRoom();
  });
  hubConnection.on('StartDiscussion', () => {
    fetchRoom();
  });
  hubConnection.on('UserVoted', () => {
    fetchRoom();
  });
  hubConnection.on('EndDiscussion', () => {
    fetchRoom();
  });
  hubConnection.on('UpdateDiscussionResults', () => {
    fetchRoom();
  });

  return hubConnection;
}

export { createConnection };

