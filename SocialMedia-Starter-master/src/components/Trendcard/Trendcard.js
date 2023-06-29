import React from 'react'
import classes from './Trendcard.module.css'
import { trenddata } from '../../data/trenddata'
const Trendcard = () => {
    return (
        <div className={classes.trendcard}>
            <h3>trends for you</h3>
            {trenddata.map((trend) => {
                return (
                    <div className={classes.trend}>
                        <span>#{trend.name}</span>
                        <span> {trend.shares}k shares</span>
                    </div>
                )
            })}
        </div>
    )
}

export default Trendcard