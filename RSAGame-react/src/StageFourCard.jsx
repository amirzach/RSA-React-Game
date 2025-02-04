import PropTypes from "prop-types";
import { Card, Flex, Text, Button, Blockquote, TextInput, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBulb, IconHelp } from '@tabler/icons-react';
import { modExp } from "./helper";

function StageFourCard(props) {

  const {
    setIsInputDCorrect,
    setInputD,
    setDecryptedMessage,
    stageFour,
    nValue,
    phiValue,
    eValue,
    dValue,
    inputD,
    isInputDCorrect,
    encryptedMessage,
    decryptedMessage,
    onComplete 
  } = props;

  const [opened, { open, close}] = useDisclosure(false);

  // Function to check if the entered d value is correct
  function checkDValue(value) {
    
    if (parseInt(value) === dValue) {
      setIsInputDCorrect(true);
    } else {
      alert("Incorrect private key (d) value. Please try again.");
    }
  }

  // Function to decrypt message
  function decryptMessage(encryptedMessage) {
    
    let decryptedMessage = "";
    
    // Decrypt each character in the message
    decryptedMessage = encryptedMessage.map((char) => {
      return String.fromCharCode(modExp(char, dValue, nValue));
    });

    setDecryptedMessage(decryptedMessage.join(""));
  }

  // Function to finish the game
  function finishGame() {
    // Call onComplete to trigger leaderboard display
    onComplete();
  }
    
  return (
    <>
      {stageFour && (
        <Card shadow="md" radius="lg" withBorder>
          <Flex direction="column" gap="md" align="center">
            <Text size="xl" fw={700}>Stage 4</Text>
            <Text size="md" fw={700}>Decryption</Text>
            <Blockquote color="yellow" icon={<IconBulb/>} mb="sm" ta="justify">
              To decrypt the message, you need the private key (d) and n. Use the formula: (encrypted value<sup>d</sup> mod n) to retrieve the original message.
              <Text fw={700} mt="sm">Current values for RSA:</Text>
              <Flex direction="row" gap="xl">
                <Text>n = {nValue}</Text>
                <Text>φ(n) = {phiValue}</Text>
                <Text>e = {eValue}</Text>
                <Text>d = <Button size="compact-xs" bg="orange" leftSection={<IconHelp size={16}/>} onClick={open}>Hint</Button></Text>
              </Flex>
            </Blockquote>
            <Text size="sm">Encrypted message: {encryptedMessage.join(" | ")}</Text>
            <Flex direction="row" gap="sm" align="end">
              <TextInput
                label="Enter private key(d):"
                placeholder="Enter number"
                type="number"
                value={inputD}
                onChange={(event) => setInputD(event.currentTarget.value)}
              />
              <Button color="green" radius="md" size="sm" onClick={() => checkDValue(inputD)}>Submit</Button>
            </Flex>
            {isInputDCorrect && (
              <Text c="green" size="sm">Correct!</Text>
            )}
            {isInputDCorrect && (
              <Flex direction="row" gap="sm" align="end">
                <TextInput
                  placeholder="Display decrypted message"
                  value={decryptedMessage}
                  readOnly
                />
                <Button color="green" radius="md" size="sm" onClick={() => decryptMessage(encryptedMessage)}>Decrypt</Button>
              </Flex>
            )}
            {decryptedMessage && (
              <Button color="indigo" radius="md" size="md" onClick={finishGame}>Finish Game</Button>
            )}
          </Flex>
        </Card>
      )}

      {/* Modal for hint */}
      <Modal opened={opened} onClose={close} withCloseButton={false} centered>
        <Text size="md" ta="justify">How to find private key(d)?</Text>
        <Text size="sm" ta="justify" pt={10}>The private key (d) is the modular multiplicative inverse of e modulo φ(n). In other words, it satisfies the equation:</Text>
        <Text size="sm" ta="center" pt={5} fw={700}>(e * d) mod φ(n) = 1</Text>
      </Modal>
    </>
  );
}

// Define PropTypes
StageFourCard.propTypes = {
  setIsInputDCorrect: PropTypes.func.isRequired,
  setInputD: PropTypes.func.isRequired,
  setDecryptedMessage: PropTypes.func.isRequired,
  stageFour: PropTypes.bool.isRequired,
  nValue: PropTypes.number.isRequired,
  phiValue: PropTypes.number.isRequired,
  eValue: PropTypes.number.isRequired,
  dValue: PropTypes.number.isRequired,
  inputD: PropTypes.string.isRequired,
  isInputDCorrect: PropTypes.bool.isRequired,
  encryptedMessage: PropTypes.arrayOf(PropTypes.number).isRequired,
  decryptedMessage: PropTypes.string.isRequired,
  onComplete: PropTypes.func.isRequired, 
}    

export default StageFourCard