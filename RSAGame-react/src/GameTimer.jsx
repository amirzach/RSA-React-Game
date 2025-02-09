import PropTypes from 'prop-types';
import { Text } from '@mantine/core';

function GameTimer({ isActive, currentTime, formatTime }) {
  const timeRemaining = Math.max(0, currentTime);
  
  return isActive ? (
    <Text size="xl" fw={700} ta="center" mb="md" c={timeRemaining < 60 ? "red" : "inherit"}>
      Time Remaining: {formatTime(timeRemaining)}
    </Text>
  ) : null;
}

GameTimer.propTypes = {
  isActive: PropTypes.bool.isRequired,
  currentTime: PropTypes.number.isRequired,
  formatTime: PropTypes.func.isRequired
};

export default GameTimer;