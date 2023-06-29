import React, { useEffect, useState } from 'react'
import classes from './InfoCard.module.css'
import { UilPen } from '@iconscout/react-unicons'
import ProfileModal from '../ProfileModal/ProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as UserApi from '../../api/UserRequest.js'
import { logout } from '../../actions/AuthAction';
const InfoCard = () => {
    const [modelopened, setmodelopened] = useState(false);
    const dispatch = useDispatch()
    const params = useParams();
    const profileUserId = params.id;
    const [profileuser, setprofileuser] = useState({});
    const { user } = useSelector((state) => state.authReducer.authData);
    useEffect(() => {
        const fetchProfileUser = async () => {
            if (profileUserId === user._id) {
                setprofileuser(user)
            }
            else {
                const profileUser = await UserApi.getUser(profileUserId)
                setprofileuser(profileUser)

            }

        }
        fetchProfileUser();
    }, [user]);

    const logouthandler = () =>{
        dispatch(logout())
    }
    return (
        <div className={classes.InfoCard}>
            <div className={classes.infohead}>
                <h4>Profile Imfo</h4>

                {user._id === profileUserId &&
                    <div>
                        <UilPen width='2rem' height='1.2rem' onClick={() =>
                            setmodelopened(true)} />
                        <ProfileModal modalopened={modelopened} setmodelopened={setmodelopened} data={user}/>
                    </div>
                }
            </div>
            <div className={classes.info}>
                <span>
                    <b>Status </b>
                </span>
                <span>
                    {profileuser.status}
                </span>
            </div>
            <div className={classes.info}>
                <span>
                    <b>Lives In </b>
                </span>
                <span>
                    {profileuser.livesin}
                </span>
            </div>
            <div className={classes.info}>
                <span>
                    <b>Works At </b>
                </span>
                <span>
                    {profileuser.worksAt}
                </span>
            </div>
            <div className={classes.info}>
                <span>
                    <b>Skills </b>
                </span>
                <span>
                    <ul>
                        {profileuser.skills && profileuser.skills.map((skill) => (
                            <li style={{ textDecoration: 'none', fontWeight: 'bold' }}>{skill}</li>
                        ))}
                    </ul>

                </span>
            </div>
            <button className={`button ${classes.logoutbutton}`} onClick={logouthandler}>Logout</button>

        </div>
    )
}

export default InfoCard