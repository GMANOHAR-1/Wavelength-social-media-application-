import React, { useState } from 'react'
import classes from './Auth.module.css'
import logo from '../../img/logo.png';
import { useDispatch, useSelector } from 'react-redux'
import { login, signup } from '../../actions/AuthAction';
const Auth = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.authReducer.loading)
    const [isSignup, setIsSignup] = useState(false);
    const [data, setdata] = useState({ firstname: '', lastname: '', email: '', username: '', password: '', confirmpassword: '' })
    const [confirmpass, setconfirmpass] = useState(false)
 
    const handlerchange = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            (data.password === data.confirmpassword) ? dispatch(signup(data))
                : setconfirmpass(false)
        }
        else {
            dispatch(login(data))
        }
    }

    const resetform = () => {
        setconfirmpass(true);
        setdata({
            firstname: '', lastname: '', email: '', username: '', password: '', confirmpassword: ''
        })
    }
    return (
        <div className={classes.Auth}>
            <div className={classes.aleft}>
                <img src={logo}></img>
                <div className={classes.Webname}>
                    <h1>WaveLength PVT LMT</h1>
                    <h3>Invest the skills in You</h3>
                </div>
            </div>
            {/* right side */}
            <div className={classes.aright}>
                <form className={`${classes.infoform} ${classes.authform}`} onSubmit={handlesubmit}>
                    <h3>{isSignup ? "Sign up " : "Log In"}</h3>

                    {isSignup && <div>
                        <input type='text' placeholder='First Name'
                            className={classes.infoinput} name='firstname' onChange={handlerchange} value={data.firstname} />
                        <input type='text' placeholder='Last Name'
                            className={classes.infoinput} name='lastname' onChange={handlerchange} value={data.lastname} />

                    </div>}

                    <div>
                        <input type='email' placeholder='Email'
                            className={classes.infoinput} name='email' onChange={handlerchange} value={data.email} />
                        <input type='text' placeholder='User Name'
                            className={classes.infoinput} name='username' onChange={handlerchange} value={data.username} />
                    </div>
                    <div>
                        <input type='password' placeholder='password'
                            className={classes.infoinput} name='password' onChange={handlerchange} value={data.password} />
                        {isSignup && <input type='password' placeholder='confirm password'
                            className={classes.infoinput} name='confirmpassword' onChange={handlerchange} value={data.confirmpassword} />}


                    </div>
                    {isSignup &&
                        <span style={{ display: confirmpass ? "none" : "block", color: 'red', fontSize: '12px', alignSelf: "flex-end", marginRight: "5px" }}>
                            * Confirm Password not matching
                        </span>}

                    <div>
                        <span style={{ fontSize: '12px', cursor: 'pointer' }} onClick={() => {
                            setIsSignup(prev => !prev);
                            resetform();
                        }}>
                            {isSignup ? "Already have an account. Login" : "Donot have an account Signup"}</span>
                    </div>
                    
                    <button type='submit' className={`button ${classes.infobutton}`}  >
                        {loading ?
                           <svg
                           xmlns="http://www.w3.org/2000/svg"
                           viewBox="0 0 100 100"
                           preserveAspectRatio="xMidYMid"
                           className="loading-spinner"
                           style={{ width: '50px', height: '50px' }} // Adjust size as needed
                         >
                           <circle cx="50" cy="50" fill="none" stroke="#009BFF" strokeWidth="6" r="20" strokeDasharray="94.24777960769379 31.41592653589793">
                             <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1" />
                           </circle>
                         </svg>
                            : isSignup ? "Signup" : "login"}</button>

                </form>
            </div>

        </div>
    )
}

export function Login() {
    return (
        <div className={classes.aright}>
            <form className={`${classes.infoform} ${classes.authform}`}>
                <h3>Login</h3>

                <div>
                    <input type='text' placeholder='User Name'
                        className={classes.infoinput} name='Username' />
                </div>
                <div>
                    <input type='password' placeholder='password'
                        className={classes.infoinput} name='password' />

                </div>
                <div>
                    <span style={{ fontSize: '12px' }}>Donot have an account. Signup</span>
                </div>
                <button type='submit' className={`button ${classes.infobutton}`}>Login</button>

            </form>
        </div>
    )
}


export function Signup() {
    return (
        <div className={classes.aright}>
            <form className={`${classes.infoform} ${classes.authform}`}>
                <h3>Sign up</h3>
                <div>
                    <input type='text' placeholder='First Name'
                        className={classes.infoinput} name='firstname' />
                    <input type='text' placeholder='Last Name'
                        className={classes.infoinput} name='Lastname' />

                </div>
                <div>
                    <input type='email' placeholder='Email'
                        className={classes.infoinput} name='email' />
                    <input type='text' placeholder='User Name'
                        className={classes.infoinput} name='Username' />
                </div>
                <div>
                    <input type='password' placeholder='password'
                        className={classes.infoinput} name='password' />
                    <input type='password' placeholder='confirm password'
                        className={classes.infoinput} name='Confirm Password' />

                </div>
                <div>
                    <span style={{ fontSize: '12px' }}>Already have an account. Login</span>
                </div>
                <button type='submit' className={`button ${classes.infobutton}`}>Signup</button>

            </form>
        </div>
    )
}

export default Auth