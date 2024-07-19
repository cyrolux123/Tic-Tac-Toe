document.addEventListener('DOMContentLoaded', () => {
  const createRoomButton = document.getElementById('createRoom');
  const joinRoomButton = document.getElementById('joinRoom');
  const confirmCreateRoomButton = document.getElementById('confirmCreateRoom');
  const roomUrlInput = document.getElementById('roomUrl');
  const roomNameInput = document.getElementById('roomName');
  const modal = document.getElementById('room-modal');
  const closeModal = document.getElementsByClassName('close')[0];

  let roomCode;

  createRoomButton.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });

  confirmCreateRoomButton.addEventListener('click', () => {
    const roomName = roomNameInput.value;
    if (roomName) {
      roomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
      const roomUrl = `${window.location.origin}${window.location.pathname}?room=${roomCode}`;
      localStorage.setItem(roomCode, JSON.stringify({ roomName, gameData: {}, currentPlayer: 'X' }));
      alert(`Room created: ${roomUrl}`);
      window.location.href = roomUrl;
    } else {
      alert('Please enter a room name.');
    }
  });

  joinRoomButton.addEventListener('click', () => {
    const url = new URL(roomUrlInput.value);
    roomCode = url.searchParams.get('room');
    if (roomCode && localStorage.getItem(roomCode)) {
      const roomName = JSON.parse(localStorage.getItem(roomCode)).roomName;
      const enteredCode = prompt(`Enter the code for room "${roomName}":`);
      if (enteredCode === roomCode) {
        alert('Room code verified. Redirecting to the game page.');
        window.location.href = roomUrlInput.value;
      } else {
        alert('Incorrect room code.');
      }
    } else {
      alert('Invalid room URL.');
    }
  });
});
