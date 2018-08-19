import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import get from 'lodash/get';

import { getAlbumCovers } from '../actions';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
  linearProgress: {
    flexGrow: 1,
  },
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  cardMedia: {
    padding: '50%', // 16:9
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.handleDoor1 = this.handleDoor1.bind(this);
        this.handleDoor2 = this.handleDoor2.bind(this);
    }

    handleDoor1(event, index) {
        this.props.getAlbumCovers();
    }

    handleDoor2(event, index) {
        this.props.getAlbumCovers();
    }

    render() {
      const { classes, albumCovers, dataLoading } = this.props;

      return (
        <React.Fragment>
          <CssBaseline />
          <AppBar position="static" style={{backgroundColor:'#E2A42B'}}>
            <Toolbar>
              <CameraIcon className={classes.icon} />
              <Typography variant="title" color="inherit" noWrap>
                {'Wu-Tang x React Node Template'}
              </Typography>
            </Toolbar>
          </AppBar>
          <main>
            {/* Hero unit */}
            <div className={classes.heroUnit}>
              <div className={classes.heroContent}>
                <Typography variant="display3" align="center" color="textPrimary" gutterBottom>
                  What do I listen to today?
                </Typography>
                <Typography variant="title" align="center" color="textSecondary" paragraph>
                  Pick door 1 or 2 to find out.
                </Typography>
                <div className={classes.heroButtons}>
                  <Grid container spacing={16} justify="center">
                    <Grid item>
                      <Button variant="contained" style={{backgroundColor:'#E2A42B'}} onClick={() => { this.handleDoor1() }}>
                        Door 1
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="outlined" style={{color:'#E2A42B'}} onClick={() => { this.handleDoor2() }}>
                        Door 2
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
            <div className={classNames(classes.layout, classes.cardGrid)}>
              {/* End hero unit */}
              {
                  dataLoading && 
                  <div className={classes.linearProgress}>
                    <LinearProgress />
                    <br />
                    <LinearProgress color="secondary" />
                  </div>
                }
              <Grid container spacing={40}>
                {
                  !dataLoading && albumCovers.map(albumCover => (
                  <Grid item key={get(albumCover,'term')} sm={6} md={4} lg={3}>
                    <Card>
                      <CardMedia
                        className={classes.cardMedia}
                        image={get(albumCover,'image','https://upload.wikimedia.org/wikipedia/en/7/75/Ironman.jpg')}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                          {get(get(albumCover,'term','').split(' album'),[0])}
                        </Typography>
                        <Typography>
                          {get(albumCover,'image') ? '' : 'tell wikipedia to setup the page already!  geez. until then u get another wu banger.'}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary">
                          View
                        </Button>
                        <Button size="small" color="primary">
                          Edit
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
          </main>
          {/* Footer */}
          <footer className={classes.footer}>
            <Typography variant="title" align="center" gutterBottom>
              Footer
            </Typography>
            <Typography variant="subheading" align="center" color="textSecondary" component="p">
              Something here to give the footer a purpose!
            </Typography>
          </footer>
          {/* End footer */}
        </React.Fragment>
      );
    }
}

const mapStateToProps = (state, ownProps) => {
    const albumDomain = state.get('albumDomain').toJS();
    const dataLoading = get(albumDomain, 'dataLoading');
    const albumCovers = get(albumDomain, 'albumCovers', []);

    return {
        dataLoading,
        albumCovers
    }
};

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
  albumCovers: PropTypes.array,
  dataLoading: PropTypes.bool
};

export default connect(mapStateToProps, {
  getAlbumCovers
})(withStyles(styles)(HomePage));