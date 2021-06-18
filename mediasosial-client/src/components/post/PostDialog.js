import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
import Comments from './Comments';
import CommentForm from './CommentForm';
import './PostDialog.css';

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

const styles = {
    invisibleSeparator:{
        border: 'none',
        margin: 2
    },
    profileImage:{
        width: 150,
        height: 150,
        borderRadius: '50%',
        objectFit: 'cover',
        boxShadow: '-3px -3px 2px rgba(255,255,255,0.5), 3px 3px 7px rgba(70,70,70,0.12),inset -5px -5px 2px rgba(255,255,255,0.5),inset  5px 5px 10px rgba(70,70,70,0.12)',

    },
    profilePic:{
        textAlign: 'center'
    },
    dialogContent:{
        padding: 10
    },
    spinnerButton:{
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 30
    },
    unfoldButton: {
        fontSize: '1px',
    },
    commentSection:{
        fontSize: '18px',
        color: 'rgb(87, 74, 74)',
        marginBottom: 20,
        marginLeft: 10,
    },
    viewmore:{
        fontSize: '13px',
    }
     
}

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

        console.log('PostDialog: PostId');
        console.log(this.props.postId);
        this.setState({open: true, oldPath, newPath });
        this.props.getPost(this.props.postId);
        console.log('PostDialog');
        console.log(this.props);
        
    }

    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath);
        this.setState({open: false});
        this.props.clearErrors();
    }

    render(){
        const {classes, 
               post: {
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
        <div className={classes.spinnerButton}>
            <CircularProgress size={200} thickness={2}/>
        </div>
            
        ) : (
            <Grid container spacing={3}>
                <Grid item xs={12} sm={5} className={classes.profilePic}>
                    <img src={userImage} alt="Profile" className={classes.profileImage}/>
                </Grid>  
                           
                <Grid item xs={12} sm={7} >
                    <Typography
                        className={classes.userName}
                        component={Link}
                        color="secondary"
                        variant="h5"
                        to={`/users/${userHandle}`}
                        >
                          {userHandle}
                        </Typography>
                        <hr className={classes.invisibleSeparator}/>
                        <Typography variant="body2" color="secondary">
                            {dayjs(createdAt).format('h:mm a, MMMM DD')}
                        </Typography>
                        <hr className={classes.invisibleSeparator}/>
                        <Typography variant="body1">
                            {body}
                        </Typography>
                        <div className='commentNLike2'>
                            <div className='likeB2'>
                                <LikeButtonDialog postId={postId}/>
                                <span>{likeCount}</span>
                            </div>
                            <div className='commentB2'>
                                <button className='commentBox'>
                                    <i class="fa fa-comments-o" aria-hidden="true"></i>
                                </button>
                                <span>{commentCount}</span>
                            </div>
                        </div>
                </Grid>
                <CommentForm postId={postId}/>
                <Comments comments={comments}/>
            </Grid>
        )
               
              return(
                    <Fragment>
                        <MyButton 
                            onClick={this.handleOpen} 
                            className={classes.unfoldButton}
                            tip=''
                            >
                                <UnfoldMore color="secondary"/> 
                                <Typography className={classes.viewmore}> View more comments</Typography>
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
                                tipClassName={classes.closeButton}> 
                                <CloseIcon/>    
                            </MyButton>
                            <DialogContent 
                                className={classes.dialogContent}>
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

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostDialog));