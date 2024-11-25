import { useState } from 'react';
import axios from 'axios';

import withWidth from '@material-ui/core/withWidth';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import AppLayout from '../../components/AppLayout/AppLayout';
import AlbumList from '../../components/AlbumList/AlbumList';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';

import wu from '../../images/wu.jpg';
import albumData from './albumData';

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
      const mergedAlbumList = albumData.map(album => {
        const albumCoverFound = (response.data || []).find(albumCover => albumCover.id === album.id);
        return {
          ...album,
          ...albumCoverFound,
        };
      });
      setAlbums(mergedAlbumList);
      setDataLoading(false);
    } catch (error) {
      console.error('Error fetching album covers:', error);
      setDataLoading(false);
    }
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
                onClick={fetchAlbumCovers}
              >
                <span style={{ fontSize: '12px' }}>Search Wu Bangers</span>
              </Button>
            </Grid>
          </Grid>
          {dataLoading ? (
            <LoadingIndicator message="Takes a few seconds to get album covers from the server... :D" />
          ) : (
            <AlbumList albums={albums} width={width} onCoverArtError={handleAlbumCoverArtError} />
          )}
        </div>
      </section>
    </AppLayout>
  );
};

export default withWidth()(Home);
