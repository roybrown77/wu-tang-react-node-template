// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Route }from 'react-router-dom';
// import PropTypes from 'prop-types';

// import get from 'lodash/get';
// import last from 'lodash/last';

// import { searchHomes } from '../actions';
// import createHistory from 'history/createBrowserHistory';
// const history = createHistory();

// class HomePage extends Component {
//     constructor(props) {
//         super(props);
//         this.handleSearchHomes = this.handleSearchHomes.bind(this);
//     }

//     componentDidMount() {
//     }

//     handleSearchHomes(zipCode) {
//         this.props.searchHomes(zipCode);
//     }

//     render() {
//         return (
//             <div>
//               	{'Wu-Tang React Node Template'}
//             </div>
//         )
//     }
// }

// const mapStateToProps = (state, ownProps) => {
//     const homeDomain = state.get('homeDomain').toJS();
//     const dataLoading = get(homeDomain, 'dataLoading');
//     const homes = get(homeDomain, 'homes', []);

//     return {
//         dataLoading,
//         homes
//     }
// };

// HomePage.propTypes = {
//     dataLoading: PropTypes.bool,
//     homes: PropTypes.array,
//     searchHomes: PropTypes.func.isRequired
// };

// export default connect(mapStateToProps, {
//   searchHomes
// })(HomePage);

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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

const styles = theme => ({
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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function HomePage(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar}>
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
              Album layout
            </Typography>
            <Typography variant="title" align="center" color="textSecondary" paragraph>
              Something short and leading about the collection below—its contents, the creator, etc.
              Make it short and sweet, but not too short so folks don&apos;t simply skip over it
              entirely.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={16} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Main call to action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          {/* End hero unit */}
          <Grid container spacing={40}>
            {cards.map(card => (
              <Grid item key={card} sm={6} md={4} lg={3}>
                <Card>
                  <CardMedia
                    className={classes.cardMedia}
                    image={'https://upload.wikimedia.org/wikipedia/en/7/75/Ironman.jpg'}
                    title="Image title"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the content.
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

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);