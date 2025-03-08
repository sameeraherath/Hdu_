import React, { useState } from "react";
import { useAuth } from "../../context/useAuth";
import {
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";

const Register = () => {
  const [role, setRole] = useState("House Officer");
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    trainingHospital: "", // House Officer
    specialization: "", // Medical Officer
    licenseNumber: "", // Medical Officer
    wardAssignment: "", // Nurse
    shiftPreference: "", // Nurse
    yearsOfExperience: "", // Consultant
    department: "", // Consultant
  });
  const [error, setError] = useState("");
  const { register } = useAuth();

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const renderFormFields = () => {
    switch (role) {
      case "House Officer":
        return (
          <>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={handleInputChange("name")}
              required
            />
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.username}
              onChange={handleInputChange("username")}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleInputChange("password")}
              required
            />
            <TextField
              label="Training Hospital"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.trainingHospital}
              onChange={handleInputChange("trainingHospital")}
              required
            />
          </>
        );
      case "Medical Officer":
        return (
          <>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={handleInputChange("name")}
              required
            />
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.username}
              onChange={handleInputChange("username")}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleInputChange("password")}
              required
            />
            <TextField
              label="Specialization"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.specialization}
              onChange={handleInputChange("specialization")}
              required
            />
            <TextField
              label="License Number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.licenseNumber}
              onChange={handleInputChange("licenseNumber")}
              required
            />
          </>
        );
      case "Nurse":
        return (
          <>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={handleInputChange("name")}
              required
            />
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.username}
              onChange={handleInputChange("username")}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleInputChange("password")}
              required
            />
            <TextField
              label="Ward Assignment"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.wardAssignment}
              onChange={handleInputChange("wardAssignment")}
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Shift Preference</InputLabel>
              <Select
                value={formData.shiftPreference}
                onChange={handleInputChange("shiftPreference")}
                label="Shift Preference"
              >
                <MenuItem value="Day">Day</MenuItem>
                <MenuItem value="Night">Night</MenuItem>
              </Select>
            </FormControl>
          </>
        );
      case "Consultant":
        return (
          <>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={handleInputChange("name")}
              required
            />
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.username}
              onChange={handleInputChange("username")}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleInputChange("password")}
              required
            />
            <TextField
              label="Years of Experience"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.yearsOfExperience}
              onChange={handleInputChange("yearsOfExperience")}
              required
              inputProps={{ min: 0 }}
            />
            <TextField
              label="Department"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.department}
              onChange={handleInputChange("department")}
              required
            />
          </>
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userData = { role };
      if (role === "House Officer") {
        userData.name = formData.name;
        userData.username = formData.username;
        userData.password = formData.password;
        userData.trainingHospital = formData.trainingHospital;
      } else if (role === "Medical Officer") {
        userData.name = formData.name;
        userData.username = formData.username;
        userData.password = formData.password;
        userData.specialization = formData.specialization;
        userData.licenseNumber = formData.licenseNumber;
      } else if (role === "Nurse") {
        userData.name = formData.name;
        userData.username = formData.username;
        userData.password = formData.password;
        userData.wardAssignment = formData.wardAssignment;
        userData.shiftPreference = formData.shiftPreference;
      } else if (role === "Consultant") {
        userData.name = formData.name;
        userData.username = formData.username;
        userData.password = formData.password;
        userData.yearsOfExperience = formData.yearsOfExperience;
        userData.department = formData.department;
      }
      await register(userData);
    } catch (err) {
      setError("Registration failed. Username may already exist.");
      console.error(err);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Register
        </Typography>
        {error && (
          <Typography color="error" align="center" gutterBottom>
            {error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Role"
            >
              <MenuItem value="House Officer">House Officer</MenuItem>
              <MenuItem value="Medical Officer">Medical Officer</MenuItem>
              <MenuItem value="Nurse">Nurse</MenuItem>
              <MenuItem value="Consultant">Consultant</MenuItem>
            </Select>
          </FormControl>
          {renderFormFields()}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </Box>
        <Typography align="center" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <MuiLink component={Link} to="/login" underline="hover">
            Login here
          </MuiLink>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;
