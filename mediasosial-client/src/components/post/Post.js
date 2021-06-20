import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom/';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import DeletePost from './DeletePost';
import PostDialog from './PostDialog';
import LikeButton from './LikeButton';
import CommentExpand from './CommentExpand';
import './Post.scss';

//MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import  Typography from '@material-ui/core/Typography';

//Redux
import { connect } from 'react-redux';

const styles = {
      content:{
          marginLeft: '10px',
          padding: '25px',
          objectFit:'cover'
      },
      fontStuff:{
          fontSize: 'calc(15px + (0.6) * ((100vw - 300px) / (1600 - 300)))',
      },
      fontTitle:{
        fontSize: 'calc(22px + (0.6) * ((100vw - 300px) / (1600 - 300)))',
    },
}

class Post extends Component {
    render() {
      dayjs.extend(relativeTime)
      const { 
          classes, 
          post: {   body, 
                    createdAt, 
                    userImage, 
                    userHandle, 
                    postId, 
                    likeCount,
                    commentCount,
                },
          user: { 
                authenticated,
                credentials: { handle }
                }  
            } = this.props;
        

        const deleteButton = authenticated && userHandle === handle ? (
            <DeletePost postId={postId}/>
        ) : null

        return (
            <Card className='card_div'>
                <img src={userImage} className='postprofile-pic' alt=''/>
                <CardContent className={classes.content}>
                    <div>
                    <Typography variant="h5" component={Link} to={`/users/${userHandle}`} className={classes.fontTitle}>
                        {userHandle}
                    </Typography>
                    {deleteButton}
                    </div>
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).fromNow()}
                    </Typography>
                    <Typography variant="body1" className={classes.fontStuff}>
                        {body}
                    </Typography>
                    <div className='commentNLike'>
                        <div className='likeB'>
                            <LikeButton postId={postId}/>
                            <span>{likeCount}</span>
                        </div> 
                        <div className='commentB'>
                            <button className='commentBox'>
                             <i class="fa fa-comments-o" aria-hidden="true"></i>
                            </button>
                            <span>{commentCount}</span>
                        </div>
                    </div> 
                    <br/>
                    <CommentExpand postId={postId} userHandle={userHandle} commentCount={commentCount}/>
                    <PostDialog postId={postId} userHandle={userHandle} openDialog={this.props.openDialog}/>
                </CardContent>
            </Card>
        )
    }
}

Post.propTypes = {
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    openDialog: PropTypes.bool,

}

const mapStateToProps = state => ({
    user: state.user,
    data: state.data,
})

export default connect(mapStateToProps)(withStyles(styles)(Post));

