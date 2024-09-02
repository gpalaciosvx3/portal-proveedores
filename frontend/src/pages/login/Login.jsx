import React,{ useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Box, Button, FormControl, FormLabel, Input, Heading,  Alert, AlertIcon } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials ] = useState({
    username: "",
    password: ""
  });

  const {loading, error, dispatch} = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials((prev) => ({...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type: "LOGIN_START"});
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_USER_SERVICE}/auth/login`,
        credentials
      )
      dispatch({type:"LOGIN_SUCCESS", payload: res.data});
      navigate("/");
    } catch (err) {
      dispatch({type: "LOGIN_FAILURE", payload: err.response.data});
    }
  }
  
  return (
    <Box maxW="sm" mx="auto" mt="10">
      <Heading as="h1" size="lg" mb="6" textAlign="center">
        Login
      </Heading>
      {error && (
        <Alert status="error" mb="6">
          <AlertIcon />
          {error.message}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <FormControl id="username" mb="4">
          <FormLabel>Username</FormLabel>
          <Input type="text" name="username" value={credentials.username} onChange={handleChange} />
        </FormControl>
        <FormControl id="password" mb="6">
          <FormLabel>Password</FormLabel>
          <Input type="password" name="password" value={credentials.password} onChange={handleChange} />
        </FormControl>
        <Button type="submit" colorScheme="teal" width="full" isLoading={loading}>
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;