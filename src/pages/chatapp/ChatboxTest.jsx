// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:4000');

// const ChatApp = () => {
//     const [messages, setMessages] = useState([]);
//     const [input, setInput] = useState('');

//     useEffect(() => {
        
//         socket.on('chat message', (data) => {
//             console.log("inside Useeffeft data", data);
//             setMessages((prevMessages) => [...prevMessages, data]);
//         });

//         return () => {
//             socket.disconnect();
//         };
//     }, []);

//     console.log("messages", messages);

//     const sendMessage = () => {
//         socket.emit('chat message', input);
//         setInput('');
//     };

//     return (
//         <div>
//             <ul>
//                 {messages.map((message, index) => (
//                     <li key={index}>{message}</li>
//                 ))}
//             </ul>
//             <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
//             <button onClick={sendMessage}>Send</button>
//         </div>
//     );
// };

// export default ChatApp;
