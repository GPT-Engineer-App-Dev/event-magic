import { Box, Container, Heading, Text, Button } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Fetch event details from a data source or state management
    // For now, we'll use a placeholder
    const fetchEvent = async () => {
      const response = await fetch(`/api/events/${id}`);
      const data = await response.json();
      setEvent(data);
    };

    fetchEvent();
  }, [id]);

  if (!event) {
    return <Text>Loading...</Text>;
  }

  return (
    <Container maxW="container.md" py={8}>
      <Button onClick={() => navigate(-1)} mb={4}>Back</Button>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
        <Heading size="lg">{event.title}</Heading>
        <Text fontSize="sm" color="gray.500">{event.date}</Text>
        <Text mt={2}>{event.description}</Text>
      </Box>
    </Container>
  );
};

export default EventDetails;