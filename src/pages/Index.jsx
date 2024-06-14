import { Box, Container, Heading, VStack, Text, HStack, Spacer, Button } from "@chakra-ui/react";

const Header = () => (
  <Box as="header" bg="blue.500" color="white" py={4} px={8} width="100%">
    <HStack>
      <Heading size="lg">Events Management</Heading>
      <Spacer />
      <Button colorScheme="teal" variant="outline">Login</Button>
    </HStack>
  </Box>
);

const EventItem = ({ title, date, description }) => (
  <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} mb={4} width="100%">
    <Heading size="md">{title}</Heading>
    <Text fontSize="sm" color="gray.500">{date}</Text>
    <Text mt={2}>{description}</Text>
  </Box>
);

const EventList = () => {
  const events = [
    { title: "Event 1", date: "2023-10-01", description: "Description for event 1" },
    { title: "Event 2", date: "2023-10-05", description: "Description for event 2" },
    { title: "Event 3", date: "2023-10-10", description: "Description for event 3" },
  ];

  return (
    <VStack spacing={4} align="stretch" width="100%">
      {events.map((event, index) => (
        <EventItem key={index} {...event} />
      ))}
    </VStack>
  );
};

const Footer = () => (
  <Box as="footer" bg="blue.500" color="white" py={4} px={8} width="100%" mt="auto">
    <Text textAlign="center">© 2023 Events Management. All rights reserved.</Text>
  </Box>
);

const Index = () => {
  return (
    <Container maxW="container.md" display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Box flex="1" py={8}>
        <Heading as="h2" size="xl" mb={6}>Upcoming Events</Heading>
        <EventList />
      </Box>
      <Footer />
    </Container>
  );
};

export default Index;