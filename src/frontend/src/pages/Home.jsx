import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

import { makeStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

import Grid from '@material-ui/core/Grid';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

import AppLayout from '../components/AppLayout';
import wuFranklin from '../images/franklin-benzi.jpg';
import linusWu from '../images/linus-wu.png';
import lucyKillerTape from '../images/lucy-killer-tape.jpg';
import linusShorty from '../images/linus-shorty.jpg';
import wutangJoint from '../images/wu-tang-joint.png';
import wutangAgain from '../images/wu-tang-again.png';
import wu from '../images/wu.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '1.1rem 0',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  imageList: {
    flexWrap: 'nowrap',
    backgroundColor: '#fafafa',
    transform: 'translateZ(0)', // Promotes the list to its own layer on Chrome
  },
  tile: {
    border: '1rem white solid',
    marginRight: '10px',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background: 'none',
  },
}));

const AlbumImageCarousel = ({ tileData, width }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ImageList className={classes.imageList} cols={width === 'lg' ? 4.5 : width === 'md' ? 2.5 : 1.5}>
        {tileData.map((tile, index) => (
          <ImageListItem key={index} classes={{ root: classes.tile }}>
            <img style={{ width: '50%' }} src={tile.img} alt={tile.title} />
            <ImageListItemBar classes={{ root: classes.titleBar, title: classes.title }} />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

AlbumImageCarousel.propTypes = {
  tileData: PropTypes.array.isRequired,
  width: PropTypes.string.isRequired,
};

const getRandomSet = (arr, numItems) => {
  // Step 1: Shuffle the array
  const shuffledArray = arr.sort(() => Math.random() - 0.5);

  // Step 2: Select the first 'numItems' from the shuffled array
  return shuffledArray.slice(0, numItems);
};

const isMobileDevice = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Check for iOS devices
  if (/iPhone|iPad|iPod/i.test(userAgent)) {
    return true;
  }

  // Check for Android devices
  if (/Android/i.test(userAgent)) {
    return true;
  }

  // You can extend this to cover more mobile device cases as needed
  return false;
};

const visuals = [
  {
    img: wuFranklin,
    title: "Wu Franklin",
  },
  {
    img: linusWu,
    title: "Linus Wu",
  },
  {
    img: lucyKillerTape,
    title: "Lucy Killer Tape",
  },
  {
    img: linusShorty,
    title: "Linus Shorty",
  },
  {
    img: wutangJoint,
    title: "Wu-Tang Joint",
  },
  {
    img: wutangAgain,
    title: "Wu-Tang Again",
  },
];

const albumData = [
  {
    id: 1,
    visuals: structuredClone(visuals),
  },
  {
    id: 2,
    visuals: getRandomSet(structuredClone(visuals), 4),
  },
  {
    id: 3,
    visuals: getRandomSet(structuredClone(visuals), 4),
  },
  {
    id: 4,
    visuals: getRandomSet(structuredClone(visuals), 4),
  },
  {
    id: 5,
    visuals: getRandomSet(structuredClone(visuals), 5),
  },
];

const Home = ({ width }) => {
  const [albums, setAlbums] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  const handleAlbumCoverArtError = (albumIndex) => {
    const updatedAlbums = albums.map((item, i) => 
      i === albumIndex ? { ...item, coverArt: null } : item
    );
    setAlbums(updatedAlbums);
  };

  const fetchAlbumCovers = async () => {
    try {
      setDataLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay
      const response = await axios.get(`${window.location.origin}/api/albummanagement/albumcovers`);
      const mergedAlbumList = albumData.map(albumData=>{
        const albumCoverFound = (response.data || []).find(albumCover=>albumCover.id===albumData.id);
        return {
            ...albumData,
            ...albumCoverFound,
        }
      });
      setAlbums(mergedAlbumList); // Assuming the API returns the album covers in this format
      setDataLoading(false);
    } catch (error) {
      console.error('Error fetching album covers:', error);
      setDataLoading(false);
    } finally {
      setDataLoading(false);
    }
  };

  const handleSearchWuBangers = () => {
    fetchAlbumCovers();
  };

  return (
    <AppLayout title="Discover Wu-Tang Albums!">
      <section data-component="album-list">
        <div style={{ padding: '1rem 0' }}>
          <Grid container justifyContent="center">
            <Grid item xs={12}>
              <div>
                <img style={{ height: '300px' }} src={wu} alt="Wu!" />
              </div>
              <Button
                variant="contained"
                disabled={dataLoading}
                style={{
                  backgroundColor: '#E2A42B',
                  color: '#fff',
                  fontFamily: 'monospace',
                  fontWeight: 'bold',
                  margin: '16px 0',
                  padding: '16px 40px',
                }}
                onClick={handleSearchWuBangers}
              >
                <span style={{ fontSize: '12px' }}>Search Wu Bangers</span>
              </Button>
            </Grid>
          </Grid>
          {dataLoading && (
            <div style={{ flexGrow: 1, padding: '1rem' }}>
              <Typography style={{ fontFamily: 'monospace', fontSize: '0.75rem' }} align="center" color="textSecondary" paragraph>
                Takes a few seconds to get album covers from the server... :D
              </Typography>
              <LinearProgress />
            </div>
          )}
          {!dataLoading &&
            albums.map((album, albumIndex) => (
              <div key={album.id} style={{ margin: '1.1rem' }}>
                <Divider light style={{ marginRight: '1.1rem' }} />
                <Grid container>
                  <Grid item xs={12} md={5} lg={3}>
                    <div style={{ display: 'flex', flex: '0 0 270px', color: '#444', margin: '1.1rem 0' }}>
                      <div>
                        {album.coverArt && <img style={{ width: '175px', borderRadius: '8px' }} src={album.coverArt} alt={album.name} onError={()=>handleAlbumCoverArtError(albumIndex)} />}
                        {!album.coverArt &&
                          <>
                            <img style={{ width: '175px', borderRadius: '8px' }} src={linusShorty} alt="Album cover not found" />
                            <div>Album cover not found</div>
                          </>
                        }
                        <div style={{ textAlign: 'center', marginTop: '.5rem' }}>
                          <div style={{ fontWeight: 'bold' }}>{album.description}</div>
                          {!isMobileDevice() && album.sampleTrack &&
                            <div style={{ marginTop: '.5rem' }}>
                              <div style={{ fontWeight: 'bold' }}>{album.sampleTrack?.title}</div>
                              <ReactPlayer
                                url={album.sampleTrack?.src}
                                playing={false}
                                loop
                                controls
                                width="200px"
                                height="35px"
                              />
                            </div>
                          }
                          </div>
                      </div>
                      <div style={{ margin: '0 .7rem', fontSize: '12px', textAlign: 'left' }}>
                        <h2 style={{ fontWeight: 'bold', margin: '0' }}>{album.name}</h2>
                        <div>
                          <b>Released: </b>
                          {album.released}
                        </div>
                        <div>
                          <b>Length: </b>
                          {album.length}
                        </div>
                        <div>
                          <b>Label: </b>
                          {album.label}
                        </div>
                        <div>
                          <b>Producer: </b>
                          {album.producer}
                        </div>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={7} lg={9}>
                    <AlbumImageCarousel tileData={album.visuals || []} width={width} />
                  </Grid>
                </Grid>
              </div>
            ))}
        </div>
      </section>
    </AppLayout>
  );
};

Home.propTypes = {
  width: PropTypes.string.isRequired,
};

export default withWidth()(Home);
