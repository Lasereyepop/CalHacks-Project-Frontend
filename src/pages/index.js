import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import SideBar from "@/components/sidebar";
import UserInput from "@/components/userinput";
import Spline from "@splinetool/react-spline";
import TypewriterText from "@/components/typewriter";

export default function Home() {
  const [videoUrl, setVideoUrl] = useState(null);  // State to store the video URL

  // Function passed to UserInput to handle the API response
  const handleUserInputResponse = (url) => {
    setVideoUrl(url);  // Update the state with the video URL
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
        {!videoUrl ? (
          <>
            <Spline scene="https://prod.spline.design/nnYEfMcRPECoorRV/scene.splinecode" />
            <TypewriterText />
          </>
        ) : (
          <Box position="relative" zIndex="10" width="100%" height="auto">
            <video width="100%" height="auto" controls>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
        )}

        <UserInput onApiResponse={handleUserInputResponse} />
      </Box>
    </Flex>
  );
}
