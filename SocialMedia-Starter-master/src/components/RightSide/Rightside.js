import React from 'react'
import classes from './Rightside.module.css';
import Trendcard from '../Trendcard/Trendcard';
import { useState } from 'react';
import ShareModal from '../ShareModal/ShareModal';
import NavIcons from '../NavIcons/NavIcons';
const Rightside = () => {
    const [modelopened, setmodelopened] = useState(false);

    return (
        <div className={classes.Rightside}>
            <NavIcons />
            <Trendcard />
            <button className={`button ${classes.rbutton}`} onClick={() =>
                setmodelopened(true)}>Share
            </button>
            <ShareModal modalopened={modelopened} setmodelopened={setmodelopened} />
        </div>

    )
}

export default Rightside