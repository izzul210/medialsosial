import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import './PostButton.scss';

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

class PostButton extends Component{
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
                <div >
                    <button onClick={this.handleOpen} className='navbar_button'>
                        <i class="fa fa-plus" aria-hidden="true"></i>
                    </button>                 
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

PostButton.propTypes = {
    postPost: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    UI: state.UI,
    user: state.user,
})

export default connect(mapStateToProps, {postPost, clearErrors })(withStyles(styles)(PostButton))