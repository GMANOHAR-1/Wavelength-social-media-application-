import React from "react";

import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import classes from '../RightSide/Rightside.module.css'
const NavIcons = () => {
  return (
    <div className={classes.navicons}>
      <Link to="../home">
        <img src={Home} alt="" />
      </Link>
      <UilSetting />
      <img src={Noti} alt="" />
      <Link to="../chat">
        <img src={Comment} alt="" />
      </Link>
    </div>
  );
};

export default NavIcons;