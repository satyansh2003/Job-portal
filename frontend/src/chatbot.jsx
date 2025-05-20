import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const getReply = async (userMessage) => {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: 'ssk-or-v1-3c485dd60aa7bc0a325a05945d0af8b58d19fec4107740ded3c99efb6073aede', // Replace with your actual API key
          'HTTP-Referer': 'http://localhost:5173/chatbot',        // Optional, replace with your site URL
          'X-Title': 'Your Website Name',                   // Optional, replace with your site title
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o',
          messages: [
            {
              role: 'user',
              content: userMessage,
            },
          ],
        }),
      });
    console.log(response)
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Failed to get reply from bot:', error);
      return 'Sorry, something went wrong.';
    }
  };
  

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    const botMsg = { from: "bot", text: "Thinking..." };

    setMessages([...messages, userMsg, botMsg]);

    const botReply = await getReply(input);
    setMessages((prevMessages) => [
      ...prevMessages.slice(0, prevMessages.length - 1),
      { from: "bot", text: botReply },
    ]);

    setInput("");
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "1rem", border: "1px solid #ddd", borderRadius: "10px" }}>
      <h2>🤖 AI Chatbot</h2>
      <div style={{ height: "300px", overflowY: "auto", marginBottom: "1rem", padding: "1rem", backgroundColor: "#f9f9f9" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.from === "user" ? "right" : "left", marginBottom: "0.5rem" }}>
            <span style={{
              display: "inline-block",
              backgroundColor: msg.from === "user" ? "#d1e7dd" : "#e2e3e5",
              padding: "8px 12px",
              borderRadius: "10px"
            }}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={input}
          placeholder="Type your message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          style={{ padding: "0.5rem", width: "80%", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button
          onClick={handleSend}
          style={{ padding: "0.5rem 1rem", marginLeft: "0.5rem", backgroundColor: "#0d6efd", color: "#fff", border: "none", borderRadius: "5px" }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
