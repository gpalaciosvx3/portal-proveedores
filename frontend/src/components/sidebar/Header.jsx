import React from 'react';
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import UserMenu from './UserMenu';

const Header = ({ toggleSidebar }) => {
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      px="4"
      bg="purple.700"
      color="white"
      h="16"
    >
      <IconButton
        aria-label="Open Menu"
        icon={<FiMenu />}
        onClick={toggleSidebar}
        bg="transparent"
        color="white"
      />
      <UserMenu />
    </Flex>
  );
};

export default Header;
