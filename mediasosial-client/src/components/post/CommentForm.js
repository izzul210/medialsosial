import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import './CommentForm.css';

//Redux stuff
import { connect } from 'react-redux';
import { submitComment, showComment} from '../../redux/actions/dataAction';

const styles = {
    profileImage:{
        width: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    profileCommentImage:{
        left: '2%',
        position: 'relative',
        transform: 'translateY(110%)',
        width: 30,
        height: 30,
        borderRadius: '50%',
        objectFit: 'cover',
        boxShadow: '-3px -3px 2px rgba(255,255,255,0.5), 3px 3px 7px rgba(70,70,70,0.12),inset -5px -5px 2px rgba(255,255,255,0.5),inset  5px 5px 10px rgba(70,70,70,0.12)',
    },
    dialogContent:{
        padding: 10
    },
    spinnerButton:{
        textAlign: 'left',
        marginTop: 30,
        marginBottom: 30
    }
}


class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            body: '',
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({ body: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submitComment(this.props.postId, { body: this.state.body});
        this.setState({body: ''});
    }

    render() {
        const { authenticated } = this.props;
        const errors = this.state.errors;

        const commentFormMarkup = authenticated ? (
                <div className="commentField">  
                  <div className='profileCommentPic'>
                     <img src={this.props.user.credentials.imageUrl} alt='' />
                  </div> 
                  <div className='commentField2'>
                    <form onSubmit={this.handleSubmit}>
                        <input  
                                type="text"
                                placeholder="Comment on post"
                                error={errors.comment ? true : false}
                                value={this.state.body}
                                onChange={this.handleChange}
                                className="comment-input"  />
                        <button className='commentButton'>
                        <i class="fa fa-reply" aria-hidden="true"></i>
                        </button>                        
                    </form>
                  </div>     
                </div>         
        ) : null 
        return commentFormMarkup
    }
}

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    showComment: PropTypes.func.isRequired,
    updateComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired
    
}

const mapStateToProps = state => ({
    UI: state.UI,
    authenticated: state.user.authenticated,
    data: state.data,
    user: state.user,
})

const mapActionsToProps = {
    submitComment,
    showComment,
}



export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CommentForm));