import React, { useState } from 'react';
import { Box, useColorModeValue, Flex } from "@chakra-ui/react";
import Sidebar from '../sidebar/Sidebar';
import Header from '../sidebar/Header';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Flex>
      <Sidebar isOpen={isSidebarOpen} />
      <Box
        ml={isSidebarOpen ? "250px" : "0"}
        w="full"
        transition="margin-left 0.2s"
      >
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <Box as="main" p="4">
          {children}
        </Box>
      </Box>
    </Flex>
  );
};

export default Layout;
