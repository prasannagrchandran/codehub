import React, { useContext, useState } from 'react';
import { UserContext } from './GlobalState';
import { Avatar } from '@material-ui/core';
import axios from 'axios';

import clsx from 'clsx';
import { Grid, TextField,Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';


export default function ProfileSetting(props) {
    const [user, setUser] = useContext(UserContext)
    const [alert, setAlert] = useState({ severity: '', label: '', active: false })

    const useStyles = makeStyles((theme) => ({
        root: {

            flexWrap: 'wrap',
        },
        margin: {
            marginTop: theme.spacing(1),
        },
        withoutLabel: {
            marginTop: theme.spacing(3),
        },
        textField: {
            width: '80%',
        },
        alert: {
            width: '75%',
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1)
        }
    }));
    const classes = useStyles();
    const [values, setValues] = React.useState({
        name: user.uname,
        password: user.password,
        showPassword: false,
        userprofile: user.user_img
    });

    const handleChange = (prop) => (event) => {
        if(prop==='userprofile'){
            var file = event.target.files[0];
            var reader = new FileReader();
    
            reader.onloadend = function () {                
                setValues({ ...values, [prop]: reader.result });
               
            }
            reader.readAsDataURL(file);
    
        }
        else{
            setValues({ ...values, [prop]: event.target.value });
        }
        
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };



    const updateProfile = () => {
        
        const data = {
            uname: values.name,
            password: values.password,
            user_img: values.userprofile,
                                                                                                                 
        }
        const options = {
            headers: {                
                'Content-Type': 'application/json'
            }
        };
        let url=`https://ssautomation.accenture.com/reactapi/api/login/${user.id}`
        axios.put(url, data, options)
            .then((response) => {   
                setUser({isLoggedin:true,id:user.id,uname:values.name,password:values.password,user_img:values.userprofile})                    
                
                setAlert({ severity: 'success', label: 'Profile updated...', active: true })
                                    
            })
            .catch(error => {                
                setAlert({ severity: 'error', label: 'Cant update bro... :)', active: true })
            })
    }

    return (
        <div data-aos="fade-left"
        data-aos-anchor="#example-anchor"
        data-aos-offset="500"
        data-aos-duration="500">            
            <h1>Account Settings</h1>
            <Tooltip title="change Profile">
                
            <Avatar src={user.user_img} ></Avatar>
            </Tooltip>
<br /><br />
            <TextField className={clsx(classes.marginTop, classes.textField)}
                id="outlined-required"
                label="User Name"
                defaultValue={user.uname}
                variant="outlined"
                required
                onChange={handleChange('name')}
            />
            <br />
            <br />
            <FormControl className={clsx(classes.marginTop, classes.textField)} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}

                    defaultValue={user.password}
                    onChange={handleChange('password')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    labelWidth={70}
                />
            </FormControl>
            <br />
            <br />
            <input key="userimg" type="file" onChange={handleChange('userprofile')} />
            <br />
            <br />


            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={updateProfile}
            >Update Profile</Button>

{alert?<><Alert className={clsx(classes.alert)} severity={alert.severity}>{alert.label}</Alert></>:<></>}
        </div>
    );
}

