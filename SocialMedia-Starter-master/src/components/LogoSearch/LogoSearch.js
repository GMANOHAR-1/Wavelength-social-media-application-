import React from 'react';
import classes from './LogoSearch.module.css';
import Logo from '../../img/logo.png';
import { UilSearch } from '@iconscout/react-unicons';

const LogoSearch = () => {
  return (
    <div className={classes.LogoSearch}>
      <img src={Logo} alt='logo' />
      <div className={classes.Search}>
        <input type='text' placeholder='#Explore' />
        <div className={classes.sicon}>
          <UilSearch />
        </div>
      </div>
    </div>
  );
}

export default LogoSearch;
