'use client';

import React, { useState, useEffect } from 'react';
import { Box, Grid, useMediaQuery } from '@mui/material';
import SidebarActions from './sidebar_action';
import ChatLog from './chatlog/chat_log';

// Sidebar component that contains the sidebar actions and chat log
const Sidebar = ({ onSelectConversation }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [conversations, setConversations] = useState([]);

  // Media query to detect narrow screens
  const isNarrowScreen = useMediaQuery('(max-width: 768px)');

  // Auto-collapse the sidebar when the screen is narrow
  useEffect(() => {
    if (isNarrowScreen) {
        setIsOpen(false); // Collapse the sidebar when the screen is narrow
    } else {
        setIsOpen(true); // Expand the sidebar when the screen is wide
    }
  }, [isNarrowScreen]);

  // Function to toggle sidebar open or closed
  const handleToggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle value of isOpen between true and false when clicked
  };

  // Function to add new conversation when the "New Chat" button is pressed
  const handleNewChat = () => {
    const newConversation = `Conversation ${conversations.length + 1}`; // Create new conversation name based on current number of convos
    setConversations([...conversations, newConversation]); // Add the new conversation to the conversations array
  };

  // Function to delete conversation when delete button is pressed
  const handleDeleteChat = (index) => {
    const updatedConversations = conversations.filter((_, i) => i !== index); // Remove the conversation at the specified index
    setConversations(updatedConversations); // Update the conversations array with the filtered list
  };

  return (
    <Box
      sx={{
        width: isOpen ? '261px' : '60px', // Sidebar is 261px when open, 60px when closed
        transition: 'width 0.1s', // Time it takes for the sidebar to collapse/uncollapse
        overflow: 'hidden', 
        backgroundColor: '#333', 
        borderRight: '1px solid #ddd', 
        display: 'flex',
        flexDirection: 'column',
        height: '100vh', // Full height of the viewport
      }}
    >
      {/* SidebarActions contains the logo, collapse button, and new chat button */}
      <SidebarActions
        isOpen={isOpen} // Pass the isOpen state to control the appearance of the sidebar actions
        toggleSidebar={handleToggleSidebar}  // Pass the toggleSidebar function to control collapsing/expanding
        handleNewChat={handleNewChat}  // Pass the handleNewChat function to add new conversations
      />

      {/* ChatLog contains the list of conversations */}
      <ChatLog 
        isOpen={isOpen} // Pass the isOpen state to control the visibility and layout of the chat log
        conversations={conversations}  // Pass the conversations array to display the list of conversations
        handleDeleteChat={handleDeleteChat}  // Pass the handleDeleteChat function to allow deleting conversations
        onSelectConversation={onSelectConversation}  // Pass the handler to ChatLog
      />
    </Box>
  );
};

export default Sidebar;
