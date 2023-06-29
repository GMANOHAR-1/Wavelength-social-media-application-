import { useDisclosure } from '@mantine/hooks';
import { Modal, useMantineTheme } from '@mantine/core';
import classes from '../../pages/Auth/Auth.module.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { uploadImage } from '../../actions/uploadActions';
import { updateUser } from '../../actions/UserAction';
function ProfileModal({ modalopened, setmodelopened, data }) {
    const [opened, { open, close }] = useDisclosure(false);
    const theme = useMantineTheme();
    const { password, ...other } = data;
    const [formData, setformData] = useState(other)
    const [profileImage, setProfileImage] = useState(null)
    const [coverimage, setcoverimage] = useState(null);
    const [skills, setskills] = useState('')
    const dispatch = useDispatch();
    const param = useParams();
    const handleChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value })
    }
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            event.target.name === 'profilePicture' ? setProfileImage(img) : setcoverimage(img)
 
        }
    }

    const  handlesubmit = (e) =>{
        e.preventDefault();
        let UserData = formData;
        if(profileImage){
            const data = new FormData()
            const fileName = Date.now() + profileImage.name
            data.append("name",fileName);
            data.append("file",profileImage);
            UserData.profilePicture = fileName;
          
            try{
                dispatch(uploadImage(data));
                
            }
            catch(err){
                console.log(err);
            }
        }
        if(coverimage){
            const data = new FormData()
            const fileName =    Date.now()+coverimage.name
            data.append("name",fileName);
            data.append("file",coverimage);
            UserData.coverPicture = fileName;
            try{
                dispatch(uploadImage(data));
            }
            catch(err){
                console.log(err);
            }
        }
        if(skills){
            
            UserData.skills = skills
        }
        dispatch(updateUser(param.id,UserData))
        setmodelopened(false);
    }
    const skillhandler = (e) => {
       let skill =  e.target.value;
       skill = skill.split(',').map(skill => skill.trim())
       setskills(skill)
    }

    return (
        <>
            <Modal
                opened={modalopened}
                onClose={() => setmodelopened(false)}
                size='45%'

                overlayProps={{
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
                    opacity: 0.55,
                    blur: 3,
                }}

            >
                <form className={classes.infoform}>
                    <h3>Your info</h3>
                    <div>
                        <input type='text' className={classes.infoinput}
                            name='firstname' placeholder='First Name' onChange={handleChange} value={formData.firstname} />
                        <input type='text' className={classes.infoinput}
                            name='lastname' placeholder='Last Name' onChange={handleChange} value={formData.lastname} />

                    </div>
                    <div>
                        <input type='text' className={classes.infoinput}
                            name='skills' placeholder='Skills ' onChange={skillhandler} value={formData.Skills} />

                        <input type='text' className={classes.infoinput}
                            name='worksAt' placeholder='Works at' onChange={handleChange} value={formData.worksAt} />
                    </div>
                    <div>
                        <input type='text' className={classes.infoinput}
                            name='livesin' placeholder='Lives in' onChange={handleChange} value={formData.livesin} />
                        <input type='text' className={classes.infoinput}
                            name='country' placeholder='Country ' onChange={handleChange} value={formData.country} />

                    </div>
                    <div>
                        <input type='text' className={classes.infoinput}
                            name='status' placeholder='RelationShip status ' onChange={handleChange} value={formData.status} />
                    </div>
                    <div>
                        Profile Image
                        <input type='file' name='profilePicture' onChange={onImageChange} />
                        Cover Image
                        <input type='file' name='coverPicture' onChange={onImageChange} />
                    </div>
                    <button type='submit' className={`button ${classes.infobutton}`} onClick={handlesubmit}>Update</button>
                </form>
            </Modal>


        </>
    );
}

export default ProfileModal;