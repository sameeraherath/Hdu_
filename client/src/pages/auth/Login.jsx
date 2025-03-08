import React, { useState } from "react";
import { useAuth } from "../../context/useAuth";
import {
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Box,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login({ username, password });
    } catch (err) {
      setError("Invalid username or password");
      console.error(err);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        {error && (
          <Typography color="error" align="center" gutterBottom>
            {error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Box>
        <Typography align="center" sx={{ mt: 2 }}>
          Not registered yet?{" "}
          <MuiLink component={Link} to="/register" underline="hover">
            Register here
          </MuiLink>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
