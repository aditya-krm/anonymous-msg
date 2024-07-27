import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useParams, useLocation } from "react-router-dom";
import "./Chat.css";

const socket = io("http://localhost:5000");

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Chat() {
  const { roomId } = useParams();
  const query = useQuery();
  const name = query.get("name");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.emit("join room", { roomId, name });

    const handleMessage = (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    };

    socket.on("chat message", handleMessage);

    return () => {
      socket.off("chat message", handleMessage);
    };
  }, [roomId, name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      const msg = {
        text: input,
        userId: socket.id,
        userName: name,
        roomId,
        timestamp: Date.now(),
      };
      socket.emit("chat message", msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
      setInput("");
    }
  };

  return (
    <div id="chatBox">
      <ul id="messages">
        {messages.map((msg, index) => (
          <li key={index} className={msg.userId === socket.id ? 'my-message' : 'her-message'}>
            <strong>{msg.userName}: </strong>{msg.text} 
          </li>
        ))}
      </ul>
      <form id="form" onSubmit={handleSubmit}>
        <input
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
        />
        <button id="button">Send</button>
      </form>
    </div>
  );
}

export default Chat;
