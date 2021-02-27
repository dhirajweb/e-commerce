import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import LocalMallTwoToneIcon from '@material-ui/icons/LocalMallTwoTone';
import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import Cart from '../Cart/Cart'
import AdminLogin from '../AdminLogin/AdminLogin'
import { connect } from 'react-redux'
import { withRouter } from 'react-router';

const useStyles = makeStyles((theme) => ({
    rightNav: {
      flexGrow: 1,
      textAlign: 'right'
    },
    title: {
      textAlign: 'left',
      marginRight: '5px'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))(Badge);

const Navbar = (props) => {
    const classes = useStyles();
    const [openCartModal, setOpenCartModal] = useState(false)
    const [openLoginModal, setOpenLoginModal] = useState(false)

    const Logout = () => {
        props.history.push('/e-commerce')
        sessionStorage.setItem('isAuthenticated', 'no')
    }
    return (
        <div>
            <AppBar position="static" style={{backgroundColor:'#9c27b0'}}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                    E-commerce
                    </Typography>
                    <LocalMallTwoToneIcon />
                    {sessionStorage.getItem('isAuthenticated') === 'yes'?
                    <div className={classes.rightNav}>
                        <Button color="inherit" style={{marginRight: '10px'}} onClick={Logout}>Logout</Button></div>:
                        <div className={classes.rightNav}>
                            <Button color="inherit" style={{marginRight: '10px'}} onClick={() => setOpenLoginModal(true)}>Login</Button>
                            <StyledBadge badgeContent={props.numberOfItems} color="secondary">
                                <ShoppingCartTwoToneIcon style={{verticalAlign: 'middle', cursor: 'pointer'}} onClick={() => setOpenCartModal(true)}/>
                            </StyledBadge>
                        </div>
                    }
                </Toolbar>
            </AppBar>
            {openCartModal?
                <Cart open={openCartModal} close={setOpenCartModal}/>:null
            }
            {openLoginModal?
                <AdminLogin open={openLoginModal} close={setOpenLoginModal}/>:null
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    numberOfItems: state.cart.data.length,
})

export default connect(mapStateToProps)(withRouter((Navbar)));
