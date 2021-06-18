import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';

//MUI stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = {
    invisibleSeparator:{
        border: 'none',
        margin: 2
    },
    commentImage:{
        width: 60,
        height: 60,
        borderRadius: '50%',
        objectFit: 'cover',
        marginBottom: 45,
        marginTop: 3,
        marginLeft: 10,
     },
    commentData:{
        marginLeft: 20
    },
}

class Comments extends Component{
    render(){
        const { comments, classes } = this.props;
        return(
            <Grid container>
                {comments.map((comment) => {
                    const{ body,createdAt, userImage,userHandle} = comment;
                    return(
                        <Fragment key={createdAt}>
                             <br/>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={2}>
                                        <img 
                                            src={userImage} 
                                            alt="comment" 
                                            className={classes.commentImage}/>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <div className={classes.commentData}>
                                            <Typography 
                                                variant="h5"
                                                component={Link}
                                                to={`/users/${userHandle}`}
                                                color="secondary"
                                                >
                                                {userHandle}
                                            </Typography>
                                            <Typography 
                                                variant="body2"
                                                color={"textSecondary"}>
                                                {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                            </Typography>
                                            <hr className={classes.invisibleSeparator}/>
                                            <Typography variant="body1">
                                                {body}
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Fragment>
                    )
                })}
            </Grid>        
        )
    }
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired
}

export default withStyles(styles)(Comments);