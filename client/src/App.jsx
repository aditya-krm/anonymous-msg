import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Chat from "./components/Chat/Chat";
import "./App.css";

function Home() {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 10);
    navigate(`/chat/${newRoomId}`);
  };

  const handleJoinRoom = () => {
    if (roomId.trim()) {
      navigate(`/chat/${roomId.trim()}`);
    }
  };

  return (
    <div>
      <h2>Welcome to the Chat App!</h2>
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/chat/:roomId" element={<Chat />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
