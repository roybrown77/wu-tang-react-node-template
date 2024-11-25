import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import AlbumDetails from '../AlbumDetails/AlbumDetails';
import AlbumImageCarousel from '../AlbumImageCarousel/AlbumImageCarousel';

const AlbumList = ({ albums, width, onCoverArtError }) => (
  albums.map((album, albumIndex) => (
    <div key={album.id} style={{ margin: '1.1rem' }}>
      <Divider light style={{ marginRight: '1.1rem' }} />
      <Grid container>
        <Grid item xs={12} md={5} lg={3}>
          <AlbumDetails album={album} onCoverArtError={() => onCoverArtError(albumIndex)} />
        </Grid>
        <Grid item xs={12} md={7} lg={9}>
          <AlbumImageCarousel tileData={album.visuals || []} width={width} />
        </Grid>
      </Grid>
    </div>
  ))
);

AlbumList.propTypes = {
  albums: PropTypes.array.isRequired,
  width: PropTypes.string.isRequired,
  onCoverArtError: PropTypes.func.isRequired,
};

export default AlbumList;
