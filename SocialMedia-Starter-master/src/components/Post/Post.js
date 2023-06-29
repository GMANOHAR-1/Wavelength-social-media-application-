import React, { useState } from 'react'
import classes from './Post.module.css';
import comment from '../../img/comment.png'
import share from '../../img/share.png'
import like from '../../img/like.png'
import dislike from '../../img/notlike.png'
import { useSelector } from 'react-redux';
import { likePost } from '../../api/postRequest';
const Post = ({ data }) => {
    console.log(data)
    const { user } = useSelector((state) => state.authReducer.authData)
  
    const [liked, setliked] = useState(data.likes.includes(user._id))
    const [likes, setlikes] = useState(data.likes.length)
    console.log(process.env.REACT_APP_PUBLIC_FOLDER, data)
 const handleclick = ()=>{
    setliked((prev)=>!prev)
    
    likePost(data._id,user._id)
    liked ? setlikes((prev) => prev-1) : setlikes((prev)=>prev+1)
 }
 
    return (
        <div className={classes.post}>
            <img src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""} alt='' onDoubleClick={handleclick} style={{cursor:'pointer'}}></img>
            <div className={classes.postReact}>
                <img src={liked ? like : dislike}  style={{cursor:'pointer'}} onClick={handleclick}/>
                <img src={comment} />
                <img src={share} />
            </div>
            <span style={{ color: "var(--gray)", fontSize: '12px' }}>{likes} likes</span>
            <div className={classes.detail}>
                <span><b>{data.name}</b></span>
                <span> {data.desc}</span>
            </div>
        </div>
    )
}

export default Post