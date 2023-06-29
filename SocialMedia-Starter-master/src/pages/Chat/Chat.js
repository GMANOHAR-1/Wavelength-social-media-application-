import React, { useEffect, useRef, useState } from 'react'
import classes from './Chat.module.css';
import Logosearch from '../../components/LogoSearch/LogoSearch.js'
import { useSelector } from 'react-redux';
import { userChats } from '../../api/ChatRequest';
import Conversation from '../../components/Conversation/Conversation';
import NavIcons from '../../components/NavIcons/NavIcons';
import ChatBox from '../../components/ChatBox/ChatBox';
import { io } from 'socket.io-client'

const Chat = () => {
    const { user } = useSelector((state) => state.authReducer.authData);
    console.log(user._id)
    const [chats, setChats] = useState([]);
    const [currentChat, setcurrentChat] = useState(null)
    const [onlineUsers, setonlineUsers] = useState([])
    const [sendmessage, setsendmessage] = useState(null)
    const [receivemessage, setreceivemessage] = useState(null)
    const socket = useRef()


    useEffect(() => {
        socket.current = io('http://localhost:8081');
        socket.current.emit("new-user-add", user._id);
        socket.current.on('get-users', (users) => {
            setonlineUsers(users)
          
        })
    }, [user])
    useEffect(() => {
        if (sendmessage !== null) {
            socket.current.emit('send-message', sendmessage)
        }
    }, [sendmessage])

    useEffect(() => {
        socket.current.on("receive-message", (data) => {
            setreceivemessage(data)
            console.log(data)
        })
    }, [])

    useEffect(() => {
        const getChats = async () => {
            try {
                const { data } = await userChats(user._id)
                setChats(data)
             
            } catch (error) {
                console.log(error)
            }
        }
        getChats()
    }, [user])


    const checkOnlineStatus = (chat) =>{
        const chatMember = chat.members.find((member) => member !== user._id);
        const online = onlineUsers.find((user) => user.userId === chatMember);
        return online ? true : false;
    }
    return (
        <div className={classes.Chat}>
            <div className={classes.Leftsidechat}>
                <Logosearch />
                <div className={classes.Chatcontainer}>
                    <h2>chats</h2>
                    <div className={classes.Chatlist}>
                        {chats.map((chat) => (
                            <div onClick={() => setcurrentChat(chat)}>
                                <Conversation data={chat} currentUser={user._id} online={checkOnlineStatus(chat)}/>
                            </div>
                        ))}

                    </div>
                </div>

            </div>
            <div className={classes.Rightsidechat}>
                <div style={{ width: "20rem", alignSelf: "flex-end" }}>
                    <NavIcons />
                </div>
                {<ChatBox
                    chat={currentChat}
                    currentUser={user._id}
                    setsendmessage={setsendmessage}
                    receivemessage={receivemessage}
                />}

            </div>
        </div>
    )
}

export default Chat;