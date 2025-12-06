import React, { useState } from "react";

export default function IntelligentSystem() {
  const [messages, setMessages] = useState([
    { sender: "pau", text: "Hello! I'm Pau, your emotional style recommender. How are you feeling today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { sender: "user", text: input }]);
    
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "pau", text: "Based on your mood, I recommend a comfortable yet elegant outfit. Let me show you some options..." },
      ]);
    }, 1000);
    
    setInput("");
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Pau — Emotional Recommender</h1>
        <p style={styles.subtitle}>
          AI assistant that recommends outfits based on emotional state, personal style, and daily context
        </p>
      </div>

      <div style={styles.chatContainer}>
        <div style={styles.messagesArea}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                ...styles.message,
                ...(msg.sender === "pau" ? styles.messagePau : styles.messageUser),
              }}
            >
              {msg.sender === "pau" && <div style={styles.avatar}>🦚</div>}
              <div style={styles.messageText}>{msg.text}</div>
              {msg.sender === "user" && <div style={styles.avatar}>👤</div>}
            </div>
          ))}
        </div>

        <div style={styles.inputArea}>
          <input
            type="text"
            style={styles.input}
            placeholder="Tell Pau how you're feeling..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <button style={styles.sendButton} onClick={handleSend}>
            Send
          </button>
        </div>
      </div>

      <div style={styles.features}>
        <h3>Pau understands:</h3>
        <ul style={styles.featureList}>
          <li>🎭 Your emotional state</li>
          <li>👗 Your personal style preferences</li>
          <li>📅 Daily context and occasions</li>
          <li>✨ TRYONYOU elegance rules</li>
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Helvetica Neue', sans-serif",
    maxWidth: "900px",
    margin: "0 auto",
    padding: "2rem",
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "0.5rem",
  },
  subtitle: {
    fontSize: "1rem",
    color: "#666",
  },
  chatContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
    padding: "1.5rem",
    marginBottom: "2rem",
    minHeight: "400px",
    display: "flex",
    flexDirection: "column",
  },
  messagesArea: {
    flex: 1,
    overflowY: "auto",
    marginBottom: "1rem",
  },
  message: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "1rem",
    gap: "0.8rem",
  },
  messagePau: {
    justifyContent: "flex-start",
  },
  messageUser: {
    justifyContent: "flex-end",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#667eea",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
  },
  messageText: {
    maxWidth: "70%",
    padding: "0.8rem 1.2rem",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  inputArea: {
    display: "flex",
    gap: "0.8rem",
  },
  input: {
    flex: 1,
    padding: "0.8rem",
    fontSize: "1rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
  },
  sendButton: {
    padding: "0.8rem 2rem",
    backgroundColor: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
  },
  features: {
    padding: "1.5rem",
    backgroundColor: "#f0f4ff",
    borderRadius: "8px",
  },
  featureList: {
    listStyle: "none",
    padding: 0,
    margin: "1rem 0 0 0",
  },
};
