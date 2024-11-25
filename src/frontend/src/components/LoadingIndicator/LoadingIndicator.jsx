import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

const LoadingIndicator = ({ message }) => (
  <div style={{ flexGrow: 1, padding: '1rem' }}>
    <Typography style={{ fontFamily: 'monospace', fontSize: '0.75rem' }} align="center" color="textSecondary" paragraph>
      {message}
    </Typography>
    <LinearProgress />
  </div>
);

LoadingIndicator.propTypes = {
  message: PropTypes.string.isRequired,
};

export default LoadingIndicator;
