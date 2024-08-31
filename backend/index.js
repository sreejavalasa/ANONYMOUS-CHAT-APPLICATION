const express = require('express');
const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

let admin = require('firebase-admin');

let serviceAccount = require('./key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();


io.on('connection', (socket) => {
  console.log('a user connected');

 // Get the last 10 messages from Firestore
 db.collection('chat').orderBy('timestamp', 'desc').limit(10).get()
 .then((querySnapshot) => {
   let messages = [];
   querySnapshot.forEach((doc) => {
     messages.push(doc.data());
   });

   console.log('Emitting chat history:', messages);
   // Emit messages in reverse order (oldest first)
   socket.emit('chat history', messages.reverse());
 })
 .catch((error) => {
   console.error('Error getting chat history:', error);
 });

 
 //add event listeners on chat
  socket.on('chat message', (msg) => {
    console.log('Received chat message:', msg);
    io.emit('chat message', msg);
  
    // Add a new document with a generated id.
    db.collection('chat').add({
      user: msg.user,
      message: msg.message,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then((docRef) => {
      console.log('Message written with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error adding message: ', error);
    });
  });

  
//event listerners 
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
