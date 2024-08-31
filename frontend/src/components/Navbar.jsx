import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  Button,
  useDisclosure,
  IconButton,
  Avatar,
  HStack
  ,useMediaQuery
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { UserContext } from '../App';
import {handleLogout} from '../heplerfunctions/Logout';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@chakra-ui/react";


const Navbar = ({ currentView, handleCurrView }) => {
  const { isOpen, onToggle } = useDisclosure();
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const toast = useToast();
  const [isLargerThanMD] = useMediaQuery('(min-width: 48em)'); 
  function signOutWrapper() {
    if (handleLogout(navigate))
      toast({
        title: 'Success!',
        description: 'Logged out successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    else
      toast({
        title: 'Error!',
        description: 'Error logging out, try again later',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
  }

  function handleLinkClicks(e, view) {
    e.preventDefault();
    handleCurrView(view);
  }

  return (
    <Flex
    position={'relative'}
      as="nav"
      align="center"
      justify="space-between"
      paddingX={4} // Horizontal padding
      paddingY={4} // Vertical padding
      bgColor="teal.500"
      color="white"
      borderBottom="2px solid white" // Add a bottom border
    >
      <Box>
        <HStack>
          <Avatar name={user?.displayName || 'User'} size="md" src={user?.photoURL} />
          <Text fontSize="2rem" fontWeight="bold">
            {currentView}
          </Text>
        </HStack>
      </Box>
      <IconButton
        display={{ base: 'block', md: 'none' }}
        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
        onClick={onToggle}
        fontSize="xl" // Adjust icon size
      />
      <Box
        position={isLargerThanMD ? 'static' : 'absolute'}
        right={isLargerThanMD ? '0' : '2px'}
        top={isLargerThanMD ? '0' : '6rem'}
        display={{ base: isOpen ? 'block' : 'none', md: 'flex' }}
        flexDirection={{ base: 'column', md: 'row' }}
        alignItems={{ base: 'center', md: 'flex-end' }}
        zIndex={10}
      >
        <Box padding={4} fontSize={'1.5rem'} backgroundColor={'lightblue'}>
          <div onClick={(e) => handleLinkClicks(e, 'Home')} style={{textAlign:'center'}}>
            <Link to="/home" fontSize="lg" >
              Home
            </Link>
          </div>
        </Box>
        <Box padding={4} fontSize={'1.5rem'} backgroundColor={'lightblue'}>
          <div onClick={(e) => handleLinkClicks(e, 'Profile')} style={{textAlign:'center'}}>
            <Link to="/profile" fontSize="lg">
              Profile
            </Link>
          </div>
        </Box>
        <Box
          padding={4}
          fontSize={'1.5rem'}
          backgroundColor={'lightblue'}
          onClick={signOutWrapper}
          _hover={{ cursor: 'pointer' }}
        >
          Sign Out
        </Box>
      </Box>
    </Flex>
  );
};

export default Navbar;