import React, { useState, useEffect, useRef, useContext } from 'react';
import { UserContext } from '../App';
import { Box, Input, Button, VStack, HStack, Text, Flex, Spinner } from '@chakra-ui/react';
import io from 'socket.io-client';

const JoinChat = () => {
  const user = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [spin,setSpin]=useState(false);

  // Use a ref to store the socket
  const socketRef = useRef();

  useEffect(() => {
    // Connect to the server
    socketRef.current = io('http://localhost:3000'); // socketio server url !

    // Listen for chat messages from server
    socketRef.current.on('chat message', (msg) => {
      setChat((chat) => [...chat, msg]);
    });
    setSpin(true);
    // Listen for chat history from server
    socketRef.current.on('chat history', (messages) => {
      console.log(messages); // Log the received messages
      setChat(messages);
      setSpin(false);
    });

    return () => {
      // Disconnect the socket when the component is unmounted
      socketRef.current.disconnect();
    };
  }, []); // Empty dependency array means this effect runs once on mount and clean up on unmount
  
  // Function to send a chat message
  const sendChat = (event) => {
    event.preventDefault();
    socketRef.current.emit('chat message', { user: user['uid'].slice(0,4), message });   //emit messages to the socketio server 
    setMessage('');
  };

  return (
    <Box p={5} border={'2px dashed black'}>
      <VStack spacing={5}>
        <Text fontSize="2xl" color={'blackAlpha.400'} >CHAT</Text>
        {spin&&<Spinner/>}
        {chat.map((msg, index) => (
          <Flex key={index} w="full" justify={msg.user === user['uid'].slice(0,4) ? 'flex-start' : 'flex-end'}>
            <HStack>
              <Text style={{color:msg.user === user['uid'].slice(0,4)?"green":"black"}} fontWeight={msg.user === user['uid'].slice(0,4) ? 'bold' : 'normal'}>{msg.user}</Text>
              <Text fontSize={'1.5rem'}>{msg.message}</Text>
            </HStack>
          </Flex>
        ))}
        <form onSubmit={sendChat}>
          <HStack spacing={3}>
            <Input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              colorScheme={'whatsapp'}
            />
            <Button type="submit" colorScheme='teal'>Send</Button>
          </HStack>
        </form>
      </VStack>
    </Box>
  );
};

export default JoinChat;











// 1. The message is first emitted to the server with socket.emit('chat message', { user: user['uid'].slice(0,4), message });.
// 2. The server then handles this message, likely broadcasting it to other connected clients (including the sender).
// 3. The useEffect hook in each client’s application is listening for these ‘chat message’ events from the server with socket.on('chat message', (msg) => {...}).
// 4. When a ‘chat message’ event is received, the message is added to the chat state of the client’s application, which triggers a re-render, and the new message is displayed in the DOM.