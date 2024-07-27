import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./Chat.css";

const socket = io("http://localhost:5000");

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

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
