import PropTypes from 'prop-types';
import { Card, Flex, Text, Button, Table } from '@mantine/core';
import { IconTrophy } from '@tabler/icons-react';

function LeaderboardCard({ leaderboardData, formatTime, onPlayAgain }) {
  return (
    <Card shadow="md" radius="lg" withBorder>
      <Flex direction="column" gap="md" align="center">
        <Text size="xl" fw={700}>Leaderboard <IconTrophy size={24} /></Text>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Rank</Table.Th>
              <Table.Th>Nickname</Table.Th>
              <Table.Th>Time</Table.Th>
              <Table.Th>Difficulty</Table.Th>
              <Table.Th>Date</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {leaderboardData.map((score, index) => (
              <Table.Tr key={index}>
                <Table.Td>{index + 1}</Table.Td>
                <Table.Td>{score.nickname}</Table.Td>
                <Table.Td>{formatTime(score.time)}</Table.Td>
                <Table.Td>{score.difficulty}</Table.Td>
                <Table.Td>{score.date}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
        <Button color="blue" onClick={onPlayAgain}>Play Again</Button>
      </Flex>
    </Card>
  );
}

LeaderboardCard.propTypes = {
  leaderboardData: PropTypes.arrayOf(PropTypes.shape({
    nickname: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    difficulty: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  })).isRequired,
  formatTime: PropTypes.func.isRequired,
  onPlayAgain: PropTypes.func.isRequired
};

export default LeaderboardCard;