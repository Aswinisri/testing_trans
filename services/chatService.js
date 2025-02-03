const Chat = require('../models/chatModel');

// Function to create a new chat
exports.createChat = async (customerId, driverId) => {
  try {
    // Create a new Chat document
    const newChat = new Chat({
      customerId,
      driverId,
      messages: []  // Initialize with an empty messages array
    });

    // Save the new chat document
    const savedChat = await newChat.save();

    // Return the saved chat object (including the newly generated chatId)
    return savedChat;
  } catch (err) {
    throw new Error('Error creating chat: ' + err.message);
  }
};

// Function to save a message in a chat
exports.saveMessage = async (chatId, senderId, message) => {
  try {
    // Find the chat by chatId
    const chat = await Chat.findById(chatId);
    if (!chat) throw new Error('Chat not found');

    // Create a new message
    const newMessage = { sender: senderId, message };

    // Push the new message into the chat's messages array
    chat.messages.push(newMessage);

    // Save the updated chat document
    await chat.save();

    // Return the newly created message
    return newMessage;
  } catch (err) {
    throw new Error('Error saving message: ' + err.message);
  }
};



// Function to get chat history based on customerId or driverId
exports.getChatsByUserId = async (userId) => {
  try {
    // Find all chats where the user is either the customer or the driver
    const chats = await Chat.find({
      $or: [
        { customerId: userId },
        { driverId: userId }
      ]
    }).populate('messages.sender'); // Populate sender details in messages

    return chats; // Return the chat history
  } catch (err) {
    throw new Error('Error fetching chats: ' + err.message);
  }
};
