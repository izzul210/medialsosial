import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import './CommentDisplay.css';

//MUI stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = {
    invisibleSeparator:{
        border: 'none',
        marginBottom: 5,
        marginRight: 8,
        marginTop: 5,
    },
    commentImage:{
        marginLeft: 10,
        width: 35,
        height: 35,
        borderRadius: '50%',
        objectFit: 'cover',
        boxShadow: '-3px -3px 2px rgba(255,255,255,0.5), 3px 3px 7px rgba(70,70,70,0.12),inset -5px -5px 2px rgba(255,255,255,0.5),inset  5px 5px 10px rgba(70,70,70,0.12)',
    },
    commentData:{
        marginLeft: 20
    },
    fontStuff:{
        fontSize: 'calc(14px + (0.6) * ((100vw - 300px) / (1600 - 300)))',
    },
    fontTitle:{
        fontSize: 'calc(17px + (0.6) * ((100vw - 300px) / (1600 - 300)))',
    },
}

class CommentDisplay extends Component{
    render(){
        const { comments, classes } = this.props;
        return(
            <Grid container>
                {comments.map((comment) => {
                    const{ body,createdAt, userImage,userHandle} = comment;
                    return(
                       <div className="expandComment">
                        <Fragment key={createdAt}>
                                    <div className='commentImage'>
                                        <img 
                                            src={userImage} 
                                            alt="comment" 
                                            className={classes.commentImage}/>
                                    </div>
                                    <div className='commentDetails'>
                                        <div className={classes.commentData}>
                                            <Typography 
                                                variant="h6"
                                                component={Link}
                                                to={`/users/${userHandle}`}
                                                color="secondary"
                                                className={classes.fontTitle}
                                                >
                                                {userHandle}
                                            </Typography>
                                            <Typography 
                                                variant="body2"
                                                color={"textSecondary"}
                                                className={classes.fontStuff}>
                                                {dayjs(createdAt).format('h:mm a, MMMM DD')}
                                            </Typography>
                                            <hr className={classes.invisibleSeparator}/>
                                            <Typography variant="body1" className={classes.fontStuff}>
                                                {body}
                                            </Typography>
                                        </div>
                                    </div>
                        </Fragment>
                       </div>     
                    )
                })}
            </Grid>        
        )
    }
}

CommentDisplay.propTypes = {
    comments: PropTypes.array.isRequired
}

export default withStyles(styles)(CommentDisplay);