const ChatService = require('../services/chatService');

// Controller to create a new chat
exports.createChat = async (req, res) => {
  try {
    const { customerId, driverId } = req.body;
    
    // Create a new chat
    const newChat = await ChatService.createChat(customerId, driverId);
    
    // Respond with the created chat
    res.status(201).json(newChat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller to send a message
exports.sendMessage = async (req, res) => {
  try {
    const { chatId, senderId, message } = req.body;
    
    // Save the message in the chat
    const chatMessage = await ChatService.saveMessage(chatId, senderId, message);
    
    // Respond with the saved message
    res.json(chatMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Controller to get chat history based on logged-in user
exports.getChatHistory = [ async (req, res) => {
  try {
    const userId = req.userId; // Extracted from the token
    
    // Fetch the chat history for the logged-in user
    const chats = await ChatService.getChatsByUserId(userId);

    if (chats.length === 0) {
      return res.status(404).json({ message: 'No chats found for this user.' });
    }

    // Respond with the chat history
    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}];
