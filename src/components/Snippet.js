import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import Container from '@material-ui/core/Container';
import {Skeleton,Rating} from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {Tooltip} from '@material-ui/core';
import Starter from './Starter';


export default function SnippetCard(props) {
    const [snippets, setSnippets] = useState([])
    const [loaded, setLoad] = useState(false)

    useEffect(() => {

        var url = 'https://ssautomation.accenture.com/reactapi/api/codehub?category=' + props.post.category + '&name=' + props.post.name;
        axios.get(url)
            .then(response => {
                const datas = JSON.parse(response.data)

                if (datas.NewDataSet.Table.length === undefined) {

                    let temp = []
                    temp.push(datas.NewDataSet.Table);
                    setSnippets(temp)
                }
                else {
                    setSnippets(datas.NewDataSet.Table)
                }
                setLoad(true)

            })
            .catch(error => {
                console.log(error);
            })
    }, [props.post]);

    const copyToclip = (event) => {

        const copyText = event.target;
        copyText.select()
        document.execCommand("copy")
        event.target.title = "Copied";
    }

    return (
        <div>

            <Container>

                {
                    !props.post.name ? <Starter /> :
                        loaded ? (
                            snippets.map(snippet =>

                                <div key={snippet.id} className="post" data-aos="fade-up-right"
                                data-aos-duration="500">
                                    <h3>{snippet.title}</h3>
                                    <p>{snippet.description}</p>
                                    <br />
                                    <Tooltip title="Copy to Clipboard" arrow={true} placement="top-end" onClick={copyToclip}>
                                        <TextareaAutosize className="snippet-card" value={snippet.code} readOnly>
                                            <code>{snippet.code}</code>
                                        </TextareaAutosize>
                                    </Tooltip>
                                    <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                                </div>)) : (<Box mt={5} p={10} boxShadow={6}>
                                    <Skeleton variant="rect" animation="wave" width={150} />
                                    <br />
                                    <Skeleton variant="rect" animation="wave" height={30} />
                                    <br />
                                    <Skeleton variant="rect" animation="wave" height={220} />
                                </Box>)


                }
            </Container>

        </div>
    );
}

