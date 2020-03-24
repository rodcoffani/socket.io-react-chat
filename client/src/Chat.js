import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import uuid from 'uuid/v4';

const myId = uuid();
const socket = io('http://localhost:8080');
socket.on('connect', () => console.log('[IO] Connect => A new connection has been established'));

const Chat = () => {
    const [message, setMessage] = useState();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const handleNewMessage = newMessage => setMessages([...messages, newMessage])
        socket.on('chat.message', handleNewMessage);
        return () => socket.off('chat.message', handleNewMessage);
    }, [messages]);

    const handleFormSubmit = event => {
        event.preventDefault();
        if(message.trim()) {
            socket.emit('chat.message', {
                id: myId,
                message
            })
            setMessage('')
        }
    }

    const handleInputChange = event => setMessage(event.target.value)

    return (
        <main className='container'>
            <ul className= 'list'>
                {messages.map((m, index)=> (
                    <li 
                        className={`list__item list__item--${m.id === myId ? 'mine' : 'other'}`}
                        key={index}
                    >
                        <span className={`message message--${m.id === myId ? 'mine' : 'other'}`}>
                            {m.message}
                        </span>
                    </li>
                ))}
            </ul>
            <form className='form' onSubmit={handleFormSubmit}>
                <input
                    className='form__field'
                    onChange={handleInputChange}
                    placeholder='Type a new message here...'
                    type='text'
                    value={message}
                />
            </form>
        </main>
    )
}

export default Chat;