// src/components/ChatboxUser.js
"use client";

import React, { useState } from "react";
import { Box, Typography, IconButton, Paper, TextField, Button } from "@mui/material";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import CloseIcon from "@mui/icons-material/Close";
import { useChat } from "./ChatContext";

function ChatboxUser() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { messages, sendMessage } = useChat();

  const toggleChatbox = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message, "User");
      setMessage("");
    }
  };

  return (
    <Box sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 1000 }}>
      <IconButton
        onClick={toggleChatbox}
        sx={{
          backgroundColor: "#333",
          color: "#fff",
          width: 56,
          height: 56,
          borderRadius: "50%",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.3)",
          ":hover": { backgroundColor: "#555" },
        }}
      >
        {isOpen ? <CloseIcon /> : <HeadsetMicIcon />}
      </IconButton>

      {isOpen && (
        <Paper
          elevation={4}
          sx={{
            position: "fixed",
            bottom: 72,
            right: 16,
            width: 300,
            height: 400,
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 1100,
          }}
        >
          <Box sx={{ backgroundColor: "#333", color: "#fff", padding: 2 }}>
            <Typography variant="h6">User-Chat</Typography>
          </Box>
          <Box sx={{ flex: 1, padding: 2, backgroundColor: "#f9f9f9", overflowY: "auto" }}>
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: msg.sender === "User" ? "flex-end" : "flex-start",
                  marginBottom: 1,
                }}
              >
                <Box
                  sx={{
                    maxWidth: "70%",
                    padding: 1,
                    borderRadius: 2,
                    backgroundColor: msg.sender === "User" ? "#d4edda" : "#cce5ff",
                    color: msg.sender === "User" ? "#155724" : "#004085",
                  }}
                >
                  <Typography variant="body2">{msg.text}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: "flex", padding: 2, backgroundColor: "#ddd" }}>
            <TextField
              fullWidth
              placeholder="Nachricht eingeben..."
              variant="outlined"
              size="small"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{ backgroundColor: "#fff", borderRadius: 1, marginRight: 1 }}
            />
            <Button
              variant="contained"
              onClick={handleSendMessage}
              sx={{
                backgroundColor: "#333",
                color: "#fff",
                ":hover": { backgroundColor: "#555" },
              }}
            >
              Senden
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
}

export default ChatboxUser;
