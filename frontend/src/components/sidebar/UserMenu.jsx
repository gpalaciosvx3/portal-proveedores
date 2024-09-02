import React, { useContext } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Box,
  Flex,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { ChevronDownIcon, BellIcon } from "@chakra-ui/icons";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      //await axios.post(`${process.env.REACT_APP_USER_SERVICE}/auth/logout`);
      dispatch({ type:"LOGOUT" });
      navigate("/login");
    } catch (error) {
      dispatch({ type: "LOGOUT_FAILURE", payload: error.response?.data || "Logout failed" });
    }
  }

  return (
    <Flex align="center">
      <IconButton
        size="lg"
        variant="ghost"
        aria-label="Notifications"
        icon={<BellIcon />}
        mr="3"
      />
      <Menu>
        <MenuButton
          as={Box}
          rounded="full"
          cursor="pointer"
          _hover={{ bg: "gray.200" }}
        >
          <Flex align="center">
            <Avatar
              size="sm"
              src="https://bit.ly/broken-link"
              mr="2"
            />
            <Text fontWeight="medium" mr="2">
              {user?.username}
            </Text>
            <ChevronDownIcon />
          </Flex>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default UserMenu;
