import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/newlogo2.png';
import {Link} from 'react-router-dom';
import './login.css';

//MUI stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'; 
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';

//Redux stuff
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/userAction';

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
          margin: '20px auto 20px auto',
          letterSpacing: '0px'
      },
      button:{
          marginTop: 20,
          position: 'relative',
          width: '95%',
          borderRadius: '35px',
          color: '#141414',
          backgroundColor: '#e8f1d9',
          boxShadow: '3px 5px 5px #cdced1, -3px -5px 6px #ffffff'
      },
      customError:{
          color: 'red',
          fontSize: '0.8rem',
          marginTop: 10
      },
      progress:{
        position: 'absolute'  
      },
      
}

class login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            errors:{}
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({errors: nextProps.UI.errors });
        }
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history);
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const {classes, UI: { loading }} = this.props;
        const {errors} = this.state;
        return (
            <Card className={classes.card}>
            <Grid container spacing={3} className={classes.form}>
                <Grid item xs/>
                <Grid item xs={8.5}>
                    <img src={AppIcon} alt="guy" className='logo'/>
                    <Typography variant ="h3" className={classes.pageTitle} >
                        Log in
                    </Typography>
                    
                    <form noValidate onSubmit={this.handleSubmit}>
                    <div className="textField">
                        <div className="email">
                            <input id="email"
                                   label="email"
                                   type="email"
                                   className="email-input"
                                   name="email"
                                   value={this.state.email}
                                   error={errors.email ? true : false}
                                   placeholder="email: user@email.com"
                                   onChange={this.handleChange}/>
                        </div>
                        <div className={classes.customError}>{errors.email}</div>
                        <br/>
                        <div className="password">
                            <input id="password"
                                   type="password"
                                   className="password-input"
                                   placeholder="password: 123456"
                                   name="password"
                                   label="Password"
                                   value={this.state.password}
                                   error={errors.password ? true : false}
                                   onChange={this.handleChange}/>
                        </div>
                        <div className={classes.customError}>{errors.password}</div>

                            {errors.error && 
                             (<Typography variant="body2" className={classes.customError}>
                                User does not exist or incorrect password. Try again!
                              </Typography>)} 

                            {errors.general && 
                             (<Typography variant="body2" className={classes.customError}>
                                {errors.general}
                              </Typography>)}      
                     </div>
                    
                        <Button type="submit" 
                                variant="contained" 
                                color="#e8f1d9" 
                                className={classes.button}
                                disabled={loading}> 
                            Login 
                            {loading && <CircularProgress size={50} className={classes.progress} />}
                        </Button> 

                        <br />
                        <br />
                        <small> Dont' have an account? Shame. Sign up <Link to="/signup">here</Link> </small>
                        
                    </form>
                </Grid>
                <Grid item xs/>
            </Grid>
            </Card>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

//Take user and UI from the global state
const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

//Tells which action we're gonna use
const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login))
