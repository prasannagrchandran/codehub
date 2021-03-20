import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';




export default function Navbar() {
    const [username, setUsername] = useState('')
    const [userProfile, setProfile] = useState('')

    useEffect(() => {
        axios.get('https://ssautomation.accenture.com/reactapi/api/login')
            .then(response => {
                const datas = JSON.parse(response.data)
                let imgdata
                

                if (datas.NewDataSet.Table.user_img !== "" && datas.NewDataSet.Table.user_img !== null) {                    
                    if (datas.NewDataSet.Table.length === undefined) {
                        setUsername(datas.NewDataSet.Table.username)
                        imgdata = datas.NewDataSet.Table.user_img
                    }
                    else {
                        setUsername(datas.NewDataSet.Table[1].username)
                        imgdata = datas.NewDataSet.Table[1].user_img
                    }

                }
                else {
                    imgdata = require('../images/unknown_img.png');
                }

                setProfile(imgdata)



            })
            .catch(error => {
                console.log(error);
            })
    });


    return (
        <div>
            {

                <nav>
                    <p>{username}</p>
                    <img className="user-img" src={userProfile} alt="user-img"></img>
                    <br />
                    <br />
                </nav>

            }


        </div>
    );
}

