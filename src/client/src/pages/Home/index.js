import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import ReactPlayer from 'react-player';

import get from 'lodash/get';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

import AddIcon from '@material-ui/icons/Add';

import { getAlbumCovers } from '../../actions/albumActions';
import AppLayout from '../../components/Layouts/App';

import wuFranklin from '../../images/franklin-benzi.jpg';
import linusWu from '../../images/linus-wu.png';
import lucyKillerTape from '../../images/lucy-killer-tape.jpg';
import linusShorty from '../../images/linus-shorty.jpg';
import wutangJoint from '../../images/wu-tang-joint.png';
import wutangAgain from '../../images/wu-tang-again.png';
import wu from '../../images/wu.jpg';

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
    },
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
        description: 'Epic first group album',
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
                img: linusWu,
                title: 'Linus Wu'
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
        name: 'Ironman (Ghostface Killah album)',
        released: 'October 29, 1996',
        length: '64:48',
        label: 'Epic, Razor Sharp',
        producer: 'RZA (also exec.), Mitchell Diggs (exec.), Oli Grant (exec.), D.Coles (exec.), True Master',
        description: 'Tony Starks',
        coverArt: '',
        sampleTrack: {
            title: 'After the Smoke is Clear',
            src: 'https://upload.wikimedia.org/wikipedia/en/4/46/After_the_Smoke_Is_Clear_%28Ghostface_Killah_song_-_sample%29.ogg'
        },
        visuals: [
            {
                img: wuFranklin,
                title: 'Wu Franklin'
            },
            {
                img: linusWu,
                title: 'Linus Wu'
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
        name: 'Liquid Swords',
        released: 'November 7, 1995',
        length: '50:49',
        label: 'Geffen, MCA',
        producer: 'RZA',
        description: 'GZA Genius',
        coverArt: '',
        sampleTrack: {
            title: 'I Gotcha Back',
            src: 'https://upload.wikimedia.org/wikipedia/en/f/f7/I_Gotcha_Back.ogg'
        },
        visuals: [
            {
                img: wuFranklin,
                title: 'Wu Franklin'
            },
            {
                img: linusWu,
                title: 'Linus Wu'
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
        descriptionStyling: {
            color: 'white',
            backgroundColor: 'purple',
            fontWeight: 'bold',
        },
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
                img: linusWu,
                title: 'Linus Wu'
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
        const {width, albums, dataLoading, loadingComplete} = this.props;

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
                    <div style={{padding:'1rem 0'}}>
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
                                <div>
                                    <img
                                    style={{height:'300px'}}
                                    src={wu}
                                    alt={'Wu!'} />
                                </div>
                                <Button 
                                    onClick={this.handleSearchWuBangers}
                                    variant="contained" style={{backgroundColor:'#E2A42B', color: '#fff', fontWeight:'bold', padding:'16px 40px', margin: '16px 0'}}>
                                    <span style={{fontSize:'12px'}}>Search Wu Bangers</span>
                                </Button>
                            </Grid>
                        </Grid>
                        {
                          dataLoading && 
                          <div style={{flexGrow: 1,padding:'1rem'}}>
                            <Typography align="center" color="textSecondary" paragraph>
                              Takes a minute to get album covers from wikipedia so watch youtube or netflix.  :D
                            </Typography>
                            <LinearProgress />
                            <br />
                            <LinearProgress color="secondary" />
                            <br />
                            <LinearProgress />
                            <br />
                            <LinearProgress color="secondary" />
                            <br />
                            <LinearProgress />
                            <br />
                            <LinearProgress color="secondary" />
                            <br />
                            <LinearProgress />
                          </div>
                        }
                        {
                            loadingComplete &&
                            mergedAlbumList.length === 0 &&
                            <div>
                                <h3 style={{fontSize:'17px', fontWeight:'bold', margin: '10px 0', color:'#444'}}>
                                    No albums found.  Please try again.
                                </h3>
                                <img style={{width:'50%'}} src={linusShorty} alt="No albums found" />
                            </div>
                        }
                        {
                            !dataLoading &&
                            mergedAlbumList.map(album=>{
                                return (
                                    <div key={album.id} style={{margin: '1.1rem'}}>
                                        <Divider light style={{marginRight: '1.1rem'}}/>
                                        <Grid container>
                                            <Grid item xs={12} md={5} lg={3}>
                                                <div style={{display:'flex', flex: '0 0 270px', color:'#444', margin:'1.1rem 0'}}>
                                                    <div>
                                                        <div>
                                                            <img
                                                            style={{width: '175px', borderRadius: '8px'}}
                                                            src={album.coverArt || wu}
                                                            alt={album.name} />
                                                        </div>
                                                        <div style={{textAlign:'center',}}>
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
                                                            <div style={album.descriptionStyling}>{album.description}</div>
                                                            <div style={{fontWeight:'bold'}}>{album.sampleTrack.title}</div>
                                                            <div>
                                                                <ReactPlayer 
                                                                    url={album.sampleTrack.src} 
                                                                    playing={true}
                                                                    loop 
                                                                    controls
                                                                    width={'200px'}
                                                                    height={'35px'}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div style={{margin: '0 .7rem', fontSize:'12px',textAlign:'left'}}>
                                                        <h2 style={{fontWeight:'bold', margin: '0'}}>
                                                            {album.name}
                                                        </h2>
                                                        <div><b>Released </b>{album.released}</div>
                                                        <div><b>Length </b>{album.length}</div>
                                                        <div><b>Label </b>{album.label}</div>
                                                        <div><b>Producer </b>{album.producer}</div>
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
                    </div>
                    <div style={{padding:'2rem', backgroundColor: '#F7F7F7'}}>
                        {
                            width === 'lg' &&
                            <div style={{
                                position: 'absolute',
                                left: '25%',
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
                        }
                        <Grid container justify={'center'}>
                            <Grid item lg={12}>
                                <div style={{fontSize:'16px', color:'#444'}}>
                                    <h2 style={{fontSize:'24px', fontWeight:'bold', margin: '0'}}>
                                        Share Your Wu With Everyone
                                    </h2>
                                    <div>Life stories from 36 Chambers to Wu American Saga.</div>
                                    <div style={{marginTop:'1.1rem'}}>
                                        <Button variant="contained" style={{backgroundColor:'#00b6e3', color: '#fff', fontWeight:'bold', padding:'10px 40px' }}>
                                            <span style={{fontSize:'12px'}}>Upload Story</span>
                                        </Button>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </section>
            </AppLayout>
        );
    }
}

const mapStateToProps = (state) => {
    const albumList = get(state,'albumList',{});
    const dataLoading = get(albumList, 'dataLoading');
    const loadingComplete = get(albumList, 'loadingComplete');
    const albums = get(albumList, 'items', []);

    return {
        dataLoading,
        loadingComplete,
        albums
    }
};

Home.propTypes = {
    albums: PropTypes.array,
    dataLoading: PropTypes.bool,
    loadingComplete: PropTypes.bool,
    getAlbumCovers: PropTypes.func.isRequired
};

Home.defaultProps = {
    albums: [],
    dataLoading: true,
    loadingComplete: false
};

export default compose(
    withStyles(styles),
    withWidth(),
    connect(mapStateToProps,{getAlbumCovers})
)(Home);