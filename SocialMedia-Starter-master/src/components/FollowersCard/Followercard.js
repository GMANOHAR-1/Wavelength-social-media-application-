import React, { useEffect, useState } from 'react'
import classes from './Followercard.module.css'
import { followers } from '../../data/Followersdata'
import User from '../User/User'
import { getAllUser } from '../../api/UserRequest'
import { useSelector } from 'react-redux'
const Followercard = () => {
    const [persons, setPersons] = useState([])
    const { user } = useSelector((state) => state.authReducer.authData)

    useEffect(() => {
        const fetchPersons = async () => {
            const { data } = await getAllUser();
           setPersons(data)
        };
        fetchPersons()
    }, [])
    return (
        <div className={classes.Followerscard}>
            <h4>Your Admires</h4>
            {persons.map((follower) => {
               if(follower._id !== user._id)
                return (
                    <User person={follower} key={follower._id} />
                )
            })}
        </div>
    )
}

export default Followercard