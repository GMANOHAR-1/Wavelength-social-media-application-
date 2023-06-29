import React from 'react'
import classes from './Profileleft.module.css'
import LogoSearch from '../LogoSearch/LogoSearch'
import Followercard from '../FollowersCard/Followercard'
import InfoCard from '../InfoCard/InfoCard'
const Profileleft = () => {
    return (
        <div className={classes.Profileleft}>
           <LogoSearch/>
           <InfoCard/>
           <Followercard/>
        </div>
    )
}

export default Profileleft