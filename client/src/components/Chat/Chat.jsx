import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import "./Chat.css";

const socket = io("http://localhost:5000");

function Chat() {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.emit("join room", roomId);

    const handleMessage = (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    };

    socket.on("chat message", handleMessage);

    return () => {
      socket.off("chat message", handleMessage);
    };
  }, [roomId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      socket.emit("chat message", input);
      setInput("");
    }
  };

  return (
    <div id="chatBox">
      <ul id="messages">
        {messages.map((msg, index) => (
          <li
            key={index}
            className={msg.userId === socket.id ? "my-message" : "her-message"}
          >
            {msg.text}
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
