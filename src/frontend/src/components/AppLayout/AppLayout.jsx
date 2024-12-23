import classNames from 'classnames';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import OpenInNewTabIcon from '../OpenInNewTabIcon/OpenInNewTabIcon';
import useSyncServiceWorker from './useSyncServiceWorker';

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
    fontFamily: 'monospace',
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
  useSyncServiceWorker();

  return (
    <div>
      <CssBaseline />
      <AppBar position="static" className={classNames(classes.appBar)} role="banner" aria-label="Wu-Tang Navbar">
        <Toolbar className={classNames(classes.toolBar)}>
          <h1
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#E2A42B',
              margin: '15px auto',
              fontFamily: 'monospace',
            }}
          >
            {'Wu-Tang x React x Node x HI'}
          </h1>
        </Toolbar>
      </AppBar>
      <main className={classNames(classes.main)} role="main">
        {children}
      </main>
      <footer className={classNames(classes.footer)} role="contentinfo">
        <p>
          This web app will retrieve album covers from Wikipedia and display them for the <a href="https://www.thewutangclan.com" target="_blank" rel="noopener noreferrer">legendary hip hop group Wu-Tang Clan <OpenInNewTabIcon /></a>. It's a demo to showcase how to
          build a web app using <a href="https://react.dev" target="_blank" rel="noopener noreferrer">ReactJs <OpenInNewTabIcon /></a> and <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer">NodeJs <OpenInNewTabIcon /></a> javascript software. Code can be found at{' '}
          <a href="https://www.github.com/roybrown77/wu-tang-react-node-template" target="_blank" rel="noopener noreferrer">Wu-Tang x React x Node x HI x GitHub Repository <OpenInNewTabIcon /></a> since Wu-Tang is for the kids.
          Sample music track doesn't appear/play on a mobile device, so listen on desktop. Learning how to C.O.D.E. is easier when you build something fun that you care about even if it's all so simple.  Enjoy. :D
        </p>
      </footer>
    </div>
  );
};

AppLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  title: PropTypes.string,
};

AppLayout.defaultProps = {
  title: '',
};

export default withStyles(styles)(AppLayout);
