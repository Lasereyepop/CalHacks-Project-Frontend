import { useState } from "react";
import {
  Box,
  Button, Text,
  Flex,
  Collapse,
  Fade,
  useDisclosure
} from "@chakra-ui/react";
import SideBar from "@/components/sidebar";
import UserInput from "@/components/userinput";
import TypewriterText from "@/components/typewriter";


export default function Home() {
  return(
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
      >
        <TypewriterText />
        <UserInput /> {/* Centered UserInput component */}
      </Box>
    </Flex>
  
  );
}
