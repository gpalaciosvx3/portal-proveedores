import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  const {user} = useContext(AuthContext);
  console.log(user);
  console.log(user.username);
  return(
    <Box>
      <Heading>Bienvenidos al Portal de Proveedores {user.username}</Heading> 
      <Text mt="4">
        This is the Home page, where you can start navigating through your options.
      </Text>
    </Box>
  );
  
}

export default Home;