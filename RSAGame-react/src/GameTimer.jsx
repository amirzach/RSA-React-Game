import PropTypes from 'prop-types';
import { Text } from '@mantine/core';

function GameTimer({ isActive, currentTime, formatTime }) {
  return isActive ? (
    <Text size="xl" fw={700} ta="center" mb="md">
      Time: {formatTime(currentTime)}
    </Text>
  ) : null;
}

GameTimer.propTypes = {
  isActive: PropTypes.bool.isRequired,
  currentTime: PropTypes.number.isRequired,
  formatTime: PropTypes.func.isRequired
};

export default GameTimer;