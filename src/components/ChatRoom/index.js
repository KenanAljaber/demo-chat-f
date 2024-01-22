import { useEffect, useState } from 'react';
import './index.css';
import { socket } from '../../socket';
import { v4 as uuidv4 } from 'uuid';
import NameLogin from './NameLogin';


const ChatRoom = () => {

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [isTyping, setIsTyping] = useState({event: false, username: ''});
    const [username, setUsername] = useState('');
    const [chatRoomName, setChatRoomName] = useState('');
    const [id, setId] = useState(uuidv4());

    useEffect(() => {
        // Create the socket connection only if it doesn't exist
        function onConnect() {

            socket.on('createMessage', (data) => {
                console.log("new message received");
                if (messages.find(message => message.id === data.id) || data.me) return;
                const received = {
                    message: data.message,
                    me: false,
                    ...data
                };
                setMessages(prevState => [...prevState, received]);
            });

            socket.on('user-typing', (data) => {
                if (data.username === username) return;
                setIsTyping({event: true, username: data.username});
            })

            socket.on('user-stopTyping', (data) => {
                if (data.username === username) return;
                setIsTyping({event: false, username: ''});
            })
        }

        function onDisconnect() {
            setIsConnected(false);
        }


        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);


        // Cleanup function
        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    }, []);

    function addMessage(e) {
        // e.preventDefault();
        if (message.trim().length == 0) return;
        console.log(message);
        const data = { message: message };
        data.me = true;
        setMessages(prevState => [...prevState, data]);
        setMessage('');
        if (socket) {

            socket.emit('message', { message: data.message, chatRoomName: chatRoomName, username: username, id: id });
        }
    }

    function login(data) {
        if(!data?.username || !data?.chatRoomName) return;
        setUsername(data.username);
        setChatRoomName(data.chatRoomName);
        setId(data.id);
        socket.emit('join-room', { username: data.username, chatRoomName: data.chatRoomName, id: data.id });
        setIsConnected(true);
        console.log(data);
    }

    function onTyping(e) {

        // setIsTyping(true);
            
            socket.emit('typing', { username: username, chatRoomName: chatRoomName, id: id });


    }
    function onStopTyping(e) {
        setTimeout(() => {
            
            socket.emit('stopTyping', { username: username, chatRoomName: chatRoomName, id: id });
        }, 2000);
    }

    return (
        <>
            {username.length > 0 && chatRoomName.length > 0 && isConnected ?
                <div className='chat-general-cont'>

                    <div className='chat'>


                        {
                            messages?.map((message) => {
                                if (message.me) {
                                    return (

                                        <div className='message-holder' key={message.id}>
                                            <div className='spacer'></div>
                                            <p className='my-message' key={uuidv4()}>{message.message}</p>
                                        </div>
                                    );
                                }
                                return <div className='other-message-holder' key={message.id}>
                                    <small>{message.username}</small>
                                    <p className='otherMessage' key={uuidv4()}>{message.message}</p> </div>
                            })
                        }
                    </div>
                    <div className='sending-cont'>
                        <div>
                            {isTyping.event ? <p className='typing'>{isTyping.username} typing...</p> : null}
                        </div>

                        <div className='sending-row'>
                            <input type="text" value={message} onKeyDown={(e) => {
                                onTyping(e);
                                if (e.key === 'Enter') addMessage(e);
                            }} onBlur={(e) => onStopTyping(e.target.value)} onKeyUp={(e) => onStopTyping(e)} onChange={(e) => setMessage(e.target.value)} placeholder="Enter your message" />
                            {/* <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter your message" /> */}
                            <button onClick={(e) => addMessage(e)}>Send</button>
                        </div>
                    </div>
                </div>
                :
                <NameLogin onSubmit={(data) => login(data)} />
            }
        </>
    );


}

export default ChatRoom;