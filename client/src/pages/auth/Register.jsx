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
import { Link, useNavigate } from "react-router-dom";
import { MuiTelInput } from "mui-tel-input";

const Register = () => {
  const [role, setRole] = useState("Consultant");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    nameWithInitials: "",
    registrationNumber: "",
    speciality: "",
    ward: "",
    mobileNumber: "",
    email: "",
    sex: "",
    grade: "",
  });
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handlePhoneChange = (newValue) => {
    setFormData((prev) => ({
      ...prev,
      mobileNumber: newValue,
    }));
  };

  const renderFormFields = () => {
    const commonFields = (
      <>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.username}
          onChange={handleInputChange("username")}
          required
          sx={{ borderRadius: 3 }}
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
          sx={{ borderRadius: 3 }}
        />
        <TextField
          label="Registration Number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.registrationNumber}
          onChange={handleInputChange("registrationNumber")}
          required
          sx={{ borderRadius: 3 }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Ward</InputLabel>
          <Select
            value={formData.ward}
            onChange={handleInputChange("ward")}
            label="Ward"
          >
            <MenuItem value="Side A">Side A</MenuItem>
            <MenuItem value="Side B">Side B</MenuItem>
          </Select>
        </FormControl>
        <Box className="pt-4 pb-4">
          <MuiTelInput
            value={formData.mobileNumber}
            onChange={handlePhoneChange}
            label="Mobile Number"
            defaultCountry="LK"
            forceCallingCode
            fullWidth
            required
          />
        </Box>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleInputChange("email")}
          required
          sx={{ borderRadius: 3 }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Sex</InputLabel>
          <Select
            value={formData.sex}
            onChange={handleInputChange("sex")}
            label="Sex"
            required
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
      </>
    );

    switch (role) {
      case "House Officer":
      case "Medical Officer":
      case "Consultant":
        return (
          <>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.username}
              onChange={handleInputChange("username")}
              required
              sx={{ borderRadius: 3 }}
            />
            <TextField
              label="Name With Initials"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.nameWithInitials}
              onChange={handleInputChange("nameWithInitials")}
              required
              sx={{ borderRadius: 3 }}
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
              sx={{ borderRadius: 3 }}
            />
            <TextField
              label="Registration Number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.registrationNumber}
              onChange={handleInputChange("registrationNumber")}
              required
              sx={{ borderRadius: 3 }}
            />
            <TextField
              label="Speciality"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.speciality}
              onChange={handleInputChange("speciality")}
              required
              sx={{ borderRadius: 3 }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Ward</InputLabel>
              <Select
                value={formData.ward}
                onChange={handleInputChange("ward")}
                label="Ward"
              >
                <MenuItem value="Side A">Side A</MenuItem>
                <MenuItem value="Side B">Side B</MenuItem>
              </Select>
            </FormControl>
            <Box className="pt-4 pb-4">
              <MuiTelInput
                value={formData.mobileNumber}
                onChange={handlePhoneChange}
                label="Mobile Number"
                defaultCountry="LK"
                forceCallingCode
                fullWidth
                required
              />
            </Box>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleInputChange("email")}
              required
              sx={{ borderRadius: 3 }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Sex</InputLabel>
              <Select
                value={formData.sex}
                onChange={handleInputChange("sex")}
                label="Sex"
                required
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </>
        );
      case "Nurse":
        return (
          <>
            {commonFields}
            <FormControl fullWidth margin="normal">
              <InputLabel>Grade</InputLabel>
              <Select
                value={formData.grade}
                onChange={handleInputChange("grade")}
                label="Grade"
              >
                <MenuItem value="Student Nurse (Trainee Nurse)">
                  Student Nurse (Trainee Nurse)
                </MenuItem>
                <MenuItem value="Registered Nurse (RN)">
                  Registered Nurse (RN)
                </MenuItem>
                <MenuItem value="Grade II Nursing Officer (Staff Nurse)">
                  Grade II Nursing Officer (Staff Nurse)
                </MenuItem>
                <MenuItem value="Grade I Nursing Officer (Senior Staff Nurse)">
                  Grade I Nursing Officer (Senior Staff Nurse)
                </MenuItem>
                <MenuItem value="Supra Grade Nursing Officer (Supervisory Nurse)">
                  Supra Grade Nursing Officer (Supervisory Nurse)
                </MenuItem>
                <MenuItem value="Nursing Sister (Ward Sister / In-Charge Nurse)">
                  Nursing Sister (Ward Sister / In-Charge Nurse)
                </MenuItem>
                <MenuItem value="Matron / Chief Nursing Officer (CNO)">
                  Matron / Chief Nursing Officer (CNO)
                </MenuItem>
                <MenuItem value="Director of Nursing Services">
                  Director of Nursing Services
                </MenuItem>
                <MenuItem value="Public Health Nursing Officer (PHNO)">
                  Public Health Nursing Officer (PHNO)
                </MenuItem>
                <MenuItem value="Midwife / Nurse Midwife">
                  Midwife / Nurse Midwife
                </MenuItem>
                <MenuItem value="School Health Nurse">
                  School Health Nurse
                </MenuItem>
                <MenuItem value="Occupational Health Nurse">
                  Occupational Health Nurse
                </MenuItem>
                <MenuItem value="ICU / Critical Care Nurse">
                  ICU / Critical Care Nurse
                </MenuItem>
              </Select>
            </FormControl>
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
      const userData = {
        role,
        username: formData.username,
        password: formData.password,
        registrationNumber: formData.registrationNumber,
        ward: formData.ward,
        mobileNumber: formData.mobileNumber,
        email: formData.email,
        sex: formData.sex,
        ...(role === "House Officer" ||
        role === "Medical Officer" ||
        role === "Consultant"
          ? {
              nameWithInitials: formData.nameWithInitials,
              speciality: formData.speciality,
            }
          : {}),
        ...(role === "Nurse" ? { grade: formData.grade } : {}),
      };
      await register(userData);
      window.alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.log("🚀 ~ handleSubmit ~ err:", err)
      setError("Registration failed. Username or email may already exist.");
      window.alert("Registration failed! Please try again.");
      console.error(err);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Register
        </Typography>
        {error && (
          <Typography color="error" align="center" gutterBottom>
            {error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal" sx={{ borderRadius: 3 }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Role"
              sx={{ borderRadius: 3 }}
            >
              <MenuItem value="Consultant">Consultant</MenuItem>
              <MenuItem value="Medical Officer">Medical Officer</MenuItem>
              <MenuItem value="House Officer">House Officer</MenuItem>
              <MenuItem value="Nurse">Nurse</MenuItem>
            </Select>
          </FormControl>
          {renderFormFields()}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 2,
              borderRadius: 3,
              boxShadow: 2,
              ":hover": { boxShadow: 4 },
            }}
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
