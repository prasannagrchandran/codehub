import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

import { Grid, TextField } from '@material-ui/core';
import clsx from 'clsx';
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




function Signup() {

    const [alert,setAlert]=useState({severity:'',label:'',active:false})
    
    const addUser = () => {
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
        axios.post('https://ssautomation.accenture.com/reactapi/api/login', data, options)
            .then((response) => {
                console.log(response)
                setAlert({severity:'success',label:'We Added you...Happy Hacking...',active:true})
            })
            .catch(error => {
                setAlert({severity:'error',label:'Cant add you dood... :)',active:true})
            })
    }
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
        name: '',
        password: '',
        showPassword: false,
        userprofile:''
    });

    const handleChange = (prop) => (event) => {
        if(prop==='userprofile'){
            var file = event.target.files[0];
            var reader = new FileReader();
    
            reader.onloadend = function () {                
                setValues({ ...values, [prop]: reader.result });
                /******************* for Binary ***********************/
                // var data = (reader.result).split(',')[1];
                //  binarydata = atob(data);
                // console.log('Encoded Binary File String:', binarydata);
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


    return (
        <form className="add-user" autoComplete="off" >
            <Grid container>
                <Grid item md={6}>

                </Grid>
                <Grid item md={6}>

                    {alert ? <><Alert className={clsx(classes.alert)} severity={alert.severity}>{alert.label}</Alert></> : <></>}
                    <h1>Signup</h1>

                    <TextField className={clsx(classes.marginTop, classes.textField)}
                        id="outlined-required"
                        label="User Name"
                        defaultValue=''
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

                            defaultValue=''
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
                        onClick={addUser}
                    >SignUp</Button>

                    <p>Already have an Account? <Link to="/Login">Login</Link> Here</p>

                </Grid>
            </Grid>


        </form>

    );
}

export default Signup;