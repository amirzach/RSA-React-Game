import PropTypes from "prop-types";
import { Card, Flex, Text, Button, Blockquote, Select } from "@mantine/core";
import { IconBulb } from '@tabler/icons-react';

function StageTwoCard(props) {
  const { 
    stageTwo,
    nValue, 
    phiValue, 
    eValue, 
    dValue, 
    validEs, 
    keyMap,
    setGameState, 
    setCalculatedValues 
  } = props;

  // Get public and private keys from selected e value
  function populateKeys(value) {
    const e = parseInt(value)
    const d = keyMap.get(e);
    setCalculatedValues(prev => ({
      ...prev,
      eValue: e,
      dValue: d,
    }));
    console.log(`Public key (e): ${e}, Private key (d): ${d}`);
  }

  // Function to load Stage 3
  function proceedStageThree() {
    setGameState(prev => ({
      ...prev,
      stageTwo: false,
      stageThree: true,
    }));
  }
    
  return (
    <>
      {stageTwo && (
        <Card shadow="md" radius="lg" withBorder>
          <Flex direction="column" gap="md" align="center">
            <Text size="xl" fw={700}>Stage 2</Text>
            <Text size="md" fw={700}>Key Number Generation</Text>
            <Blockquote color="yellow" icon={<IconBulb/>} mb="sm" ta="justify" >
              The product of p and q is called n, and φ(n) is the number of integers coprime to n. Choose a public key (e) that has no common factors with φ(n), except 1.
              <Text fw={700} mt="sm">Current values for RSA:</Text>
              <Flex direction="row" gap="xl">
                <Text>n = {nValue}</Text>
                <Text>φ(n) = {phiValue}</Text>
              </Flex>
            </Blockquote>
            <Flex direction="row" gap="sm">
              <Select
                type="number"
                label="Select Public key (e):"
                placeholder="Select a number"
                limit={10}
                data={validEs}
                searchable
                onChange={(value) => populateKeys(value)}
              />
            </Flex>
            {eValue !== 0 && dValue !== 0 && (
              <Button color="indigo" radius="md" size="md" onClick={() => proceedStageThree()}>Next Stage </Button>
            )}
          </Flex>
        </Card>
      )}
    </>
  );
}

// Define PropTypes
StageTwoCard.propTypes = {
  stageTwo: PropTypes.bool.isRequired,
  nValue: PropTypes.number.isRequired,
  phiValue: PropTypes.number.isRequired,
  eValue: PropTypes.number.isRequired,
  dValue: PropTypes.number.isRequired,
  validEs: PropTypes.arrayOf(PropTypes.string).isRequired,
  keyMap: PropTypes.instanceOf(Map).isRequired,
  setGameState: PropTypes.func.isRequired,
  setCalculatedValues: PropTypes.func.isRequired,
}    

export default StageTwoCard