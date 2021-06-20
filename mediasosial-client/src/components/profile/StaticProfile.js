import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import './Profile.scss'

//MUI
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';


const styles = {
  card: {
    position: 'constant',
    background: '#eff4f5',
    marginBottom: '20px',
    borderRadius: '30px',
    boxShadow: '4px 4px 10px #cdced1, -4px -4px 4.5px #ffffff',
    padding: '30px 5px 45px 5px',
    margin: 'auto auto',
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
};

const StaticProfile = (props) => {
    const { classes, 
            profile: { 
                handle, 
                createdAt, 
                imageUrl, 
                bio, 
                website, 
                location
              }} = props;

    return(
      <Card className={classes.card}>
                <div className={classes.profile}>
                    <div  className="image-wrapper">
                        <img src={imageUrl} alt="profile" className='profile-pic'/>
                    </div>
                    <hr/>
                    <div className="profile-details">
                    <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                        @{handle}
                    </MuiLink>
                    <hr/>
                    {bio && <Typography variant="body2">{bio}</Typography>}
                    <hr/>
                    {location && (
                       <Fragment>
                           <div className="locationInfo"/> <span>{location}</span>
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
                    <div className="calendarInfo"/>{' '}
                    <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                    </div>
                </div>
            </Card>
    )
}

StaticProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(StaticProfile)
