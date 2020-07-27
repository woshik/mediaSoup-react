import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRoomContext } from '../../RoomContext';
import * as roomActions from '../../actions/roomActions';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';

const styles = (theme) => ({
  dialogPaper: {
    width: '30vw',
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
    marginRight: 'auto',
  },
  link: {
    display: 'block',
    textAlign: 'center',
    marginBottom: theme.spacing(1),
  },
  divider: {
    marginBottom: theme.spacing(3),
  },
});

const About = ({ aboutOpen, handleCloseAbout, classes }) => {
  return (
    <Dialog
      open={aboutOpen}
      onClose={() => handleCloseAbout(false)}
      classes={{
        paper: classes.dialogPaper,
      }}
    >
      <DialogTitle id="form-dialog-title">
        <FormattedMessage id="room.about" defaultMessage="About" />
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText paragraph>
          WireSquare enables you to share your audio, slides, chat, video, and desktop with your team. Built-in polling
          makes it easy to engage your team, and recording your lectures helps you can make them available for later
          review.
        </DialogContentText>

        <Divider variant="middle" light className={classes.divider} />

        <DialogContentText align="left" paragraph>
          <span>Powered by: </span>
          <Link
            href="https://wiresquare.com"
            target="_blank"
            rel="noreferrer"
            color="secondary"
          >
            WireSquare.com
          </Link>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

About.propTypes = {
  roomClient: PropTypes.object.isRequired,
  aboutOpen: PropTypes.bool.isRequired,
  handleCloseAbout: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  aboutOpen: state.room.aboutOpen,
});

const mapDispatchToProps = {
  handleCloseAbout: roomActions.setAboutOpen,
};

export default withRoomContext(
  connect(mapStateToProps, mapDispatchToProps, null, {
    areStatesEqual: (next, prev) => {
      return prev.room.aboutOpen === next.room.aboutOpen;
    },
  })(withStyles(styles)(About))
);
