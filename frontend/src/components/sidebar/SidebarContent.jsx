import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { FiHome, FiUpload, FiSettings } from 'react-icons/fi'
import NavItem from "./NavItem";  

const SidebarContent = () => {
  return (
    <Box>
      <Flex align="center" p="4" mx="4" mt="4" borderRadius="lg">
        <Text fontSize="2xl" fontWeight="bold">
          LOGO
        </Text>
      </Flex>
      <Flex direction="column" as="nav" fontSize="md">
        <NavItem icon={FiHome} to="/">
          Dashboard
        </NavItem>
        <NavItem icon={FiUpload} to="/upload">
          Upload
        </NavItem>
        <NavItem icon={FiSettings} to="/settings">
          Settings
        </NavItem>
      </Flex>
    </Box>
  );
};

export default SidebarContent;
