import React from "react";
import { Link, Flex, Icon, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const NavItem = ({ icon, children, to }) => (
  <Link as={RouterLink} to={to} style={{ textDecoration: "none" }}>
    <Flex align="center" p="4" mx="4" borderRadius="lg" cursor="pointer">
      {icon && <Icon mr="4" fontSize="16" as={icon} />}
      <Text>{children}</Text>
    </Flex>
  </Link>
);

export default NavItem;
