import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import classNames from 'classnames';
//import ReactAudioPlayer from 'react-audio-player';

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

const lucyKillerTape = 'https://user-images.githubusercontent.com/1335262/44238991-16cc2500-a185-11e8-9abe-145d2d9619ba.png';

const styles = makeStyles(theme => ({
    root: {
        margin: '1.1rem 0',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
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
                        <img src={tile.img} alt={tile.title} />
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
                img: lucyKillerTape,
                title: 'Lucy Killer Tape'
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
                ...album,
                ...albumDataFound
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
                    <div style={{padding:'2rem 0'}}>
                        <Grid container justify={'center'}>
                            {
                                width === 'lg' &&
                                <Grid item lg={1}>
                                    <Link to='/albums' style={{
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
                                    </Link>
                                </Grid>
                            }
                            <Grid item lg={4}>
                                <div style={{display:'flex', flex: '0 0 270px', color:'#444'}}>
                                    <div style={{marginLeft: '1.1rem', fontSize:'16px'}}>
                                        <h2 style={{fontSize:'24px', fontWeight:'bold', margin: '0'}}>
                                            Share Your Wu With Everyone
                                        </h2>
                                        <div>From 36 chambers to Wu Saga soundtrack.</div>
                                        <div style={{marginTop:'1.1rem'}}>
                                            <Button variant="contained" style={{backgroundColor:'#00b6e3', color: '#fff', fontWeight:'bold', padding:'10px 40px' }}>
                                                <span style={{fontSize:'12px'}}>Upload Album</span>
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
                                                        <div>{album.album.sampleTrack.title}</div>
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