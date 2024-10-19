import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import SideBar from "@/components/sidebar";
import UserInput from "@/components/userinput";
import TypewriterText from "@/components/typewriter";
import Spline from "@splinetool/react-spline";
import axios from "axios";

export default function Home() {
  // State to control the visibility of the TypewriterText
  const [showMessages, setShowMessages] = useState(false);
  const [apiResponse, setApiResponse] = useState(null); // State to store the response from the API

  // Handle the click event on the Spline
  const handleSplineClick = async () => {
    setShowMessages(prev => !prev); // Toggle the visibility of the messages

    try {
      // send API request when Spline clicked
      const response = await axios.get('http://127.0.0.1:8000/items/1?q=spline-click');
      setApiResponse(response.data); // Store the API response
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  return (
    <Flex minHeight="100vh" width="100%">
      <Box
        width="25%"
        bg="gray.100"
        p="4"
        boxShadow="md"
        position="fixed"
        height="100vh"
        left={0}
        top={0}
      >
        <SideBar />
      </Box>

      <Box
        flex="1"
        ml="25%" // Ensures main content doesn't overlap with the sidebar
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh" // Ensures vertical centering in full viewport height
        position="relative" // Needed for positioning child elements
      >
        {/* Spline component that listens for clicks */}
        <Spline
          scene="https://prod.spline.design/nnYEfMcRPECoorRV/scene.splinecode"
          onClick={handleSplineClick}
        />

        {/* Conditionally render the TypewriterText in the center when Spline is clicked */}
        {showMessages && (
          <Box
            position="absolute" // To overlay this on top of the Spline
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)" // Center it vertically and horizontally
            zIndex="10" // Make sure it's on top
          >
            <TypewriterText />
          </Box>
        )}

        {}
        {apiResponse && (
          <Box
            position="absolute"
            bottom="10%" // Place it near the bottom
            left="50%"
            transform="translateX(-50%)"
            zIndex="10"
            p="4"
            bg="white"
            boxShadow="md"
          >
            <p>API Response: {JSON.stringify(apiResponse)}</p>
          </Box>
        )}

        <UserInput /> {/* Centered UserInput component */}
      </Box>
    </Flex>
  );
}
