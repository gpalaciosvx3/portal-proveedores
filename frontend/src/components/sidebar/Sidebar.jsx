import React from 'react';
import { Box } from "@chakra-ui/react";
import SidebarContent from './SidebarContent';

const Sidebar = ({ isOpen }) => {
  return (
    <Box
      as="nav"
      position="fixed"
      top="0"
      left="0"
      w={isOpen ? "250px" : "0"}
      h="100vh"
      bg="purple.700"
      color="white"
      overflowX="hidden"
      transition="width 0.2s"
    >
      {isOpen && <SidebarContent />}
    </Box>
  );
};

export default Sidebar;
