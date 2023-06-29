import React from 'react'
import classes from './Postside.module.css'
import Postshare from '../Postshare/Postshare'
import Posts from '../Posts/Posts'
const Postside = () => {
  return (
    <div className={classes.PostSide}> 
   <Postshare/>
   <Posts/>
    </div>
  )
}

export default Postside