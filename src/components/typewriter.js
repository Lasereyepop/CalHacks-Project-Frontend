import { useEffect, useState } from 'react';
import { Text, VStack, Center, Box } from '@chakra-ui/react';

const TypewriterText = () => {
  const messages = [
    "Welcome to Montgomery!",
    "Ask us any math question to start :)",
  ];

  const [displayedMessages, setDisplayedMessages] = useState(['', '', '']);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const typingSpeed = 50; // Speed of typing
  const pauseTime = 50; // Time to pause after each message

  useEffect(() => {
    if (currentIndex >= messages.length) return;

    const timer = setTimeout(() => {
      if (charIndex < messages[currentIndex].length) {
        setDisplayedMessages(prev => {
          const newMessages = [...prev];
          newMessages[currentIndex] = messages[currentIndex].substring(0, charIndex + 1);
          return newMessages;
        });
        setCharIndex(charIndex + 1);
      } else {
        setTimeout(() => {
          setCurrentIndex(currentIndex + 1);
          setCharIndex(0);
        }, pauseTime);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentIndex, charIndex]);

  return (
    <Center h="200px"> {/* Adjust height as needed */}
      <VStack spacing={2} align="center">
        {messages.map((_, idx) => (
          <Box key={idx} h="40px" display="flex" alignItems="center" justifyContent="center">
            <Text fontSize="xx-large" fontWeight="semibold" textAlign="center">
              {displayedMessages[idx]}
            </Text>
          </Box>
        ))}
      </VStack>
    </Center>
  );
};

export default TypewriterText;