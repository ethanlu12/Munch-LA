// ChatPage.js
'use client';
import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { postData } from '../../api/api';
import ChatBox from '../chatbot/chatbot';
import Sidebar from '../sidebar/sidebar';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [conversations, setConversations] = useState([
        { id: 1, name: 'Conversation 1', messages: [] },
        { id: 2, name: 'Conversation 2', messages: [] },
        // Add more conversations as needed
    ]);
    const [sessionId, setSessionId] = useState('1');

    const onSelectConversation = (index) => {
        const selectedConversation = conversations[index];
        setMessages(selectedConversation.messages);
    };

    const onSend = async (input) => {
        if (input.trim()) {
            const userMessage = { text: input.trim(), sender: 'user' };
            const newMessages = [...messages, userMessage];
            setMessages(newMessages);

            try {
                const response = await postData('message', { user_message: input, session_id: sessionId });
                const systemMessage = { text: response.input, sender: 'system' };

                setMessages([...newMessages, systemMessage]);
            } catch (error) {
                console.error('Error posting data:', error);
            }
        }
    };

    return (
        <Box sx={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ flexShrink: 0 }}>
                <Sidebar onSelectConversation={onSelectConversation} />
            </Box>
            {/* ChatBox - Takes up the remaining width, adjusts based on screen size */}
            <Grid container sx={{ flexGrow: 1 }}>
                <Grid item xs={12} sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ height: '100%', width: '100%', backgroundColor: '#ffffff' }}>
                        <ChatBox messages={messages} onSend={onSend} />
                    </div>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ChatPage;


//     return (
//         <Box sx={{ height: '100%', width: '100%' }}>
//             <Grid container sx={{ height: '100%' }}>
//                 <Grid item xs={12} md={2} sx={{ padding: '8px', maxHeight: '100%'}}>
//                     <Sidebar></Sidebar>
//                     {/* <Box sx={{display: 'flex', flexDirection: 'column', overflowY: 'auto', height: '100%'}}>
//                         {buttons}
//                     </Box> */}
//                 </Grid>


//                 <Grid item xs={12} md={10} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
//                     <div style={{ height: '100%', width: '100%', backgroundColor: '#ffffff' }}>
//                         <ChatBox messages={messages} onSend={onSend} />
//                         {/* add a switch statement here that switches to chat_intro */}
//                         {/* if messages array is empty then render <ChatIntro></ChatIntro>
//                         else render <ChatBox messages={messages} onSend={onSend} /> */}
//                         {/* if first chat sent then render <ChatBox messages={messages} onSend={onSend} />
//                         else render <ChatIntro></ChatIntro>*/}
//                     </div>
//                     {/* messaging chat area */}
                    
//                 </Grid>
//             </Grid>
//         </Box>
//     );
// };
