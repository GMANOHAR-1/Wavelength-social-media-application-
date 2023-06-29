import React from 'react'
import classes from './Profilecard.module.css';
import Cover from '../../img/cover.jpg'
import profile from '../../img/profileImg.jpg'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
const Profilecard = ({ location }) => {

    const { user } = useSelector((state) => state.authReducer.authData)
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
    const posts = useSelector((state) => state.postReducer.posts)

    return (
        <div className={classes.Profilecard}>
            <div className={classes.ProfileImages}>
                <img src={user.coverPicture ? serverPublic + user.coverPicture : serverPublic + "defaultCover.jpg"} alt='coverimage'></img>
                <img src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "defaultProfilePhoto.jpg"} alt='profile'></img>
            </div>
            <div className={classes.ProfileName}>
                <span>{user.firstname} {user.lastname}</span>
                <span>{user.worksAt ? user.worksAt : "thinking..."}</span>
            </div>
            <div className={classes.followStatus}>
                <hr />
                <div>
                    <div className={classes.follow}>
                        <span>{user.following.length}</span>
                        <span>following</span>
                    </div>
                    <div className={classes.vl}></div>
                    <div className={classes.follow}>
                        <span>{user.followers.length}</span>
                        <span>followers</span>
                    </div>
                    {location === 'profilePage' && (
                        <>
                            <div className={classes.vl}> </div>
                            <div className={classes.follow}>
                                <span>{posts.filter((post) =>
                                    post.userId === user._id
                                ).length}</span>
                                <span>posts</span>
                            </div>
                        </>
                    )}
                </div>
                <hr />
            </div>
            {location === 'profilePage' ? "" : <span>
                <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/profile/${user._id}`}> My Profile </Link>

            </span>}

        </div>

    )
}

export default Profilecard