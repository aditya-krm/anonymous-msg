import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 10);
    navigate(
      `/chat/${newRoomId}?name=${
        name || `User${Math.floor(Math.random() * 1000)}`
      }`
    );
  };

  const handleJoinRoom = () => {
    if (roomId.trim()) {
      navigate(
        `/chat/${roomId.trim()}?name=${
          name || `User${Math.floor(Math.random() * 1000)}`
        }`
      );
    }
  };

  return (
    <div>
      <h2>Welcome to the Chat App!</h2>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>
      <div>
        <button onClick={handleCreateRoom}>Create a New Room</button>
      </div>
      <div>
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter Room ID"
        />
        <button onClick={handleJoinRoom}>Join Room</button>
      </div>
    </div>
  );
}

export default Home;
