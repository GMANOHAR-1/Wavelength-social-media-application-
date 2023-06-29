import React, { useState } from 'react'
import classes from '../FollowersCard/Followercard.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { followuser, unfollowuser } from '../../actions/UserAction'

const User = ({ person }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.authReducer.authData)
  const [following, setfollowing] = useState(person.followers.includes(user._id))
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const handlefollow = () => {
    following ?
      dispatch(unfollowuser(person._id, user)) :
      dispatch(followuser(person._id, user))

    setfollowing((prev) => !(prev))
  }
  return (
    <div className={classes.follower}>
      <div>
        <img src={person.profilePicture ? serverPublic + person.profilePicture : serverPublic + "defaultProfilePhoto.jpg"} className={classes.followerimg}></img>
        <div className={classes.name}>
          <span>{person.firstname} {person.lastname}</span>
          <span>@{person.username}</span>
        </div>

      </div>
      <button className={following ? `button ${classes.fcbutton}` : `button ${classes.fcbutton} ${classes.unfollowbutton}`} onClick={handlefollow}>{following ? "unfollow" : "follow"}</button>

    </div>
  )
}

export default User;