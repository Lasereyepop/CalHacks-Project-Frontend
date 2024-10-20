import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import SideBar from "@/components/sidebar";
import UserInput from "@/components/userinput";
import TypewriterText from "@/components/typewriter";
import Spline from "@splinetool/react-spline";

export default function Home() {
  const [showMessages, setShowMessages] = useState(false);
  const [apiResponse, setApiResponse] = useState(null); // State to store API responses

  // Handle the click event on the Spline to show/hide messages only
  const handleSplineClick = () => {
    setShowMessages(prev => !prev); // Toggle visibility of the messages
  };

  // This function is passed to UserInput to handle the API response
  const handleUserInputResponse = (responseData) => {
    setApiResponse(responseData);  // Update the state when UserInput sends a response
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
        ml="25%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        position="relative"
      >
        <Spline
          scene="https://prod.spline.design/nnYEfMcRPECoorRV/scene.splinecode"
          onClick={handleSplineClick}  // Now just toggling the message visibility
        />

        {showMessages && (
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            zIndex="10"
          >
            <TypewriterText />
          </Box>
        )}

        {apiResponse && (
          <Box
            position="absolute"
            bottom="10%"
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

        {/* Pass the function to handle API response to UserInput */}
        <UserInput onApiResponse={handleUserInputResponse} />
      </Box>
    </Flex>
  );
}
