import React, { useState } from 'react';

export const UserContext = React.createContext('');
export const CompAddedContext = React.createContext('component');

const GlobalState = ({ children }) => {
    const [user, setUser] = useState({ isLoggedin:false,id:'',uname: '', password: '', user_img: '' })
    const [newPost, setNewpost] = useState('')

    return (
        <>
            <CompAddedContext.Provider value={[newPost, setNewpost]}>
                <UserContext.Provider value={[user, setUser]}>
                    {children}
                </UserContext.Provider>
            </CompAddedContext.Provider>
        </>
    );
}

export default GlobalState;