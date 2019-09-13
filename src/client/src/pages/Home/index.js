import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import classNames from 'classnames';
import ReactPlayer from 'react-player'

import get from 'lodash/get';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth'

import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import AddIcon from '@material-ui/icons/Add';
//import PlayIcon from '@material-ui/icons/PlacyCircleOutline';

import { getAlbumCovers } from '../../actions/albumActions';
import AppLayout from '../../components/Layouts/App';

import wuFranklin from '../../images/wu-franklin.jpg';
import lucyKillerTape from '../../images/lucy-killer-tape.jpg';
import linusShorty from '../../images/linus-shorty.jpg';
import wutangJoint from '../../images/wu-tang-joint.png';
import wutangAgain from '../../images/wu-tang-again.png';

const styles = makeStyles(theme => ({
    root: {
        margin: '1.1rem 0',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden'
    },
    gridList: {
        flexWrap: 'nowrap',
        backgroundColor: '#fafafa',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    tile: {
        border: '1rem white solid',
        marginRight: '10px'
    },
    title: {
        color: theme.palette.primary.light
    },
    titleBar: {
        background: 'none'
    }
}));

const SingleLineGridList = (props) => {
    const classes = styles();

    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={props.width === 'lg' ? 4.5 : props.width === 'md' ? 2.5 : 1.5}>
            {
                props.tileData.map(tile => (
                    <GridListTile key={tile.img} classes={{tile: classes.tile}}>
                        <img style={{width:'50%'}} src={tile.img} alt={tile.title} />
                        <GridListTileBar classes={{root: classes.titleBar,title: classes.title}}/>
                    </GridListTile>
                ))
            }
            </GridList>
        </div>
    );
};

const albumData = [
    {
        id: 1,
        name: 'Enter the Wu-Tang (36 Chambers)',
        released: 'November 9, 1993',
        length: '61:31',
        label: 'Loud',
        producer: 'RZA (also exec.), Ol Dirty Bastard, Method Man',
        description: 'epic first group album',
        coverArt: '',
        sampleTrack: {
            title: 'Protect Ya Neck',
            src: 'https://upload.wikimedia.org/wikipedia/en/a/ae/Protectyaneck.ogg'
        },
        visuals: [
            {
                img: wuFranklin,
                title: 'Wu Franklin'
            },
            {
                img: lucyKillerTape,
                title: 'Lucy Killer Tape'
            },
            {
                img: linusShorty,
                title: 'Life As a Shorty'
            },
            {
                img: wutangJoint,
                title: 'Wu-Tang Joint'
            },
            {
                img: wutangAgain,
                title: 'Wu-Tang Again'
            }
        ]
    },
    {
        id: 2,
        name: 'Enter the Wu-Tang (36 Chambers)',
        released: 'November 9, 1993',
        length: '61:31',
        label: 'Loud',
        producer: 'RZA (also exec.), Ol Dirty Bastard, Method Man',
        description: 'epic first group album',
        coverArt: '',
        sampleTrack: {
            title: 'Protect Ya Neck',
            src: 'https://upload.wikimedia.org/wikipedia/en/a/ae/Protectyaneck.ogg'
        },
        visuals: [
            {
                img: wuFranklin,
                title: 'Wu Franklin'
            },
            {
                img: lucyKillerTape,
                title: 'Lucy Killer Tape'
            },
            {
                img: linusShorty,
                title: 'Life As a Shorty'
            },
            {
                img: wutangJoint,
                title: 'Wu-Tang Joint'
            },
            {
                img: wutangAgain,
                title: 'Wu-Tang Again'
            }
        ]
    },
    {
        id: 3,
        name: 'Enter the Wu-Tang (36 Chambers)',
        released: 'November 9, 1993',
        length: '61:31',
        label: 'Loud',
        producer: 'RZA (also exec.), Ol Dirty Bastard, Method Man',
        description: 'epic first group album',
        coverArt: '',
        sampleTrack: {
            title: 'Protect Ya Neck',
            src: 'https://upload.wikimedia.org/wikipedia/en/a/ae/Protectyaneck.ogg'
        },
        visuals: [
            {
                img: wuFranklin,
                title: 'Wu Franklin'
            },
            {
                img: lucyKillerTape,
                title: 'Lucy Killer Tape'
            },
            {
                img: linusShorty,
                title: 'Life As a Shorty'
            },
            {
                img: wutangJoint,
                title: 'Wu-Tang Joint'
            },
            {
                img: wutangAgain,
                title: 'Wu-Tang Again'
            }
        ]
    },
    {
        id: 4,
        name: 'Only Built 4 Cuban Linx',
        released: 'August 1, 1995',
        length: '   69:30',
        label: 'Loud RCA',
        producer: 'RZA (also exec.), Mitchell Diggs (exec.), Oli Grant (exec.)',
        description: 'The Purple Tape',
        coverArt: '',
        sampleTrack: {
            title: 'Criminology',
            src: 'https://upload.wikimedia.org/wikipedia/en/d/d6/Criminology.ogg'
        },
        visuals: [
            {
                img: wuFranklin,
                title: 'Wu Franklin'
            },
            {
                img: lucyKillerTape,
                title: 'Lucy Killer Tape'
            },
            {
                img: linusShorty,
                title: 'Life As a Shorty'
            },
            {
                img: wutangJoint,
                title: 'Wu-Tang Joint'
            },
            {
                img: wutangAgain,
                title: 'Wu-Tang Again'
            }
        ]
    }
];

class Home extends React.Component {
    handleSearchWuBangers = async (event) => {
        event.preventDefault();
        this.props.getAlbumCovers();
    };


