import React from "react";
import classes from './home.module.css';
 import Profileside from "../../components/profileside/profileside.js";
import Postside from "../../components/Postside/Postside";
import Rightside from "../../components/RightSide/Rightside";
const Home = () => {
    return (
        <div className={classes.Home}>
             <Profileside />
            <Postside/>
            <Rightside/>
        </div>
    )


}

export default Home;