import PropTypes from "prop-types";
import { Card, Flex, Text, Button, Blockquote } from "@mantine/core";
import { IconBulb } from '@tabler/icons-react';
import { isPrime, generatePandQValues, generateKeyPair } from "./helper";

function StageOneCard(props) {

  const {
    setDifficultySelected, 
    setStageTwo, 
    setButtonPValueStatus, 
    setButtonsPValueDisabled, 
    setSelectedPrimeP, 
    setSelectedNotPrimeP, 
    setPossiblePValues, 
    setButtonQValueStatus, 
    setButtonsQValueDisabled, 
    setSelectedPrimeQ, 
    setSelectedNotPrimeQ, 
    setPossibleQValues, 
    setIsBothPrimeSelected, 
    setNValue, 
    setPhiValue, 
    setValidEs, 
    setKeyMap,
    difficultySelected,
    possiblePValues,
    selectedPrimeP,
    selectedNotPrimeP,
    possibleQValues,
    selectedPrimeQ,
    selectedNotPrimeQ,
    isBothPrimeSelected,
    buttonPValueStatus,
    buttonsPValueDisabled,
    buttonQValueStatus,
    buttonsQValueDisabled
  } = props;

  // Handle onClick for p value buttons
  function handleButtonPValueClick(value) {

    if (isPrime(value)) {

      setButtonPValueStatus({[value]: "green"});
      setButtonsPValueDisabled(true);
      setSelectedPrimeP(value);
      setSelectedNotPrimeP(false);
      checkBothPrimeSelected(value, selectedPrimeQ);
    } else {

      setSelectedNotPrimeP(true);
      regeneratePValues();
    }
  }

  // Handle onClick for q value buttons
  function handleButtonQValueClick(value) {

    if (isPrime(value)) {

      setButtonQValueStatus({[value]: "green"});
      setButtonsQValueDisabled(true);
      setSelectedPrimeQ(value);
      setSelectedNotPrimeQ(false);
      checkBothPrimeSelected(selectedPrimeP, value);
    } else {

      setSelectedNotPrimeQ(true);
      regenerateQValues();
    }
  }

  // Check if both p and q are prime numbers
  function checkBothPrimeSelected(p, q) {

    if (p && q) {
      setIsBothPrimeSelected(true);
    }
  }

  // Regenerate p values
  function regeneratePValues() {

    let lowerBound = possiblePValues[0] >= 1000 ? 1000 : possiblePValues[0] >= 100 ? 100 : 1;
    let upperBound = lowerBound === 1 ? 100 : lowerBound * 10;
    const { generatedPValues } = generatePandQValues(lowerBound, upperBound);
    setPossiblePValues(generatedPValues);
    setButtonPValueStatus({});
    setButtonsPValueDisabled(false);
  }

  // Regenerate q values
  function regenerateQValues() {

    let lowerBound = possibleQValues[0] >= 1000 ? 1000 : possibleQValues[0] >= 100 ? 100 : 1;
    let upperBound = lowerBound === 1 ? 100 : lowerBound * 10;
    const { generatedQValues } = generatePandQValues(lowerBound, upperBound);
    setPossibleQValues(generatedQValues);
    setButtonQValueStatus({});
    setButtonsQValueDisabled(false);
  }

    // Function to load Stage 2
  function proceedStageTwo() {

    const {
      n, phi, validEs, keyMap
    } = generateKeyPair(selectedPrimeP, selectedPrimeQ);
    setDifficultySelected(false);
    setStageTwo(true);
    setNValue(n);
    setPhiValue(phi);
    setValidEs(validEs.map((e) => e.toString()));
    setKeyMap(keyMap);
  }
    
  return (
    <>
      {difficultySelected && (
        <Card shadow="md" radius="lg" withBorder>
          <Flex direction="column" gap="md" align="center">
            <Text size="xl" fw={700}>Stage 1</Text>
            <Text size="md" fw={700}>Prime Number Selection</Text>
            <Blockquote color="yellow" icon={<IconBulb/>} mb="sm" ta="justify">In RSA, we start with two prime numbers, p and q. They should be large enough to make the encryption secure.</Blockquote>
            <Flex direction="row" gap="sm" align="center">
              <Text size="sm">Select p value:</Text>
              {/* Map over possiblePValues to create buttons */}
              {possiblePValues.map((value, index) => (
                <Button 
                  key={index} 
                  variant="filled" 
                  color={buttonPValueStatus[value] || "gray"}
                  disabled={buttonPValueStatus[value] ? false : buttonsPValueDisabled}
                  w={75} 
                  onClick={() => handleButtonPValueClick(value)}
                >
                  {value}
                </Button>
              ))}
            </Flex>
            <Flex direction="row" gap="sm" align="center">
              <Text size="sm">Select q value:</Text>
              {/* Map over possibleQValues to create buttons */}
              {possibleQValues.map((value, index) => (
                <Button 
                  key={index} 
                  variant="filled" 
                  color={buttonQValueStatus[value] || "gray"} 
                  disabled={buttonQValueStatus[value] ? false :buttonsQValueDisabled}
                  w={75} 
                  onClick={() => handleButtonQValueClick(value)}
                >
                  {value}
                </Button>
              ))}
            </Flex>
            {selectedNotPrimeP && (
              <Text c="red">Selected p value is not a prime number.</Text>
            )}
            {selectedNotPrimeQ && (
              <Text c="red">Selected q value is not a prime number.</Text>
            )}
            {isBothPrimeSelected && (
              <Button color="indigo" radius="md" size="md" onClick={() => proceedStageTwo()}>Next Stage </Button>
            )}
          </Flex>
        </Card>
      )}
    </>
  );
}

// Define PropTypes
StageOneCard.propTypes = {
  setDifficultySelected: PropTypes.func.isRequired,
  setStageTwo: PropTypes.func.isRequired,
  setButtonPValueStatus: PropTypes.func.isRequired,
  setButtonsPValueDisabled: PropTypes.func.isRequired,
  setSelectedPrimeP: PropTypes.func.isRequired,
  setSelectedNotPrimeP: PropTypes.func.isRequired, 
  setPossiblePValues: PropTypes.func.isRequired, 
  setButtonQValueStatus: PropTypes.func.isRequired, 
  setButtonsQValueDisabled: PropTypes.func.isRequired, 
  setSelectedPrimeQ: PropTypes.func.isRequired, 
  setSelectedNotPrimeQ: PropTypes.func.isRequired, 
  setPossibleQValues: PropTypes.func.isRequired, 
  setIsBothPrimeSelected: PropTypes.func.isRequired, 
  setNValue: PropTypes.func.isRequired, 
  setPhiValue: PropTypes.func.isRequired, 
  setValidEs: PropTypes.func.isRequired, 
  setKeyMap: PropTypes.func.isRequired,
  difficultySelected: PropTypes.bool.isRequired,
  possiblePValues: PropTypes.array.isRequired,
  selectedPrimeP: PropTypes.number,
  selectedNotPrimeP: PropTypes.bool.isRequired,
  possibleQValues: PropTypes.array.isRequired,
  selectedPrimeQ: PropTypes.number,
  selectedNotPrimeQ: PropTypes.bool.isRequired,
  isBothPrimeSelected: PropTypes.bool.isRequired,
  buttonPValueStatus: PropTypes.object.isRequired,
  buttonsPValueDisabled: PropTypes.bool.isRequired,
  buttonQValueStatus: PropTypes.object.isRequired,
  buttonsQValueDisabled: PropTypes.bool.isRequired,
}    

export default StageOneCard