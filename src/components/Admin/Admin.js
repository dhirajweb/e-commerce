import React, { useState, useEffect } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment'
import {withRouter} from 'react-router-dom'
import Restricted from '../Restricted/Restricted'

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 12,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
      width: 'content'
    },
});

const Admin = (props) => {
    const classes = useStyles();
    const [users, setUsers] = useState([])
    const getUsers = async () => {
        await fetch('https://randomuser.me/api/?results=20')
            .then(res=>res.json())
            .then(response=>{setUsers(response['results'])
        })
    }

    const setUserDetail = async (user) => {
        let data = [];
        data = JSON.stringify(user);
        await sessionStorage.setItem('userDetails', data)
        props.history.push('/user-detail')
    }
    useEffect(() => {
        getUsers();
    }, [])
    return (
        <div>
            {sessionStorage.getItem('isAuthenticated') === 'yes'?
            <div>
            <h3 style={{textAlign:'left', marginLeft: '24px'}}>Customer info</h3>
            <TableContainer component={Paper}>
            <Grid item xs={12}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Photo</StyledTableCell>
                        <StyledTableCell align="left">First Name</StyledTableCell>
                        <StyledTableCell align="left">Last Name</StyledTableCell>
                        <StyledTableCell align="left">Email</StyledTableCell>
                        <StyledTableCell align="left">DOB</StyledTableCell>
                        <StyledTableCell align="left">Address</StyledTableCell>
                        <StyledTableCell align="left">Pincode</StyledTableCell>
                        <StyledTableCell align="left">CTA</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {users.map((user) => (
                        <StyledTableRow key={user.login.uuid}>
                        <StyledTableCell component="th" scope="row">
                            <ListItemAvatar>
                                <Avatar>
                                    <img style={{height: '100%', width: '100%'}} src={user.picture.thumbnail} alt='img'/>
                                </Avatar>
                            </ListItemAvatar>
                        </StyledTableCell>
                        <StyledTableCell align="left">{user.name.first}</StyledTableCell>
                        <StyledTableCell align="left">{user.name.last}</StyledTableCell>
                        <StyledTableCell align="left">{user.email}</StyledTableCell>
                        <StyledTableCell align="left">{moment(user.dob.date).format('MM/DD/YYYY')}</StyledTableCell>
                        <StyledTableCell align="left">{user.location.street.number+', '+user.location.street.name+', '+user.location.city+', '+user.location.state+', '+user.location.country}</StyledTableCell>
                        <StyledTableCell align="left">{user.location.postcode}</StyledTableCell>
                        <StyledTableCell align="left">
                        <Button variant="contained" color="primary" size="small" onClick={() => setUserDetail(user)}>
                            View Details
                        </Button>
                        </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
                </Grid>
                </TableContainer></div>:<Restricted />}
        </div>
    )
}

export default withRouter(Admin)
