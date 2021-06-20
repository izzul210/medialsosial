import React, { Component } from 'react';
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


class Post extends Component {
    render() {
      dayjs.extend(relativeTime)
      const { 
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
                <div className="card_content">
                    <div className="postprofile_div">
                        <img src={userImage} className='postprofile-pic' alt=''/>
                    </div>
                    <CardContent className='content_div'>
                        <div className="content_top">
                            <div className="content_top_1">
                                <Typography variant="h6" component={Link} to={`/users/${userHandle}`} className='font_title'>
                                    {userHandle}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {dayjs(createdAt).fromNow()}
                                </Typography>
                            </div>
                            <div className="content_top_2">
                                {deleteButton}
                            </div>
                        </div>
                        <Typography variant="body1" className='font_div'>
                            {body}
                        </Typography>
                        <br/>
                    </CardContent>
                </div>

                <CommentExpand postId={postId} userHandle={userHandle} commentCount={commentCount}/>
                
                <div className='buttons_div'>
                    <PostDialog postId={postId} userHandle={userHandle} openDialog={this.props.openDialog}/>
                    <div className="comment_like">
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
                    
                </div> 
                
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

export default connect(mapStateToProps)(Post);

