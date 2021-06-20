import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CommentForm.scss';
//Redux stuff
import { connect } from 'react-redux';
import { submitComment, showComment} from '../../redux/actions/dataAction';

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
                    <form onSubmit={this.handleSubmit} className="comment_form">
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



export default connect(mapStateToProps, mapActionsToProps)(CommentForm);