import PropTypes from 'prop-types';
import { Card, Flex, Text, Button } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

function GameOver({ onRestart, formatTime, currentTime }) {
  return (
    <Card shadow="md" radius="lg" withBorder>
      <Flex direction="column" gap="md" align="center">
        <IconX size={48} color="red" />
        <Text size="xl" fw={700}>Game Over!</Text>
        <Text>Time taken: {formatTime(currentTime)}</Text>
        <Text>You ran out of time before completing all stages.</Text>
        <Button color="blue" onClick={onRestart}>Try Again</Button>
      </Flex>
    </Card>
  );
}

GameOver.propTypes = {
  onRestart: PropTypes.func.isRequired,
  formatTime: PropTypes.func.isRequired,
  currentTime: PropTypes.number.isRequired
};

export default GameOver;