import React from 'react';
import {Typography,Grid} from '@material-ui/core'

export default function Starter(props) {
    return (
        <div>
            <Typography align="center" variant="h3">Organize, Share, Collaborate.</Typography> 
            <br />
            <br />
<Typography align="center" variant="h6"> Save and organize your code snippets in the cloud.
Share and collaborate with your team members.</Typography>
<br />
<Typography align="center" variant="h5" >Organize your code</Typography>
<Typography align="center" variant="h6">Group similar code snippets in lists and collections and keep everything organized. Nice and tidy!
    </Typography>
    <br />
    {/* <Grid container>
        <Grid item md={6}>
        <h1>Wanna use !</h1>
            <p>Check component snippets.wannit..! just click it.... :)</p>
        </Grid>
        <Grid item md={6}>
        <h1>Wanna Contribute !</h1>
            <p>Click Post...And share your junk to the world of junkies :)</p>
        </Grid>
    </Grid>
             */}
          
            
        </div>
    );
}



