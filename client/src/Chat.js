import React from 'react';

const Chat = () => (
    <main className='container'>
        <ul className= 'list'>
            <li className='list__item list__item--mine'>
                <span className='message message--mine'>
                    Olá
                </span>
            </li>
            <li className='list__item list__item--other'>
                <span className='message message--other'>
                    Olá
                </span>
            </li>
        </ul>
        <form className='form'>
            <input
                className='form__field'
                placeholder='Type a new message here...'
                type='text'
            />
        </form>
    </main>
)

export default Chat;