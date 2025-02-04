import PropTypes from "prop-types";
import { Card, Flex, Text, Button, Blockquote } from "@mantine/core";
import { IconInfoCircle } from '@tabler/icons-react';
import { generatePandQValues } from "./helper";

function SelectDifficultyCard(props) {

  const {
    setDifficultySelected, 
    setPossiblePValues, 
    setPossibleQValues, 
    difficultySelected, 
    stageTwo, 
    stageThree, 
    stageFour,
    onDifficultySelect
  } = props;
  // Function to handle selection of difficulty level
  function handleDifficulty(difficulty) {
    
    let lowerBound, upperBound;

    switch (difficulty) {
      case "easy":
        lowerBound = 1;
        upperBound = 100;
        break;
      case "medium":
        lowerBound = 100;
        upperBound = 1000;
        break;
      case "hard":
        lowerBound = 1000;
        upperBound = 10000;
        break;
    }
  
    const {
      generatedPValues,
      generatedQValues,
    } = generatePandQValues(lowerBound, upperBound);

    // Update state variables
    setPossiblePValues(generatedPValues);
    setPossibleQValues(generatedQValues);
    setDifficultySelected(true);
    onDifficultySelect(difficulty);
  }
    
  return (
    <>
      {!difficultySelected && !stageTwo && !stageThree && !stageFour && (
          <Card shadow="md" radius="lg" withBorder>
            <Flex direction="column" gap="md">
              <Text size="xl" fw={700}>RSA Encryption Game</Text>
              <Text size="md" fw={700}>Welcome to the RSA Game!</Text>
              <Blockquote color="blue" icon={<IconInfoCircle/>} mb="sm">Select a difficulty level to start the game.</Blockquote>
            </Flex>
            <Flex direction="column" gap="xs" pt="5">
              <Button color="green" variant="outline" onClick={() => handleDifficulty("easy")}>Easy</Button>
              <Button color="yellow" variant="outline" onClick={() => handleDifficulty("medium")}>Medium</Button>
              <Button color="red" variant="outline" onClick={() => handleDifficulty("hard")}>Hard</Button>
            </Flex>
          </Card>
        )}
    </>
  );
}

// Define PropTypes
SelectDifficultyCard.propTypes = {
  setDifficultySelected: PropTypes.func.isRequired,
  setPossiblePValues: PropTypes.func.isRequired,
  setPossibleQValues: PropTypes.func.isRequired,
  difficultySelected: PropTypes.bool.isRequired,
  stageTwo: PropTypes.bool.isRequired,
  stageThree: PropTypes.bool.isRequired,
  stageFour: PropTypes.bool.isRequired,
  onDifficultySelect: PropTypes.func.isRequired,
}

export default SelectDifficultyCard