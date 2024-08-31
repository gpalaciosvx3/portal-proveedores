import React,{ useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";
import { Button, TextField, Container, Typography, Box, Alert, containerClasses } from "@mui/material";
import axios from "axios";

const Login = async () => {
  const [credentials, setCredentials ] = useState({
    username: undefined,
    password: undefined
  });

  const {user, loading, error, dispatch} = useContext(AuthContext);

  /* js lógica */
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
    } catch (error) {
      dispatch({type: "LOGIN_FAILURE", payload: error.response.data});
    }
  }

  console.log(user);
  
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Usuario"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Clave"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          {error && <Alert severity="error">{error.message}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Box>
      </Box>
    </Container>

  );
};

export default Login;