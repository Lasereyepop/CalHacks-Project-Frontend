import React, { useState } from 'react';
import { Box, Input, Button, Flex } from '@chakra-ui/react';
import axios from 'axios';

export default function UserInput() {
  const [inputValue, setInputValue] = useState(''); // Initialize state
  const [videoUrl, setVideoUrl] = useState(null); // State to store video URL or response

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update input value
  };

  const handleButtonClick = async () => {
    if (!inputValue.trim()) {
      alert('Please enter some text.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/submit', {
        user_input: inputValue,
      }, {
        responseType: 'blob' // Set responseType to blob for video
      });

      // Create a URL for the video blob
      const videoBlob = new Blob([response.data], { type: 'video/mp4' });
      const videoUrl = URL.createObjectURL(videoBlob);
      setVideoUrl(videoUrl);
    } catch (error) {
      console.error('Error submitting input:', error);
      alert('Error submitting input');
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
            placeholder="Make your move!"
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
          >
            Submit
          </Button>
        </Box>
      </Flex>

      {/* Display the video if the URL is available */}
      {videoUrl && (
        <Box mt={4}>
          <video width="100%" height="auto" controls>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
      )}
    </Box>
  );
}
