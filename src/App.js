import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

import GlobalState from './components/GlobalState'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import MasterPage from './components/MasterPage';
import AddSnippet from './components/AddSnippet';
import Signup from './components/Signup';
import Login from './components/Login';

const theme = createMuiTheme({
  palette: {
    type: 'light',


    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

function App() {
  return (
    <div className="App">
      <br />
      <ThemeProvider theme={theme}>

        <GlobalState>
          <Router basename={'/BGC_Api'}>            

            <Switch>
              <Route exact strict path="/">
              <MasterPage />
              </Route>
              <Route exact strict path="/scheduler">
              <Scheduler />
              </Route>
              
              <Route exact strict path="/Signup">
                <Signup />
              </Route>    
              <Route exact strict path="/Login">
                <Login />
              </Route>              
              <Route path="*" component={Error} />
          </Switch>
        </Router>
        </GlobalState>
      </ThemeProvider>
    </div>
  );
}
const Error = ({ location }) => (
  <div>
    <h3>We cant find this path <code className="path">{location.pathname}</code> Bro.Check the Url</h3>
  </div>
)
export default App;
