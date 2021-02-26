import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import LocalMallTwoToneIcon from '@material-ui/icons/LocalMallTwoTone';
import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';

const useStyles = makeStyles((theme) => ({
    rightNav: {
      flexGrow: 1,
      textAlign: 'right'
    },
    title: {
      textAlign: 'left',
      marginRight: '5px'
    },
}));

const Navbar = () => {
    const classes = useStyles();
    return (
        <div>
            <AppBar position="static" style={{backgroundColor:'#9c27b0'}}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                    E-commerce
                    </Typography>
                    <LocalMallTwoToneIcon />
                    <div className={classes.rightNav}>
                        <Button color="inherit" style={{marginRight: '10px'}}>Login</Button>
                        <ShoppingCartTwoToneIcon style={{verticalAlign: 'middle'}}/>
                        <Typography style={{display: 'inline', fontWeight: 'bold'}}>
                        1
                        </Typography>

                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar
