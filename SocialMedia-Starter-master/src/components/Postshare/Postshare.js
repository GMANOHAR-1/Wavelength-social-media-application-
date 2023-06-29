import React, { useState, useRef } from 'react'
import classes from './Postshare.module.css'
import profileimg from '../../img/profileImg.jpg'
import { UilScenery } from '@iconscout/react-unicons'
import { UilPlayCircle } from '@iconscout/react-unicons'
import { UilLocationPoint } from '@iconscout/react-unicons'
import { UilSchedule } from '@iconscout/react-unicons'
import { UilTimes } from '@iconscout/react-unicons'
import { useSelector, useDispatch } from 'react-redux'
import { uploadImage } from '../../actions/uploadActions'
import { uploadPost } from '../../actions/uploadActions'
const Postshare = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.postReducer.loading)
    const { user } = useSelector((state) => state.authReducer.authData)
    const [image, setImage] = useState(null);
    const imageRef = useRef();
    const desc = useRef();
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage(img);

        }
    }
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

    const reset = () => {
        setImage(null);
        desc.current.value = ""
    }
    const handlesubmit = (event) => {
        event.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }
        if (image) {
            const data = new FormData()
            const filename = Date.now() + image.name
            data.append("name", filename)
            data.append("file", image)
            newPost.image = filename
            console.log(newPost)
            try {
                dispatch(uploadImage(data))
            } catch (err) {
                console.log(err)
            }
            dispatch(uploadPost(newPost))
            console.log(newPost)
            reset()
        }
    }
    return (

        <div className={classes.Postshare}>
            <img src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "defaultProfilePhoto.jpg"} alt='postshare'></img>
            <div>
                <input ref={desc} required type='text' placeholder='whats happening'></input>
                <div className={classes.postOptions}>
                    <div className={classes.option}
                        style={{ color: 'var(--photo)' }} onClick={() => imageRef.current.click()}>
                        <UilScenery />photo
                    </div>
                    <div className={classes.option} style={{ color: 'var(--video)' }}>
                        <UilPlayCircle />video
                    </div>
                    <div className={classes.option} style={{ color: 'var(--location)' }}>
                        <UilLocationPoint />Location
                    </div>
                    <div className={classes.option} style={{ color: 'var(--schedule)' }}>
                        <UilSchedule />schedule
                    </div>
                    <button className={`button ${classes.psbutton}`} onClick={handlesubmit} disabled={loading}>
                        {loading ? "..." : "share"}</button>
                    <div style={{ display: 'none' }}>
                        <input type='file' name='myImage' ref={imageRef} onChange={onImageChange}></input>
                    </div>

                </div>
                {image &&
                    <div className={classes.previewImage}>
                        <UilTimes onClick={() => setImage(null)} />
                        <img src={URL.createObjectURL(image)} alt='imag'></img>
                    </div>
                }
            </div>

        </div>

    )
}

export default Postshare