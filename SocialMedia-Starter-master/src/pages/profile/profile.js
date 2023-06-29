import React from 'react'
import classes from './profile.module.css'
import Profileleft from '../../components/Profileleft/Profileleft'
import Profilecard from '../../components/Profilecard/Profilecard'
import Postside from '../../components/Postside/Postside'
import Rightside from '../../components/RightSide/Rightside'
 const Profile = () => {
    return (
        <div className={classes.Profile}>
            <Profileleft />
            <div className={classes.profilecenter}>
                <Profilecard location="profilePage"/>
                <Postside/>
            </div>
            <Rightside/>
        </div>
    )
}

export default Profile