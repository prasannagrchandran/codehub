import React, { useState, useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import '../App.css';
import axios from 'axios';
import {Hidden} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { CompAddedContext, UserContext } from './GlobalState'





const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },

  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));


function getSteps() {
  return ['Component Name', 'Post Title', 'Category', 'Description', 'Code'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `Enter Component Name`;
    case 1:
      return 'Give the suitable title for your post';
    case 2:
      return `Choose your component category`;
    case 3:
      return `Describe your Post buddy`;
    case 4:
      return `Enter your Junk Here`;

    default:
      return 'Unknown step';
  }
}



function AddSnippet() {
  const classes = useStyles();
  const [componentName, setComponentName] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [snippet, setSnippet] = useState('')
  const [category, setCategory] = useState('')
  const [activeStep, setActiveStep] = React.useState(0);
  const [newPost, setNewpost] = useContext(CompAddedContext)
  const steps = getSteps()




  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  const getComponent = (e) => {

    setComponentName(e.target.value)

  }
  const handleRadioChange = (event) => {
    setCategory(event.target.value);

  };
  const getTitle = (e) => {
    setTitle(e.target.value)
  }
  const getDescription = (e) => {
    setDescription(e.target.value)
  }
  const getSnippet = (e) => {
    setSnippet(e.target.value)
  }


  const addSnippet = () => {
    if (componentName !== "" && title !== "" && description !== "" && snippet !== "") {


      const data = {
        name: componentName,
        category: category,
        title: title,
        description: description,
        code: snippet
      }
      const options = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      axios.post('https://ssautomation.accenture.com/reactapi/api/codehub', data, options)
        .then((response) => {
          alert("posted successfully");
          setNewpost(componentName)
        })
        .catch(error => {
          alert("cant post bro");
        })
    }
    else {
      alert('fill all');
    }
  }

  return (
    <div className="add-snippet" data-aos="fade-up-left"
    data-aos-anchor="#example-anchor"
    data-aos-offset="500"
    data-aos-duration="500">
      

      
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <div className={classes.margin}>
              <Grid container spacing={1} alignItems="flex-end">
                {/* <Grid item>
            <AccountCircle />
          </Grid> */}
                <Grid item>
                  <TextField id="input-with-icon-grid" label="Component Name" onChange={getComponent} required />

                </Grid>
                <Grid item>
                  <TextField id="input-with-icon-grid" label="Post Title" onChange={getTitle} required />
                </Grid>
                <Grid item>
                  <RadioGroup aria-label="quiz" name="quiz" color="secondary" value={category} onChange={handleRadioChange}>
                    <FormControlLabel value="Frontend" control={<Radio />} label="Frontend" />
                    <FormControlLabel value="Backend" control={<Radio />} label="Backend" />
                  </RadioGroup>
                </Grid>
              </Grid>
            </div>

            {/* <input type="text" placeholder="Component Name" onChange={getComponent} /> */}
            {/* <input type="text" placeholder="Post Title" onChange={getTitle} /> */}
            <Grid item xs={6} >
              <TextField id="input-with-icon-grid" fullWidth label="Description" multiline onChange={getDescription} required />
            </Grid>
            <Grid item xs={6} >
              <TextField id="input-with-icon-grid" fullWidth label="Code" multiline onChange={getSnippet} required />
            </Grid>

            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={addSnippet}
            >
              AddSnippet
      </Button>
          </CardContent>
        </Card>

      <Hidden only={['sm','md','lg']}>
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography>{getStepContent(index)}</Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    
                  
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                  </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
          </Button>
          </Paper>
          
        )}
      </div>
      </Hidden>
    </div>
    

  );
}

export default AddSnippet;