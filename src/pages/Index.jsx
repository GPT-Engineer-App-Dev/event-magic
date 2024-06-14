import { Box, Container, Heading, VStack, Text, HStack, Spacer, Button, FormControl, FormLabel, Input, Textarea, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Header = ({ onOpen }) => (
  <Box as="header" bg="blue.500" color="white" py={4} px={8} width="100%">
    <HStack>
      <Heading size="lg">Events Management</Heading>
      <Spacer />
      <Button colorScheme="teal" variant="outline" onClick={onOpen}>Create Event</Button>
    </HStack>
  </Box>
);

const EventItem = ({ title, date, description, onEdit, onDelete, onView }) => (
  <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} mb={4} width="100%">
    <Heading size="md">{title}</Heading>
    <Text fontSize="sm" color="gray.500">{date}</Text>
    <Text mt={2}>{description}</Text>
    <HStack mt={4}>
      <Button colorScheme="teal" size="sm" onClick={onEdit}>Edit</Button>
      <Button colorScheme="red" size="sm" onClick={onDelete}>Delete</Button>
      <Button colorScheme="blue" size="sm" onClick={onView}>View</Button>
    </HStack>
  </Box>
);

const EventList = ({ events, onEdit, onDelete, onView }) => (
  <VStack spacing={4} align="stretch" width="100%">
    {events.map((event, index) => (
      <EventItem
        key={index}
        {...event}
        onEdit={() => onEdit(index)}
        onDelete={() => onDelete(index)}
        onView={() => onView(index)}
      />
    ))}
  </VStack>
);

const EventForm = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [date, setDate] = useState(initialData?.date || "");
  const [description, setDescription] = useState(initialData?.description || "");

  const handleSubmit = () => {
    onSubmit({ title, date, description });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{initialData ? "Edit Event" : "Create Event"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="title" mb={4}>
            <FormLabel>Title</FormLabel>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormControl>
          <FormControl id="date" mb={4}>
            <FormLabel>Date</FormLabel>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </FormControl>
          <FormControl id="description" mb={4}>
            <FormLabel>Description</FormLabel>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const Footer = () => (
  <Box as="footer" bg="blue.500" color="white" py={4} px={8} width="100%" mt="auto">
    <Text textAlign="center">© 2023 Events Management. All rights reserved.</Text>
  </Box>
);

const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [events, setEvents] = useState([
    { title: "Event 1", date: "2023-10-01", description: "Description for event 1" },
    { title: "Event 2", date: "2023-10-05", description: "Description for event 2" },
    { title: "Event 3", date: "2023-10-10", description: "Description for event 3" },
  ]);
  const [currentEventIndex, setCurrentEventIndex] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCreate = () => {
    setCurrentEventIndex(null);
    onOpen();
  };

  const handleEdit = (index) => {
    setCurrentEventIndex(index);
    onOpen();
  };

  const handleDelete = (index) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  const handleView = (index) => {
    navigate(`/event/${index}`); // Navigate to event details page
  };

  const handleSubmit = (event) => {
    if (currentEventIndex !== null) {
      setEvents(events.map((e, i) => (i === currentEventIndex ? event : e)));
    } else {
      setEvents([...events, event]);
    }
  };

  return (
    <Container maxW="container.md" display="flex" flexDirection="column" minHeight="100vh">
      <Header onOpen={handleCreate} />
      <Box flex="1" py={8}>
        <Heading as="h2" size="xl" mb={6}>Upcoming Events</Heading>
        <EventList events={events} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} /> {/* Pass handleView to EventList */}
      </Box>
      <Footer />
      <EventForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} initialData={currentEventIndex !== null ? events[currentEventIndex] : null} />
    </Container>
  );
};

export default Index;