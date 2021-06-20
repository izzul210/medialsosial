import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
import Comments from './Comments';
import CommentForm from './CommentForm';
import './PostDialog.scss';

//MUI stuff
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

//Icon
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import CloseIcon from '@material-ui/icons/Close';

//Redux stuff
import {connect} from 'react-redux';
import {getPost, clearErrors} from '../../redux/actions/dataAction';
import LikeButtonDialog  from './LikeButtonDialog';

class PostDialog extends Component{
    state={
        open: false,
        oldPath: '',
        newPath: ''
    }

    componentDidMount(){
        if(this.props.openDialog){
            this.handleOpen();
        }
    }

    handleOpen = () => {
        let oldPath = window.location.pathname;

        const { userHandle, postId } = this.props;
        const newPath = `/users/${userHandle}/post/${postId}`;

        if(oldPath === newPath) {
            oldPath = `/users/${userHandle}`;
        }
        window.history.pushState(null, null, newPath);

        this.setState({open: true, oldPath, newPath });
        this.props.getPost(this.props.postId);

        
    }

    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath);
        this.setState({open: false});
        this.props.clearErrors();
    }

    render(){
        const { post: {
                    postId, 
                    body, 
                    createdAt,
                    likeCount,
                    commentCount,
                    userImage,
                    userHandle,
                    comments
                },
                UI: {loading} 
                } = this.props;
            
        const dialogMarkup = loading ? (
        <div className='spinnerButton'>
            <CircularProgress size={200} thickness={2}/>
        </div>
            
        ) : (
            <Grid container spacing={3} className="expand_div">
                <div className="expand_content">
                    <div className='profile_img'>
                        <img src={userImage} alt="Profile"/>
                    </div>  
                    <div className="expand_post" >
                        <Typography
                            className=''
                            component={Link}
                            color="secondary"
                            variant="h5"
                            to={`/users/${userHandle}`}
                            >
                            {userHandle}
                        </Typography>
                        <Typography variant="body2" color="secondary">
                            {dayjs(createdAt).format('h:mm a, MMMM DD')}
                        </Typography>
                        <Typography variant="body1">
                            {body}
                        </Typography>
                        <div className='comment_like'>
                            <div className='like'>
                                <LikeButtonDialog postId={postId}/>
                                <span>{likeCount}</span>
                            </div>
                            <div className='comment'>
                                <button className='commentBox'>
                                    <i class="fa fa-comments-o" aria-hidden="true"></i>
                                </button>
                                <span>{commentCount}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <CommentForm postId={postId}/>
                <Comments comments={comments}/>
            </Grid>
        )
               
              return(
                    <Fragment>
                        <MyButton 
                            onClick={this.handleOpen} 
                            className='unfoldButton'
                            tip=''
                            >
                                <UnfoldMore color="secondary"/> 
                                <Typography className='viewmore'> View more comments</Typography>
                        </MyButton> 
                        <Dialog 
                            open={this.state.open}
                            onClose={this.handleClose}
                            fullWidth 
                            maxWidth="sm"
                            >
                            <MyButton 
                                tip="Close"
                                onClick={this.handleClose}
                                tipClassName='closeButton'> 
                                <CloseIcon/>    
                            </MyButton>
                            <DialogContent 
                                className='dialogContent'>
                              {dialogMarkup}
                            </DialogContent>
                        </Dialog>
                    </Fragment>
                )
        }
    }

PostDialog.propTypes = {
    clearErrors: PropTypes.func.isRequired,
    getPost: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.data.post,
    UI: state.UI,
    data: state.data,
    user: state.user,
})

const mapActionsToProps = {
    getPost,
    clearErrors,
};

export default connect(mapStateToProps, mapActionsToProps)(PostDialog);