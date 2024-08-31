import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { useRouteError } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <Box width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={4}>
      <Heading as="h1" size="2xl" mb={4}>
        Oops!
      </Heading>
      <Text fontSize="xl" mb={4}>
        Sorry, an unexpected error has occurred.
      </Text>
      <Text fontSize="md" mb={8}>
        <i>{error?.statusText || error?.message}</i>
      </Text>
      <Button colorScheme="teal" onClick={() => navigate(-1)}>
        Go Back
      </Button>
    </Box>
  );
}
