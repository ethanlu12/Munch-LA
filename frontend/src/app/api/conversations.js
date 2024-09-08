import { openDb } from '../../lib/db'; // Adjust this to your actual db path

export async function POST(req) {
    try {
      const { user_id, session_id } = await req.json();
  
      if (!user_id || !session_id) {
        return new Response(JSON.stringify({ error: 'Missing user_id or session_id' }), { status: 400 });
      }
  
      // Open SQLite database
      const db = await openDb();
  
      // Query database for messages matching the user_id and session_id
      const dbMessages = await db.all(
        'SELECT * FROM messages WHERE session_id = ? AND user_id = ? ORDER BY timestamp ASC',
        session_id,
        user_id
      );
  
      // Process messages
      let firstNonPromptHumanMessageSeen = false;
      const messages = [];
  
      dbMessages.forEach((dbMessage) => {
        if (dbMessage.message_type === 'humanmessage_no_prompt') {
          messages.push({
            message_type: 'human_no_prompt',
            content: dbMessage.content,
          });
          firstNonPromptHumanMessageSeen = true;
        } else if (dbMessage.message_type === 'aimessage' && firstNonPromptHumanMessageSeen) {
          messages.push({
            message_type: 'aimessage',
            content: dbMessage.content,
          });
        }
      });
  
      // Return the processed conversation
      return new Response(JSON.stringify({ conversation: messages }), { status: 200 });
    } catch (error) {
      console.error('Error fetching conversation data:', error);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
  }
  
