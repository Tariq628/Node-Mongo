import React, { useState, useEffect } from "react";
import { fetchData, saveMessage } from "./api";

function App() {
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function getData() {
      const result = await fetchData();
      setMessages(result);
    }
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveMessage({ user, data: message });
      setUser("");
      setMessage("");
      // Refresh the data after saving the message
      const result = await fetchData();
      setMessages(result);
    } catch (error) {
      console.error("Failed to save the message:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Simple React App with MongoDB Atlas</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userAddress">Enter user address</label>
          <input
            type="text"
            className="form-control"
            id="userAddress"
            placeholder="Enter user address"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Enter your message</label>
          <textarea
            className="form-control"
            id="message"
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Send Message
        </button>
      </form>
      <ul className="mt-4">
        {messages.map((item, index) => (
          <li key={index}>
            <strong>User:</strong> {item.user}, <strong>Message:</strong>{" "}
            {item.data}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
