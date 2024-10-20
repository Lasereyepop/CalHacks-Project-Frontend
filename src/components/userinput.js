import React, { useState } from 'react';
import { Box, Input, Button, Flex } from '@chakra-ui/react';
import axios from 'axios';

export default function UserInput({ onApiResponse }) {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = async () => {
    const trimmedInput = inputValue.trim(); 
    if (!trimmedInput) {
      alert('Please enter some text.');
      return;
    }

    setIsLoading(true); // Set loading state to true
    const url = 'http://localhost:8000/submit';

    try {
      console.log("Sending POST request to:", url);
      const response = await axios.post(url, {
        user_input: trimmedInput, // Send the trimmed input
      });

      onApiResponse(response.data.message); // Handle the successful response
      setInputValue(''); // Clear the input field after successful submission
    } catch (error) {
      console.error('Error submitting input:', error);

      // More informative error handling:
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        alert(`Error: ${error.response.status} - ${error.response.data.detail || 'Server error'}`);  // Display specific server error if available.
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in Node.js
        alert('Error: No response from server.');
      } else {
        // Something happened in setting up the request that triggered an Error
        alert('Error: ' + error.message);
      }



    } finally {
      setIsLoading(false); // Set loading state back to false regardless of success or failure
    }
  };

  return (
    <Box
      position="fixed"
      bottom="0"
      right="0"
      width="75%"
      height="10vh"
      bg="white"
      py={4}
      px={6}
      boxShadow="md"
    >
      <Flex width="100%" alignItems="center">
        <Box width="100%" position="relative">
          <Input
            placeholder="Enter your input"
            value={inputValue}
            onChange={handleInputChange}
            size="lg"
            pr="50px"
          />
          <Button
            color="white"
            background="black"
            onClick={handleButtonClick}
            position="absolute"
            right="0px"
            top="50%"
            transform="translateY(-50%)"
            size="lg"
            // ...
            isLoading={isLoading} // Disable button while loading
            loadingText="Submitting"
            // ...
          >
            Submit
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
