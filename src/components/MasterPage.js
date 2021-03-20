import React,{useContext} from 'react';

import {UserContext} from './GlobalState'

import PersistentDrawerLeft from './Sidenav'
import Login from './Login';




function MasterPage() {
    const [user,setUser]=useContext(UserContext)
    return (
        <div>                     
            {user.isLoggedin?<><PersistentDrawerLeft /></>:<Login />}
        </div>
    );
}

export default MasterPage;