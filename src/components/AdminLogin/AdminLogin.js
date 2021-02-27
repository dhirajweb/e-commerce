import React, { useState } from 'react'
import { Dialog, DialogTitle, TextField, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import { useToasts } from 'react-toast-notifications'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(3),
        width: '25ch',
      },
    },
}));

const AdminLogin = (props) => {
    const classes = useStyles();
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [error, setError] = useState(null)
    const { addToast } = useToasts()

    const Login = (e) => {
        e.preventDefault();
        if(!email && !password) {
            setError("Please fill all the fields")
        } else if(!email) {
            setError("Please enter your email")
        } else if(!password) {
            setError("Please enter your password")
        } else {
            if(email === 'admin@xyz.com' && password === 'Admin_007') {
                props.history.push('/admin')
                sessionStorage.setItem('isAuthenticated', 'yes')
                props.close(false)
                setError("")
                addToast('Successfully logged in', {
                    appearance: 'success',
                    autoDismiss: true,
                    autoDismissTimeout: 2000
                })
            } else {
                setError("Invalid credentials")
            }
        }
    }
    return (
        <div>
            <Dialog onClose={() => props.close(false)} aria-labelledby="simple-dialog-title" open={props.open}>
            <DialogTitle id="simple-dialog-title">Login as Admin</DialogTitle>
            <form className={classes.root} noValidate autoComplete="off">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField id="outlined-basic" label="Email" variant="outlined" size="small" onChange={e => setEmail(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="outlined-basic1" label="Password" variant="outlined" type="password" size="small" onChange={e => setPassword(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12} style={{textAlign: 'center', paddingTop: 0, paddingBottom: 0}}> 
                        <p style={{color: 'red', fontSize: '12px'}}>{error}</p>
                    </Grid>
                    <Grid item xs={12}> 
                        <Button type="submit" onClick={Login} style={{width: '100%', backgroundColor: '#9c27b0'}} variant="contained" color="primary">
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </form>
            </Dialog>
        </div>
    )
}

export default withRouter(AdminLogin);
