import React,{useContext} from 'react';
import  {UserContext} from './GlobalState'



function CheckContext(props) {   
    const changeHandler=()=>{
        setUser('a')
        }

    const [user,setUser]=useContext(UserContext)
    return (
        <div>
            {user===''?<p>not logged</p>:<p>logged {user}</p>}
        <p> uname {user}</p>
        <button onClick={changeHandler}>login</button>
    </div>
    );
}

export default CheckContext;