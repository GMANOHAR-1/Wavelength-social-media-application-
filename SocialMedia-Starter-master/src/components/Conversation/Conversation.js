import React, { useEffect, useState } from 'react'
import { getUser } from '../../api/UserRequest';
import classes from '../../pages/Chat/Chat.module.css'
import classes1 from '../FollowersCard/Followercard.module.css'
const Conversation = ({ data, currentUser,online }) => {
    const [userData, setUserData] = useState(null);
 
    useEffect(() => {
        const userId = data.members.find((id) => id !== currentUser)
        console.log(userId)
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId);
                setUserData(data)
                console.log(userData)
            } catch (error) {
                console.log(error)
            }

        }
        getUserData()
    }, [])
    return (
        <>
      <div className={`${classes.conversation} ${classes1.follower}`}>
        <div>
          {online && <div className={classes.onlinedot}></div>}
          <img
            src={userData?.profilePicture? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.jpg"}
            alt="Profile"
            className={classes1.followerimg}
            style={{ width: "50px", height: "50px" }}
          />
          <div className={classes1.name} style={{fontSize: '0.8rem'}}>
            <span>{userData?.firstname} {userData?.lastname}</span>
            <span style={{color: online?"#51e200":""}}>{online ? "Online" : "Offline"}</span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
    )
}

export default Conversation