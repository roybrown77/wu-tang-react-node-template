import { useState } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import linusShorty from '../../images/linus-shorty.jpg';

const AlbumDetails = ({ album, onCoverArtError }) => {
  const [error, setError] = useState(false);
  const isMobileDevice = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /iPhone|iPad|iPod|Android/i.test(userAgent);
  };

  return (
    <div style={{ display: 'flex', flex: '0 0 270px', color: '#444', margin: '1.1rem 0' }}>
      <div>
        {album.coverArt ? (
          <img
            style={{ width: '175px', borderRadius: '8px' }}
            src={album.coverArt}
            alt={album.name}
            onError={onCoverArtError}
          />
        ) : (
          <>
            <img style={{ width: '175px', borderRadius: '8px' }} src={linusShorty} alt="Album cover not found" />
            <div>Album cover not found</div>
          </>
        )}
        <div style={{ textAlign: 'center', marginTop: '.5rem' }}>
          <div
            style={{
              fontWeight: 'bold',
              width: '200px',
              height: '35px'
            }}>
              {album.description}
          </div>
          {!isMobileDevice() && album.sampleTrack && !error && (
            <div style={{ marginTop: '.5rem' }}>
              <div style={{ fontWeight: 'bold' }}>{album.sampleTrack?.title}</div>
              <ReactPlayer
                url={album.sampleTrack?.src}
                playing={false}
                loop
                controls
                width="200px"
                height="35px"
                onError={(e) => {
                  setError(true);
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div style={{ margin: '0 .7rem', fontSize: '12px', textAlign: 'left' }}>
        <h2 style={{ fontWeight: 'bold', margin: '0' }}>{album.name}</h2>
        <div><b>Released: </b>{album.released}</div>
        <div><b>Length: </b>{album.length}</div>
        <div><b>Label: </b>{album.label}</div>
        <div><b>Producer: </b>{album.producer}</div>
      </div>
    </div>
  );
};

AlbumDetails.propTypes = {
  album: PropTypes.object.isRequired,
  onCoverArtError: PropTypes.func.isRequired,
};

export default AlbumDetails;
