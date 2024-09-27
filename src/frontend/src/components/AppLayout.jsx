import classNames from 'classnames';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const styles = (theme) => ({
  appBar: {
    boxShadow: 'none',
    height: '56px',
    backgroundColor: '#444',
  },
  toolBar: {
    minHeight: '0',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing(8)}px 0 ${theme.spacing(6)}px`,
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(1100 + theme.spacing(6))]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing(8)}px 0`,
  },
  cardMedia: {
    padding: '50%', // 16:9
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
    fontFamily: 'Poppins',
  },
  navigationUnselected: {
    fontWeight: '600',
    fontSize: '16px',
    color: 'white',
    textDecoration: 'none',
  },
  navigationSelected: {
    fontWeight: '600',
    fontSize: '16px',
    color: 'white',
    height: '3.5rem',
    padding: '.5em',
    border: '2px solid #708090',
    borderRadius: '6px',
    textDecoration: 'none',
  },
});

const AppLayout = ({ classes, children }) => {
  return (
    <div>
      <CssBaseline />
      <AppBar position="static" className={classNames(classes.appBar)}>
        <Toolbar className={classNames(classes.toolBar)}>
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#E2A42B',
              margin: '15px auto',
              fontFamily: 'Poppins',
            }}
          >
            {'Wu-Tang x React Node Template'}
          </h3>
        </Toolbar>
      </AppBar>
      <div className={classNames(classes.main)}>{children}</div>
      <div className={classNames(classes.footer)}>
        This web app will retrieve Wu-Tang album covers from Wikipedia and display them. It's a demo to showcase how to
        build a web app using <a href="https://react.dev">ReactJs</a> and <a href="https://nodejs.org">NodeJs</a> javascript software. Code can be found{' '}
        <a href="https://www.github.com/roybrown77/wu-tang-react-node-template">here</a> since Wu-Tang is for the kids.
        Sample music track doesn't appear/play on a mobile device so listen on desktop. Enjoy. :D
      </div>
    </div>
  );
};

AppLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.any,
  title: PropTypes.string,
};

AppLayout.defaultProps = {
  title: '',
};

export default withStyles(styles)(AppLayout);
