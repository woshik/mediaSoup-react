import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import isElectron from 'is-electron';
import PropTypes from 'prop-types';
import { useIntl, FormattedMessage } from 'react-intl';
import randomString from 'random-string';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CookieConsent from 'react-cookie-consent';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import logo from '../images/wire2-logo.png';

const styles = (theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  dialogTitle: {},
  dialogPaper: {
    width: '30vw',
    padding: theme.spacing(2),
    [theme.breakpoints.down('lg')]: {
      width: '40vw',
    },
    [theme.breakpoints.down('md')]: {
      width: '50vw',
    },
    [theme.breakpoints.down('sm')]: {
      width: '70vw',
    },
    [theme.breakpoints.down('xs')]: {
      width: '90vw',
    },
  },
  logo: {
    display: 'block',
    paddingBottom: '1vh',
  },
  loginButton: {
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(2),
    padding: 0,
  },
  largeIcon: {
    fontSize: '2em',
  },
  largeAvatar: {
    width: 50,
    height: 50,
  },
  green: {
    color: 'rgba(0, 153, 0, 1)',
  },
  siteLogo: {
    width: '30%',
    display: 'block',
  },
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const ChooseRoom = ({ classes }) => {
  const [roomId, setRoomId] = useState(randomString({ length: 8 }).toLowerCase());

  const intl = useIntl();

  return (
    <div className={classes.root}>
      <Dialog
        open
        classes={{
          paper: classes.dialogPaper,
        }}
      >
        <Grid container direction="row" justify="center" alignItems="center">
          <img alt="wire logo" variant="square" src={logo} className={classes.siteLogo}></img>
        </Grid>
        <hr />
        <DialogContent>
          <DialogContentText gutterBottom>
            <FormattedMessage
              id="room.chooseRoom"
              defaultMessage="Choose the name of the room you would like to join"
            />
          </DialogContentText>

          <TextField
            id="roomId"
            label={intl.formatMessage({
              id: 'label.roomName',
              defaultMessage: 'Room name',
            })}
            value={roomId}
            variant="outlined"
            margin="normal"
            onChange={(event) => {
              const { value } = event.target;

              setRoomId(value.toLowerCase());
            }}
            onBlur={() => {
              if (roomId === '') setRoomId(randomString({ length: 8 }).toLowerCase());
            }}
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button component={Link} to={`/${roomId}`} variant="contained" color="secondary">
            <FormattedMessage id="label.chooseRoomButton" defaultMessage="Continue" />
          </Button>
        </DialogActions>

        {!isElectron() && (
          <CookieConsent
            buttonText={intl.formatMessage({
              id: 'room.consentUnderstand',
              defaultMessage: 'I understand',
            })}
          >
            <FormattedMessage
              id="room.cookieConsent"
              defaultMessage="This website uses cookies to enhance the user experience"
            />
          </CookieConsent>
        )}
      </Dialog>
    </div>
  );
};

ChooseRoom.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChooseRoom);
