import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/newlogo2.png';
import {Link} from 'react-router-dom';
import './signup.css';

//MUI stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'; 
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';

//Redux stuff
import {connect} from 'react-redux';
import {signupUser} from '../redux/actions/userAction';

const styles = {
    card: {
        position: 'relative',
        background: '#eff4f5',
        marginBottom: '5px',
        borderRadius: '30px',
        boxShadow: '4px 4px 10px #cdced1, -4px -4px 4.5px #ffffff',
        padding: '30px 5px 30px 5px',
        margin: 'auto auto', 
        maxWidth: '500px',
        minHeight: '700px',
      },
    form: {
        textAlign : 'center'
      },
      pageTitle:{
          margin: '20px auto 20px auto'
      },
      textField:{
          margin: '20px auto 20px auto'
      },
      button:{
        marginTop: 20,
        position: 'relative',
        width: '100%',
        borderRadius: '35px',
        color: '#141414',
        backgroundColor: '#e8f1d9',
        boxShadow: '3px 5px 5px #cdced1, -3px -5px 6px #ffffff'
      },
      customError:{
          color: 'red',
          fontSize: '0.8rem',
          marginTop: 20
      },
      progress:{
        position: 'absolute'  
      }
}

class signup extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors:{}
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({errors: nextProps.UI.errors });
        }  
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        };
        this.props.signupUser(newUserData, this.props.history)
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const {classes, UI: {loading}} = this.props;
        const {errors} = this.state;
        return (
            <Card className={classes.card}>
            <Grid container spacing={3} className={classes.form}>
            <Grid item xs/>
                <Grid item xs={8.5}>
                    <img src={AppIcon} alt="guy" className='logo'/>
                    <Typography variant ="h3" className={classes.pageTitle} >
                        Sign Up
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <div className="textField">
                            <div className="email">
                                <input id="email" 
                                    name="email" 
                                    type="email" 
                                    placeholder="email" 
                                    helperText ={errors.email}
                                    error={errors.email ? true : false}
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    />
                            </div>
                            <div className={classes.customError}>{errors.email}</div>
                            <br/>
                            <div className="password">
                                <input id="password" 
                                   name="password" 
                                   type="password" 
                                   placeholder="password" 
                                   helperText ={errors.password}
                                   error={errors.password ? true : false}
                                   value={this.state.password}
                                   onChange={this.handleChange}
                                    />
                            </div>
                            <div className={classes.customError}>{errors.password}</div>
                            <br/>
                            <div className="confirmPassword">
                                <input id="confirmPassword" 
                                   name="confirmPassword" 
                                   type="password" 
                                   placeholder="confirm password" 
                                   helperText ={errors.confirmPassword}
                                   error={errors.confirmPassword ? true : false}
                                   value={this.state.confirmPassword}
                                   onChange={this.handleChange}
                                    />
                            </div>
                            <div className={classes.customError}>{errors.confirmPassword}</div>
                            <br/>
                            <div className="handle">
                                <input id="handle" 
                                   name="handle" 
                                   type="text" 
                                   placeholder="handle name" 
                                   helperText ={errors.handle}
                                   error={errors.handle ? true : false}
                                   value={this.state.handle}
                                   onChange={this.handleChange}
                                    />
                            </div>
                            <div className={classes.customError}>{errors.handle}</div>
                        </div>

                            {errors.error && 
                             (<Typography variant="body2" className={classes.customError}>
                                User does not exist or incorrect password. Try again!
                              </Typography>)} 

                            {errors.general && 
                             (<Typography variant="body2" className={classes.customError}>
                                {errors.general}
                              </Typography>)}      
                            
                        <Button type="submit" 
                                variant="contained" 
                                color="primary" 
                                className={classes.button}
                                disabled={loading}> 
                            Sign up 
                            {loading && <CircularProgress size={50} className={classes.progress}/>}
                        </Button> 
                        <br />
                        <br/>
                        <small> Feel free to use a fake Email!</small>
                        <br/>
                        <small> Already have an account? Login <Link to="/login" color="red">here</Link> </small>

                        
                    </form>
                </Grid>
                <Grid item xs/>
            </Grid>
        </Card>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})


export default connect(mapStateToProps, { signupUser })(withStyles(styles)(signup)) ;