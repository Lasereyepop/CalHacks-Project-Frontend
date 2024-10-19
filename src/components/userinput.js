import React, { useState } from 'react';
import { Box, Input, Button, Stack, Flex } from '@chakra-ui/react';

export default function UserInput() {
  const [inputValue, setInputValue] = useState(''); // Initialize state

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update input value
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      alert(`User input: ${inputValue}`); // Alert input value on Enter key press
    }
  };

  const handleButtonClick = () => {
    alert(`User input: ${inputValue}`); // Alert input value on button click
  };

  return (
    <Box
      position="fixed"
      bottom="0"
      right="0"
      width="75%" // Adjusts the width to 75% of the viewport
      height="10vh" // Adjusts the height to a smaller portion (10vh for the input area)
      bg="white" // Background color for visibility
      py={4}
      px={6}
      boxShadow="md" // Adds a shadow for better visibility
    >
      <Flex width="100%" alignItems="center">
        <Box width="100%" position="relative">
          <Input
            placeholder="Make your move!"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown} // Trigger on Enter key press
            size="lg"
            pr="50px" // Add padding to the right to make space for the button
          />
          <Button
            color="white" // Black 
            background="black"
            onClick={handleButtonClick}
            position="absolute"
            right="0px" // Positions the button inside the input
            top="50%" // Center vertically
            transform="translateY(-50%)" // Adjust for perfect centering
            size="lg" // Match the size with the input
          >
            Submit
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
