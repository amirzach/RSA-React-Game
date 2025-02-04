import PropTypes from "prop-types";
import { Card, Flex, Text, Button, Blockquote, TextInput } from "@mantine/core";
import { IconBulb } from '@tabler/icons-react';
import { modExp } from "./helper";

function StageThreeCard(props) {

  const {
    setStageThree,
    setStageFour,
    setMessage,
    setEncryptedMessage,
    stageThree,
    nValue,
    phiValue,
    eValue,
    message,
    encryptedMessage
  } = props;

  // Function to encrypt message
  function encryptMessage(input) {

    let encryptedMessage = [];
    
    // Encrypt each character in the message
    encryptedMessage = input.split("").map((char) => {
      const charCode = char.charCodeAt(0);
      return modExp(charCode, eValue, nValue);
    });
    
    setEncryptedMessage(encryptedMessage);
  }

  // Function to load Stage 4
  function proceedStageFour() {

    setStageThree(false);
    setStageFour(true);
  }
    
  return (
    <>
      {stageThree && (
        <Card shadow="md" radius="lg" withBorder>
          <Flex direction="column" gap="md" align="center">
            <Text size="xl" fw={700}>Stage 3</Text>
            <Text size="md" fw={700}>Encryption</Text>
            <Blockquote color="yellow" icon={<IconBulb/>} mb="sm" ta="justify">
              To encrypt a message, convert each character to its ASCII value and calculate (value<sup>e</sup> mod n) for each character.
              <Text fw={700} mt="sm">Current values for RSA:</Text>
              <Flex direction="row" gap="xl">
                <Text>n = {nValue}</Text>
                <Text>φ(n) = {phiValue}</Text>
                <Text>e = {eValue}</Text>
              </Flex>
            </Blockquote>
            <Flex direction="row" gap="sm" align="end">
              <TextInput
                label="Enter message to encrypt:"
                placeholder="Enter a message"
                value={message}
                onChange={(event) => setMessage(event.currentTarget.value)}
              />
              <Button color="green" radius="md" size="sm" onClick={() => encryptMessage(message)}>Encrypt</Button>
            </Flex>
            {encryptedMessage.length > 0 && (
              <Text size="sm" fw={700} c="gray">Encrypted message: {encryptedMessage.join(" | ")}</Text>
            )}
            {encryptedMessage.length > 0 && (
              <Button color="indigo" radius="md" size="md" onClick={() => proceedStageFour()}>Next Stage </Button>
            )}
          </Flex>
        </Card>
      )}
    </>
  );
}

// Define PropTypes
StageThreeCard.propTypes = {
  setStageThree: PropTypes.func.isRequired,
  setStageFour: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setEncryptedMessage: PropTypes.func.isRequired,
  stageThree: PropTypes.bool.isRequired,
  nValue: PropTypes.number.isRequired,
  phiValue: PropTypes.number.isRequired,
  eValue: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  encryptedMessage: PropTypes.arrayOf(PropTypes.number).isRequired,
}    

export default StageThreeCard