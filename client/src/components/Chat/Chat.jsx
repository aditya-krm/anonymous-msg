import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { useParams, useLocation } from "react-router-dom";
import { toast, Toaster } from "sonner";
import "./Chat.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Chat() {
  const { roomId } = useParams();
  const query = useQuery();
  const name = query.get("name");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_API);

    socketRef.current.emit("join room", { roomId, name });

    const handleMessage = (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    };

    const handleUserJoined = (userName) => {
      toast.success(`${userName} has joined the chat`);
    };

    const handleUserLeft = (userName) => {
      toast.error(`${userName} has left the chat`);
    };
    socketRef.current.on("chat message", handleMessage);
    socketRef.current.on("user joined", handleUserJoined);
    socketRef.current.on("user left", handleUserLeft);

    return () => {
      socketRef.current.off("chat message", handleMessage);
      socketRef.current.off("user joined", handleUserJoined);
      socketRef.current.off("user left", handleUserLeft);
      socketRef.current.disconnect();
    };
  }, [roomId, name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      const msg = {
        text: input,
        userId: socketRef.current.id,
        userName: name,
        roomId,
        timestamp: Date.now(),
      };
      socketRef.current.emit("chat message", msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
      setInput("");
    }
  };

  return (
    <>
      <Toaster position="top-right" richColors expand={true} />
      <div id="chatBox">
        <div id="messages">
          {messages.map((msg, index) => (
            <p
              key={index}
              className={
                msg.userId === socketRef.current.id
                  ? "my-message"
                  : "her-message"
              }
            >
              <strong>{msg.userName}: </strong> <br />
              {msg.text}
            </p>
          ))}
        </div>
        <form id="form" onSubmit={handleSubmit}>
          <input
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
            placeholder="type your message"
          />
          <button id="button">Send</button>
        </form>
      </div>
    </>
  );
}

export default Chat;
