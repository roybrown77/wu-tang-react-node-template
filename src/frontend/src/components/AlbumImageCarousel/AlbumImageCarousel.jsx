import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';

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
  
  export default AlbumImageCarousel;