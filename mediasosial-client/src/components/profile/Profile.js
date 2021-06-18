import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
import MyButton from '../../util/MyButton';
import './Profile.css';
import Loading from '../../pages/loading';


//Redux stuff
import { connect } from 'react-redux';
import {logoutUser, uploadImage } from '../../redux/actions/userAction';

//MUI stuff
import MuiLink from '@material-ui/core/Link';
import Typography  from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

//Icons 
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

const styles = {
  card: {
    position: 'constant',
    background: '#eff4f5',
    marginBottom: '20px',
    borderRadius: '30px',
    boxShadow: '4px 4px 10px #cdced1, -4px -4px 4.5px #ffffff',
    padding: '30px 5px 5px 5px',
    margin: 'auto auto', 
  },
  nonUserCard: {
    position: 'constant',
    background: '#eff4f5',
    marginBottom: '20px',
    borderRadius: '30px',
    boxShadow: '4px 4px 10px #cdced1, -4px -4px 4.5px #ffffff',
    padding: '30px 5px 5px 5px',
    margin: 'auto auto', 
  },
  fontButton:{
    letterSpacing:'1px',
    color: 'rgba(36, 35, 34, 0.8)',
  },
  profile: {
    '& .image-wrapper': {
          textAlign: 'center',
          position: 'relative',
    '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%'
          }
        },
    '& .profile-image': {
          width: 200,
          height: 200,
          objectFit: 'cover',
          maxWidth: '100%',
          borderRadius: '50%'
        },
    '& .profile-details': {
          textAlign: 'center',
          '& span, svg': {
            verticalAlign: 'middle'
          },
      '& a': {
            color: 'blue'
          }
        },
        '& hr': {
          border: 'none',
          margin: '0 0 10px 0'
        },
        '& svg.button': {
          '&:hover': {
            cursor: 'pointer'
          }
        }
      },
      buttons: {
        textAlign: 'center',
        '& a': {
          margin: '20px 10px'
        }
      }
}

class Profile extends Component {
  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadImage(formData);
    // send to server
  };

  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };

  handleLogout = () => {
    this.props.logoutUser();
  }

    render() {
        const { 
            classes, 
            user: {
                credentials: {handle, createdAt, imageUrl, bio, website, location},
                loading,
                authenticated
            }
        } = this.props;
        
        let profileMarkUp = !loading ? (authenticated ? (
          
              <Card className={classes.card}>
                <div className={classes.profile}>
                    <div  className="image-wrapper">
                        <img src={imageUrl} className='profile-pic' alt=''/>
                        <input 
                          type="file" 
                          id="imageInput"  
                          hidden="hidden"
                          onChange={this.handleImageChange}
                          />
                          <button className="editPicture" title='Edit profile picture' onClick={this.handleEditPicture}>
                               <i class="fa fa-camera" aria-hidden="true"></i>
                          </button>
                    </div>
                    <hr/>
                    <div className="profile-details">
                    <MuiLink component={Link} to={`/users/${handle}`} color="secondary" variant="h5">
                        @{handle}
                    </MuiLink>
                    <hr/>
                    {bio && <Typography variant="body2">{bio}</Typography>}
                    <hr/>
                    {location && (
                       <Fragment>
                           <div className="locationInfo"/> <span className="info">{location}</span>
                        <hr/>
                       </Fragment> 
                    )}
                    {website && (
                        <Fragment>
                            <div className="websiteInfo"/>
                            <a href={website} target="_blank" rel="noopener noreferrer">
                                {' '}{website}
                            </a>
                            <hr/>
                        </Fragment>
                    )}
                    <div>
                      <div className="calendarInfo"/>{' '}
                      <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                    </div>
                    </div>
                      <button className="logout" title='Log out' onClick={this.handleLogout}>
                         <i class="fa fa-sign-out" aria-hidden="true"></i>
                       </button>
                    <EditDetails />
                </div>
              </Card>
            
            ):(
              <Card className={classes.nonUserCard}>
                    <Typography variant="body2" align="center">
                        No profile found. Shame. 
                    </Typography>
                    <div className={classes.buttons}>
                    <MyButton tip=''>
                        <Link to="/login">
                          <button className='nonprofile-login'>
                          <Typography variant="body2" align="center" className={classes.fontButton}>
                            Login 
                          </Typography>
                          </button>
                        </Link>     
                    </MyButton>
                    <MyButton tip=''>
                        <Link to="/signup">
                            <button className='nonprofile-signup'>
                            <Typography variant="body2" align="center" className={classes.fontButton}>
                              Sign Up
                          </Typography>
                            </button>
                       </Link>     
                    </MyButton>
                    </div>
                </Card>
            )): 
            (
            <div>
            <Loading/>
            </div>
            )

        return profileMarkUp;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = { logoutUser, uploadImage};

Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))

//INCASE IF YOU NEED TO LOGOUT
/*
          <MyButton tip="Logout" onClick={this.handleLogout}>
                  <KeyboardReturn color="secondary" />  
              </MyButton>
*/