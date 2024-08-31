import React, { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../App';
import { Box, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const ParentContainer = () => {
  const user = useContext(UserContext);
  const [currpage, setCurrPage] = useState('Welcome ');

  const fadeInUpVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <Flex direction="column" align="center" minH="100vh">
      <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        width="100%"
        p={4}
      >
        <Navbar currentView={currpage} handleCurrView={setCurrPage} />
      </MotionBox>

      <MotionBox
        variants={fadeInUpVariants}
        initial="initial"
        animate="animate"
        width="100%"
        p={4}
      >
        <Outlet />
      </MotionBox>
    </Flex>
  );
};

export default ParentContainer;
