import React, { useState } from 'react';
import io from 'socket.io-client'

const socket = io('htpp://localhost:3000');
socket.on('connect', () => console.log('[IO] Connect => A new connection has been established'));

const Chat = () => {
    const [message, setMessage] = useState();
    const [messages, setMessages] = useState([]);

    const handleFormSubmit = event => {
        event.preventDefault();
        if(message.trim()) {
            setMessages([...messages, {
                id: 1,
                message
            }])
            setMessage('')
        }
    }

    const handleInputChange = event => setMessage(event.target.value)

    return (
        <main className='container'>
            <ul className= 'list'>
                {messages.map( m => (
                    <li className='list__item list__item--mine'>
                        <span
                            className='message message--mine'
                            key={m.id}
                        >
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