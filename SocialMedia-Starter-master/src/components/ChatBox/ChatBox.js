import React, { useEffect, useRef, useState } from 'react'
import classes from './ChatBox.module.css'
import { useSelector } from 'react-redux';
import { getUser } from '../../api/UserRequest';
import classes1 from '../FollowersCard/Followercard.module.css'
import { addMessage, getMessages } from '../../api/MessageRequest';
import { format } from 'timeago.js';
import InputEmoji from 'react-input-emoji';
const ChatBox = ({ chat, currentUser,setsendmessage,receivemessage }) => {


    const { user } = useSelector((state) => state.authReducer.authData);
    const [userData, setUserData] = useState(null);
    const [messages, setmessages] = useState([])
    const [newmessage, setnewmessage] = useState()
     const scroll = useRef()
const imageRef = useRef()
    useEffect(()=> {
        if(receivemessage !== null && receivemessage.chatId === chat._id) {
            setmessages([...messages, receivemessage]);

        }
    },[receivemessage])
    useEffect(() => {
        const userId = chat?.members?.find((id) => id !== currentUser);
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId);
                setUserData(data);

            } catch (error) {
                console.log(error);
            }
        };
        if (chat !== null) getUserData();

    }, [chat, currentUser])

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await getMessages(chat._id);
                console.log(data)
                setmessages(data);
            } catch (error) {
                console.log(error);
            }
        };

        if (chat !== null) fetchMessages();
    }, [chat]);

    const handleChange = (newmessage) => {
        setnewmessage(newmessage)
    }
const handlesend = async (event) => {
    event.preventDefault();
    const message = {
        senderId : currentUser,
        text : newmessage,
        chatId:chat._id
    }
  try {
    const {data} = await addMessage(message)
    setmessages([...messages,data])
  } catch (error) {
    console.log(error)
  }

  const receiverId = chat.members.find((id) => id !== currentUser);
  setsendmessage({...message,receiverId})
  setnewmessage("")

}

useEffect(()=>{
    scroll.current?.scrollIntoView({behaviour:"smooth"})
},[messages])
    return (
        <>
            <div className={classes.ChatBoxcontainer}>
                {chat ? (
                <>
                    <div className={classes.chatheader}>
                        <div className={classes1.follower}>
                            <div>
                                <div className={classes.onlinedot}></div>
                                <img
                                    src={userData?.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.jpg"}
                                    alt="Profile"
                                    className={classes1.followerimg}
                                    style={{ width: "50px", height: "50px" }}
                                />
                                <div className={classes1.name} style={{ fontSize: '0.8rem' }}>
                                    <span>{userData?.firstname} {userData?.lastname}</span>

                                </div>
                            </div>

                        </div>
                        <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
                    </div>
                    <div className={classes.chatbody}>
                        {messages.map((message) => (
                            <>
                                <div ref={scroll}
                                className={message.senderId === currentUser ? `${classes.message} ${classes.own}` : classes.message}>
                                    <span>{message.text}</span>
                                    <span>{format(message.createdAt)}</span>
                                </div>
                            </>
                        ))}
                    </div>

                    <div className={classes.chatsender}>
                        <div onClick={() => imageRef.current.click()}>+</div>
                        <InputEmoji
                            value={newmessage}
                            onChange={handleChange}
                        />
                        <div className={`${classes.sendbutton} button`}  onClick={handlesend}>Send</div>
                        <input
                            type="file" 
                            name=""
                            id=""
                            style={{ display: "none" }}
                            ref={imageRef}
                        />
                    </div>{" "}

                </>
                ) : (
                <span className={classes.chatboxemptymessage} style={{textAlign:'center'}}>Tap on chat and have fun ...</span>
                )
                        }
                 
            </div>
        </>

    )
}

export default ChatBox