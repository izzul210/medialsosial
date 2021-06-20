import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import './Comment.scss';

//MUI stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class Comments extends Component{
    render(){
        const { comments } = this.props;
        return(
            <Grid container>
                {comments.map((comment) => {
                    const{ body,createdAt, userImage,userHandle} = comment;
                    return(
                        <Fragment key={createdAt}>
                            <Grid item sm={12} className="comment_div">
                                <Grid container>
                                    <Grid item sm={2}>
                                        <img 
                                            src={userImage} 
                                            alt="comment" 
                                            className='commentImage'/>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <div className='commentData'>
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

export default Comments;