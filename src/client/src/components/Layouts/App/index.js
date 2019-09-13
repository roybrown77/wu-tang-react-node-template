import React from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import {createBrowserHistory} from 'history';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import get from 'lodash/get';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const history = createBrowserHistory({forceRefresh: true});

const styles = theme => ({
    appBar: {
        boxShadow: 'none',
        height: '56px',
        backgroundColor: '#444'
    },
    toolBar: {
        minHeight: '0'
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
    navigationUnselected: {
        fontWeight: '600',
        fontSize: '16px',
        color: 'white',
        textDecoration: 'none'
    },
    navigationSelected: {
        fontWeight: '600',
        fontSize: '16px',
        color: 'white',
        height: '3.5rem',
        padding: '.5em',
        border: '2px solid #708090',
        borderRadius: '6px',
        textDecoration: 'none'
    }
});

class AppLayout extends React.Component {
    constructor(props) {
        super(props);
        const isLoggedIn = !!localStorage.getItem('token');
        const pathname = window.location.pathname;

        this.state = {
            isLoggedIn,
            selection: pathname.replace('/','')
        };
    }

    handleLogout = async (event) => {
        event.preventDefault();
        history.push('/login');
    };

    handleLogin = async (event) => {
        event.preventDefault();
        history.push('/login');
    };

    handleRegister = async (event) => {
        event.preventDefault();
        history.push('/register');
    };

    handleSelectNavOption = async (event) => {
        const fieldName = get(event, 'target.name');
        this.setState(() => {
            return {selection: fieldName}
        })
    };

    render() {
        const {} = this.state;
        const {classes, children, title} = this.props;

        return (
            <DocumentTitle title={`${title} | Wu-Tang x React Node Template`}>
                <React.Fragment>
                    <CssBaseline />
                    <AppBar position="static" className={classNames(classes.appBar)}>
                        <Toolbar className={classNames(classes.toolBar)}>
                            <h3 style={{fontSize: '18px', fontWeight: 'bold', color: '#E2A42B'}}>
                                {'Wu-Tang x React Node Template'}
                            </h3>
                        </Toolbar>
                    </AppBar>
                    <div className={classNames(classes.main)}>
                        {children}
                    </div>
                </React.Fragment>
            </DocumentTitle>
        );
    }
};

const mapStateToProps = (state, ownProps) => {
    return{
        ...ownProps
    }
};

AppLayout.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.any,
    title: PropTypes.string
};

AppLayout.defaultProps = {
    title: ''
};

export default connect(mapStateToProps, {})(withStyles(styles)(AppLayout));