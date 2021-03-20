import React, { useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppBar,Badge,Toolbar, List, Typography, Divider, IconButton, ListItem, Tooltip } from '@material-ui/core';
import { TreeItem, TreeView } from '@material-ui/lab'


import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import BugReportIcon from '@material-ui/icons/BugReport';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Brightness6Icon from '@material-ui/icons/Brightness6';
import NotificationsIcon from '@material-ui/icons/Notifications';

import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';

import SnippetCard from './Snippet'
import ProfileMenu from './ProfileMenu'
import ProfileSetting from './ProfileSetting';

import axios from 'axios';
import { CompAddedContext } from './GlobalState';
import { UserContext } from './GlobalState';
import AddSnippet from './AddSnippet';




const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));
function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [postname, setPostname] = useState({ "category": "", "name": "" })
  const [components, setComponents] = useState([])
  const [methods, setMethods] = useState([])
  const [newPost] = useContext(CompAddedContext)
  const [user, setUser] = useContext(UserContext)
const [currentBodyComponent,setBody]=useState('snippet')




  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };
  const openComponent = (e) => {
    setPostname({ "category": "Frontend", "name": e.target.innerText })
    setBody('snippet')
  }
  const openPost = (e) => {
    setPostname({ "category": "Backend", "name": e.target.innerText })
    setBody('snippet')
  }
  const openStarter = (e) => {
    setPostname({ "category": "", "name": "" })
    setBody('snippet')
  }
const openProfileSetting=(e)=>{
  setBody('profileSetting')
  
}
const openaddPost=()=>{
  setBody('post')
}


  useEffect(() => {

    axios.get('https://ssautomation.accenture.com/reactapi/api/codehub')
      .then(response => {
        const datas = JSON.parse(response.data)

        if (datas.NewDataSet.Table.length === undefined) {

          setComponents(`[${datas.NewDataSet.Table.component}] `)
          setMethods(`[${datas.NewDataSet.Table.methods}] `)

        }
        else {
          let tempcomponents = []
          let tempMethods = []

          datas.NewDataSet.Table.map(row => {
            if (row.component != null) {
              if (!tempcomponents.includes(row.component)) {
                tempcomponents.push(row.component);
              }
            }
            if (row.method != null) {
              if (!tempMethods.includes(row.method)) {
                tempMethods.push(row.method);
              }

            }

          });

          setComponents(tempcomponents.sort())
          setMethods(tempMethods.sort())

        }

      })
      .catch(error => {
        console.log(error);
      })

  }, [newPost]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{ flex: 1 }}>
            CodeHub <BugReportIcon style={{ paddingTop: 6, fontSize: 24 }} />
          </Typography>
          <Tooltip title="Add new junk" arrow={true}>
            <Link className="nav-link" onClick={openaddPost}><PostAddIcon style={{ fontSize: 28 }} /></Link>
          </Tooltip>
          <Tooltip title="Notifications" arrow={true}>
          <Badge color="secondary"
  anchorOrigin={{
    vertical: 'top',
    horizontal: 'right',
  }} badgeContent={0} showZero
>
            <Link className="nav-link" to="/"><NotificationsIcon style={{ fontSize: 28 }} /></Link>
            </Badge>
          </Tooltip>
          
          <Tooltip title="Change Theme" arrow={true}>
            <Link className="nav-link" to="/"><Brightness6Icon style={{ fontSize: 28 }} /></Link>
          </Tooltip>

<div className="ml-1">
<ProfileMenu onClick={openProfileSetting} />
</div>
          

        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}><h2>accenture</h2>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List onClick={openStarter}>
          <ListItem>
            <Typography>Getting Started</Typography>
          </ListItem>
        </List>
        <Divider />
        <ListItem>
          <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            expanded={expanded}
            selected={selected}
            onNodeToggle={handleToggle}
            onNodeSelect={handleSelect}
          >
            <TreeItem style={{ width: 200 }} nodeId="1" label="Design">
              <List>

                {components.map(component => (

                  <ListItem style={{ width: 180 }} onClick={openComponent} button key={component}>
                    <TreeItem label={component} />
                  </ListItem>
                ))}
              </List>
            </TreeItem>

          </TreeView>
        </ListItem>

        <Divider />
        <ListItem>
          <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            expanded={expanded}
            selected={selected}
            onNodeToggle={handleToggle}
            onNodeSelect={handleSelect}
          >
            <TreeItem style={{ width: 200 }} nodeId="6" label="Coding">
              <List>

                {methods.map(method => (
                  <ListItem onClick={openPost} button key={method}>
                    <TreeItem label={method} />
                  </ListItem>
                ))}
              </List>
            </TreeItem>

          </TreeView>
        </ListItem>
        <Divider />
        <div className="nav-version">


          <ListItem>
            <Typography>Version (&beta; 1.0)</Typography>
          </ListItem>

        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <p id="back-to-top-anchor"></p>
        {currentBodyComponent==='post'?<AddSnippet />:currentBodyComponent==='profileSetting'?<ProfileSetting />
        :<SnippetCard post={postname} />}
        
        <ScrollTop {...props}>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </main>
    </div>
  );
}
