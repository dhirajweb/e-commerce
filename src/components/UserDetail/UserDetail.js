import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import moment from 'moment'
import Restricted from '../Restricted/Restricted'

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      display: 'inline-block'
    },
});

const UserDetail = (props) => {
    const classes = useStyles();
    const [userData, setUserData] = useState([])

    useEffect(async () => {
        let data = [];
        data[0] = await JSON.parse(sessionStorage.getItem('userDetails'))
        setUserData(data)
    }, [])

    return (
        <div>
            {sessionStorage.getItem('isAuthenticated') === 'yes'?
            <div>
            <h1>User details</h1>
            {userData.map((user) => (
            <Card className={classes.root}>
                <CardActionArea>
                        <CardMedia
                        style={{height: '128px', width: '128px', display: 'inline-block', borderRadius: '50%', marginTop: '10px'}}
                        className={classes.media}
                        image={user.picture.large}
                        title={user.name.first+' '+user.name.last}
                        />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {user.name.title+'. '+user.name.first+' '+user.name.last}
                    </Typography>
                    <Typography style={{paddingTop:'10px'}} variant="body2" color="textSecondary" component="p">
                        Email: {user.email}
                    </Typography>
                    <Typography style={{paddingTop:'10px'}} variant="body2" color="textSecondary" component="p">
                        DOB: {moment(user.dob.date).format('MM/DD/YYYY')}
                    </Typography>
                    <Typography style={{paddingTop:'10px'}} variant="body2" color="textSecondary" component="p">
                        Address: {user.location.street.number+', '+user.location.street.name+', '+user.location.city+', '+user.location.state+', '+user.location.country}
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            ))}
            </div>:<Restricted/>}
        </div>
    )
}

export default UserDetail
