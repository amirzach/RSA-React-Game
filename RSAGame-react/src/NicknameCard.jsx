import PropTypes from 'prop-types';
import { Card, Flex, Text, TextInput, Button } from '@mantine/core';

function NicknameCard({ nickname, setNickname, onSubmit }) {
  const handleNicknameSubmit = () => {
    if (nickname.trim()) {
      onSubmit();
    } else {
      alert("Please enter a nickname!");
    }
  };

  return (
    <Card shadow="md" radius="lg" withBorder>
      <Flex direction="column" gap="md" align="center">
        <Text size="xl" fw={700}>Enter Your Nickname</Text>
        <TextInput
          placeholder="Enter nickname"
          value={nickname}
          onChange={(e) => setNickname(e.currentTarget.value)}
          required
        />
        <Button color="blue" onClick={handleNicknameSubmit}>Start Game</Button>
      </Flex>
    </Card>
  );
}

NicknameCard.propTypes = {
  nickname: PropTypes.string.isRequired,
  setNickname: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default NicknameCard;