    render() {
        const {width, albums, dataLoading} = this.props;

        const mergedAlbumList = albums.map(album=>{
            const albumDataFound = albumData.find(data=>data.id===album.id);
            return {
                ...albumDataFound,
                ...album
            }
        });

        return (
            <AppLayout title="Discover Wu-Tang Albums!">
                <section data-component="album-list">
                    <div style={{padding:'1rem 0', backgroundColor: '#e1e4e8', borderBottom: '1px solid #d7dbdf'}}>
                        <Grid container justify={'center'}>
                            {
                                false &&
                                <div>
                                    <Grid item xs={8} md={8} lg={2}>
                                        <TextField
                                            id="outlined-year"
                                            label="Year"
                                            onChange={()=>{}}
                                            margin="normal"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={8} md={8} lg={2}>
                                        <TextField
                                            id="outlined-producer"
                                            label="Producer"
                                            onChange={()=>{}}
                                            margin="normal"
                                            variant="outlined"
                                        />
                                    </Grid>
                                </div>
                            }
                            <Grid item xs={12}>
                                <Button 
                                    onClick={this.handleSearchWuBangers}
                                    variant="contained" style={{backgroundColor:'#E2A42B', color: '#fff', fontWeight:'bold', padding:'16px 40px', margin: '16px 0'}}>
                                    <span style={{fontSize:'12px'}}>Search Wu Bangers</span>
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                    <div style={{padding:'2rem'}}>
                        <Grid container justify={'center'}>
                            {
                                width === 'lg' &&
                                <Grid item lg={1}>
                                    <div style={{
                                        display: 'inline-block',
                                        height: '100px',
                                        width: '100px',
                                        color: '#bbb',
                                        border: '5px dashed #bbb',
                                        background: 'transparent',
                                        borderRadius: '50px',
                                        visited: {
                                            color: '#3a8bbb'
                                        }
                                    }}>
                                        <AddIcon style={{margin: '25px', fontSize: '40px'}}/>
                                    </div>
                                </Grid>
                            }
                            <Grid item lg={4}>
                                <div style={{display:'flex', flex: '0 0 270px', color:'#444'}}>
                                    <div style={{fontSize:'16px'}}>
                                        <h2 style={{fontSize:'24px', fontWeight:'bold', margin: '0'}}>
                                            Share Your Wu With Everyone
                                        </h2>
                                        <div>Life stories from 36 Chambers to Wu Saga soundtrack.</div>
                                        <div style={{marginTop:'1.1rem'}}>
                                            <Button variant="contained" style={{backgroundColor:'#00b6e3', color: '#fff', fontWeight:'bold', padding:'10px 40px' }}>
                                                <span style={{fontSize:'12px'}}>Upload Story</span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    {
                        mergedAlbumList.map(album=>{
                            return (
                                <div key={album.id} style={{marginLeft: '1.1rem'}}>
                                    <Divider light style={{marginRight: '1.1rem'}}/>
                                    <Grid container>
                                        <Grid item xs={12} md={5} lg={3}>
                                            <div style={{display:'flex', flex: '0 0 270px', color:'#444', margin:'1.1rem 0'}}>
                                                <div>
                                                    <div>
                                                        <img
                                                        style={{width: '175px', borderRadius: '8px'}}
                                                        src={album.coverArt}
                                                        alt={album.name} />
                                                    </div>
                                                    <div style={{textAlign:'center',marginTop:'1.1rem'}}>
                                                        {
                                                            false &&
                                                            <Link to='/albums' style={{
                                                                display: 'inline-block',
                                                                    height: '75px',
                                                                    width: '75px',
                                                                    color: '#bbb',
                                                                    border: '5px dashed #bbb',
                                                                    background: 'transparent',
                                                                    borderRadius: '37.5px',
                                                                    visited: {
                                                                    color: '#3a8bbb'
                                                                }
                                                            }}>
                                                                <AddIcon style={{margin: '18px', fontSize: '30px'}}/>
                                                            </Link>
                                                        }
                                                    </div>
                                                </div>
                                                <div style={{marginLeft: '1.1rem', fontSize:'12px'}}>
                                                    <h2 style={{fontSize:'16px', fontWeight:'bold', margin: '0'}}>
                                                        {album.name}
                                                    </h2>
                                                    <div>{album.released}</div>
                                                    <div>{album.length}</div>
                                                    <div>{album.label}</div>
                                                    <div>{album.producer}</div>
                                                    <div>{album.description}</div>
                                                     <div style={{fontWeight:'bold'}}>{album.sampleTrack.title}</div>
                                                    <div>
                                                        <ReactPlayer 
                                                            url={album.sampleTrack.src} 
                                                            playing={true}
                                                            loop 
                                                            controls
                                                            width={'250px'}
                                                            height={'35px'}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={7} lg={9}>
                                            <SingleLineGridList tileData={album.visuals} width={width}/>
                                        </Grid>
                                    </Grid>
                                </div>
                            );
                        })
                    }
                    <div style={{height:'5rem'}}></div>
                </section>
            </AppLayout>
        );
    }
}

const mapStateToProps = (state) => {
    const albumList = get(state,'albumList',{});
    const dataLoading = get(albumList, 'dataLoading');
    const albums = get(albumList, 'items', []);

    return {
        dataLoading,
        albums
    }
};

Home.propTypes = {
    albums: PropTypes.array,
    dataLoading: PropTypes.bool
};

Home.defaultProps = {
    albums: [],
    dataLoading: true
};

export default compose(
    withStyles(styles),
    withWidth(),
    connect(mapStateToProps,{getAlbumCovers})
)(Home);