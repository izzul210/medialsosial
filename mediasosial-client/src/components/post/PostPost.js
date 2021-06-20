import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import './Postpost.scss';

//Redux
import { connect } from 'react-redux';
import { postPost, clearErrors } from '../../redux/actions/dataAction';

//MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogContent from '@material-ui/core/DialogContent';

//Icon
import CloseIcon from '@material-ui/icons/Close';

const styles = {
    form: {
        textAlign : 'center'
      },
    textField:{
          margin: '5px auto 5px auto'
      },
    submitButton:{
          position: 'relative',
      },
    progressSpinner: {
          position: 'absolute'
      },
    closeButton: {
          position: 'static',
          left: '90%',
          top: '10%'
      }
    };

class PostPost extends Component{
    state = {
        open: false,
        body: '',
        errors: {}
    };
    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            });
        };
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({ body: '',open: false, errors:{}});
        }
    }
    handleOpen = () => {
        this.setState({open: true})
    }
    handleClose = () => {
        this.props.clearErrors();
    }
    handleChange= (event) => {
        this.setState({ body: event.target.value });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.postPost({body: this.state.body});
     }

    render(){
        const{ errors} = this.state;
        const{classes, UI:{loading}}= this.props;
        return(
            <Fragment>
                    <div className='navPost'>
                      <div className='barPost'>
                        <div className='postProfile'>
                            <img src={this.props.user.credentials.imageUrl} alt='' />
                        </div> 
                        <div className="barPost2">
                            <form onSubmit={this.handleSubmit}> 
                                <input 
                                            value={this.state.body}
                                            type="text"
                                            label="Post"
                                            placeholder="Post here..."
                                            error={errors.body ? true : false}
                                            helperText={errors.body}
                                            className='inputText'
                                            onChange={this.handleChange}
                                            fullWidth />
                                <button className='postButton'>
                                <i class="fa fa-reply" aria-hidden="true"></i>
                                </button>
                            </form> 
                        </div>                       
                      </div>
                    </div>
                <Dialog 
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth 
                    maxWidth="sm">
                    <MyButton 
                        tip="Close"
                        onClick={this.handleClose}
                        tipClassName={classes.closeButton}> 
                        <CloseIcon/>    
                    </MyButton>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField 
                                name="body"
                                type="text"
                                label="Post"
                                multiline
                                rows="3"
                                placeholder="Post something"
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth/>
                                <div className='postButton2'>
                                    <Button 
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className={classes.submitButton}
                                        disabled={loading}
                                        >
                                        Submit { loading && (
                                        <CircularProgress size={30} className={classes.progressSpinner}/>
                                        )}
                                    </Button>
                                </div>
                                
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

PostPost.propTypes = {
    postPost: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    UI: state.UI,
    user: state.user,
})

export default connect(mapStateToProps, {postPost, clearErrors })(withStyles(styles)(PostPost))


