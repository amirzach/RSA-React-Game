import PropTypes from "prop-types";
import { Card, Flex, Text, Button, Blockquote } from "@mantine/core";
import { IconBulb } from '@tabler/icons-react';
import { isPrime, generatePandQValues, generateKeyPair } from "./helper";

function StageOneCard(props) {
  const {
    difficultySelected,
    possiblePValues,
    possibleQValues,
    selectedPrimeP,
    selectedNotPrimeP,
    selectedPrimeQ,
    selectedNotPrimeQ,
    isBothPrimeSelected,
    buttonPValueStatus,
    buttonsPValueDisabled,
    buttonQValueStatus,
    buttonsQValueDisabled,
    setGameState,
    setPrimeState,
    setCalculatedValues,
  } = props;

  // Handle onClick for p value buttons
  function handleButtonPValueClick(value) {
    if (isPrime(value)) {
      // Update primeState: mark the clicked p value as "green", disable further clicks, and store the selection
      setPrimeState((prev) => ({
        ...prev,
        buttonPValueStatus: { [value]: "green" },
        buttonsPValueDisabled: true,
        selectedPrimeP: value,
        selectedNotPrimeP: false,
      }));
      checkBothPrimeSelected(value, selectedPrimeQ);
    } else {
      // Flag the error and regenerate p values if the selection is not prime
      setPrimeState((prev) => ({
        ...prev,
        selectedNotPrimeP: true,
      }));
      regeneratePValues();
    }
  }

  // Handle onClick for q value buttons
  function handleButtonQValueClick(value) {
    if (isPrime(value)) {
      // Update primeState: mark the clicked q value as "green", disable further clicks, and store the selection
      setPrimeState((prev) => ({
        ...prev,
        buttonQValueStatus: { [value]: "green" },
        buttonsQValueDisabled: true,
        selectedPrimeQ: value,
        selectedNotPrimeQ: false,
      }));
      checkBothPrimeSelected(selectedPrimeP, value);
    } else {
      // Flag the error and regenerate q values if the selection is not prime
      setPrimeState((prev) => ({
        ...prev,
        selectedNotPrimeQ: true,
      }));
      regenerateQValues();
    }
  }

  // Check if both p and q are prime numbers
  function checkBothPrimeSelected(p, q) {
    if (p && q) {
      setPrimeState((prev) => ({
        ...prev,
        isBothPrimeSelected: true,
      }));
    }
  }

  // Regenerate possible p values based on the current bounds
  function regeneratePValues() {

    let lowerBound = possiblePValues[0] >= 1000 ? 1000 : possiblePValues[0] >= 100 ? 100 : 1;
    let upperBound = lowerBound === 1 ? 100 : lowerBound * 10;
    const { generatedPValues } = generatePandQValues(lowerBound, upperBound);
    setPrimeState((prev) => ({
      ...prev,
      possiblePValues: generatedPValues,
      buttonPValueStatus: {},
      buttonsPValueDisabled: false,
    }));
  }

  // Regenerate possible q values based on the current bounds
  function regenerateQValues() {

    let lowerBound = possibleQValues[0] >= 1000 ? 1000 : possibleQValues[0] >= 100 ? 100 : 1;
    let upperBound = lowerBound === 1 ? 100 : lowerBound * 10;
    const { generatedQValues } = generatePandQValues(lowerBound, upperBound);
    setPrimeState((prev) => ({
      ...prev,
      possibleQValues: generatedQValues,
      buttonQValueStatus: {},
      buttonsQValueDisabled: false,
    }));
  }

    // Function to load Stage 2
  function proceedStageTwo() {
    const {
      n, phi, validEs, keyMap
    } = generateKeyPair(selectedPrimeP, selectedPrimeQ);

    // Update the gameState: disable difficulty selection and move to Stage Two.
    setGameState((prev) => ({
      ...prev,
      difficultySelected: false,
      stageTwo: true,
    }));
    
    // Update calculatedValues with RSA parameters.
    setCalculatedValues((prev) => ({
      ...prev,
      nValue: n,
      phiValue: phi,
      validEs: validEs.map((e) => e.toString()),
      keyMap: keyMap,
    }));
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
  difficultySelected: PropTypes.bool.isRequired,
  possiblePValues: PropTypes.arrayOf(PropTypes.number).isRequired,
  possibleQValues: PropTypes.arrayOf(PropTypes.number).isRequired,
  selectedPrimeP: PropTypes.number,
  selectedNotPrimeP: PropTypes.bool.isRequired,
  selectedPrimeQ: PropTypes.number,
  selectedNotPrimeQ: PropTypes.bool.isRequired,
  isBothPrimeSelected: PropTypes.bool.isRequired,
  buttonPValueStatus: PropTypes.object.isRequired,
  buttonsPValueDisabled: PropTypes.bool.isRequired,
  buttonQValueStatus: PropTypes.object.isRequired,
  buttonsQValueDisabled: PropTypes.bool.isRequired,
  setGameState: PropTypes.func.isRequired,
  setPrimeState: PropTypes.func.isRequired,
  setCalculatedValues: PropTypes.func.isRequired,
}    

export default StageOneCard