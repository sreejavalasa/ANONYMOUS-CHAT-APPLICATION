import { Box, VStack ,Heading, Button} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
// import CreateQuiz from '../components/CreateQuiz';
// import PlayQuiz from '../components/PlayQuiz';
import JoinChat from './JoinChat';
import { UserContext } from '../App';
const HomeScreen = () => {
  const user=useContext(UserContext);
  const [join,setJoin]=useState(false);
  return (
    <>
    <Box p={4} w={"100%"}>
      <Heading  as="h1" size="xl">
            Welcome Back , {user.displayName || 'User'}
          </Heading>
      <VStack>
<Box p={4} w={"100%"}>
<center><Button colorScheme='teal' onClick={()=>setJoin(!join)} m={2}>Join Chat</Button></center>
{join&&<JoinChat/>}
</Box>
      </VStack>
      </Box>
    </>
  );
};

export default HomeScreen;
