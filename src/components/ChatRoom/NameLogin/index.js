import { useState } from 'react';
import './index.css';
import { v4 as uuidv4 } from 'uuid';

const NameLogin = ({ onSubmit }) => {

    const [name, setName] = useState('');
    const [chatRoomName, setChatRoomName] = useState('');

    return (
        <>
            <div className='general-cont'>
                <h1>ScholarFab DISII chat :3</h1>
                <div className="name-input-cont">

                    <input placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && onSubmit({ username: name, chatRoomName, id: uuidv4() })} />
                    <input placeholder="Enter chat room name" value={chatRoomName} onChange={(e) => setChatRoomName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && onSubmit({ username: name, chatRoomName, id: uuidv4() })} />
                    <button onClick={() => onSubmit({ username: name, chatRoomName, id: uuidv4() })}>Enter chat</button>

                </div>

            </div>

        </>
    )
}

export default NameLogin;