import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
      setErrorMessage("");
      navigate(
        `/chat/${roomId.trim()}?name=${
          name || `User${Math.floor(Math.random() * 1000)}`
        }`
      );
    }else {
      setErrorMessage("Room ID cannot be empty while joining to a room. Please enter a Room ID.");
    } 
  };

  return (
    <div className="home">
      <h2>Welcome to the Chat App!</h2>
      <div className="input">
        <label htmlFor="name">
          Enter your name or leave for generate random
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>
      <div className="input">
        <label htmlFor="roomId"> Enter room ID</label>
        <input
          type="text"
          id="roomId"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="i50s2d7n"
        />
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div id="buttons">
        <button onClick={handleCreateRoom}>Create a New Room</button>
        <button onClick={handleJoinRoom}>Join Room</button>
      </div>
    </div>
  );
}

export default Home;
