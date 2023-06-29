import React from 'react'
import LogoSearch from '../LogoSearch/LogoSearch'
import classes from './profileside.module.css'
import Profilecard from '../Profilecard/Profilecard'
import Followercard from '../FollowersCard/Followercard'
const Profileside = () => {
  return (
   <div className={classes.ProfileSide}>
    <LogoSearch/>
    <Profilecard/>
    
    <Followercard/>
   </div>
  )
}

export default Profileside