import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { UserContext } from './GlobalState'

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

import PersistentDrawerLeft from './Sidenav';

function Login() {

    const [user, setUser] = useContext(UserContext)
    
    const [alert,setAlert]=useState({severity:'',label:'',active:false})

    const useStyles = makeStyles((theme) => ({
        root: {

            flexWrap: 'wrap',
        },
        margin: {
            marginTop:theme.spacing(1) ,
        },
        withoutLabel: {
            marginTop: theme.spacing(3),
        },
        textField: {
            width: '80%',
        },   
        alert:{
            width: '75%',
marginTop:theme.spacing(1),
marginBottom:theme.spacing(1)
       }     
    }));

    const submitHandler = () => {

        var url = 'https://ssautomation.accenture.com/reactapi/api/login?uname=' + values.name + '&password=' + values.password
        axios.get(url)
            .then((response) => {
                const datas = JSON.parse(response.data)
                if (datas.NewDataSet.Table.username) {
                    setAlert({alert:true,severity:"success",label:"Logged in Successfully"})

                    setUser({isLoggedin:true,id:datas.NewDataSet.Table.id,uname:values.name,password:values.password,user_img:datas.NewDataSet.Table.user_img})                    
                }
            })
            .catch(error => {
                setAlert({alert:true,severity:"error",label:"Check Details Bro... :) "})
            })
    }

    const classes = useStyles();
    const [values, setValues] = React.useState({
        id:'',
        name: '',
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (

        <div>
            {user.isLoggedin ? <PersistentDrawerLeft />: (
                <Grid container>
                    <Grid item md={6}>
                        
                    </Grid>
                    <Grid item md={6}>
                        
                    {alert?<><Alert className={clsx(classes.alert)} severity={alert.severity}>{alert.label}</Alert></>:<></>}
                        <h1>Login</h1>
                        
                        <TextField className={clsx(classes.marginTop, classes.textField)}
                            id="outlined-required"
                            label="User Name"
                            defaultValue=''
                            variant="outlined"
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
                            
                        
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={submitHandler}
                        >Login</Button>

                        <p>Dont have Account? <Link to="/Signup">Signup</Link> Here</p>
                        
                    </Grid>
                </Grid>)}

        </div>

    );

}

export default Login;