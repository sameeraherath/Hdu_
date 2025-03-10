import { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  CircularProgress,
  Grid2,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
  Skeleton,
} from "@mui/material";
import BedCard from "../components/BedCard";

const NurseDashboard = () => {
  const [beds, setBeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedBed, setSelectedBed] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    birthDate: "",
    sex: "",
    condition: "",
    admitDateTime: "",
    contactDetails: "",
    frequencyMeasure: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    fetchBeds();
  }, []);

  const fetchBeds = async () => {
    const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;
    try {
      const response = await axios.get(`${BASE_URL}/beds`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBeds(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleAssignBed = (bedData) => {
    setSelectedBed(bedData);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBed(null);
  };

  const handleSubmit = async () => {
    const missingFields = [];

    if (!formData.fullName) missingFields.push("Full Name");
    if (!formData.age) missingFields.push("Age");
    if (!formData.birthDate) missingFields.push("Birth Date");
    if (!formData.sex) missingFields.push("Sex");
    if (!formData.condition) missingFields.push("Condition");
    if (!formData.contactDetails) missingFields.push("Contact Details");
    if (!formData.frequencyMeasure) missingFields.push("Frequency Measure");

    if (missingFields.length > 0) {
      const missingFieldsMessage = missingFields.join("\n");
      setSnackbarMessage(`Please fill in the following required fields:\n\n${missingFieldsMessage}`);
      setSnackbarOpen(true);
      return false;
    }

    const dataToSubmit = {
      fullName: formData.fullName,
      age: formData.age,
      birthDate: formData.birthDate,
      sex: formData.sex,
      condition: formData.condition,
      contactDetails: formData.contactDetails,
      frequencyMeasure: formData.frequencyMeasure,
      bedId: selectedBed.id,
    };

    try {
      const BASE_URL = `${import.meta.env.VITE_API_URL}/api/beds`;
      const response = await fetch(`${BASE_URL}/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patientData: dataToSubmit }),
      });

      console.log("🚀 ~ handleSubmit ~ response:", response)

      if (!response.ok) {
        throw new Error("Failed to assign bed.");
      }

      setSnackbarMessage("Bed assigned successfully.");
      setSnackbarOpen(true);
      setOpen(false);
      await fetchBeds();
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error)
      setSnackbarMessage("Error assigning bed.");
      setSnackbarOpen(true);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
        <CircularProgress/>
      </div>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );
  }

  return (
    <div style={{ padding: "25px" }}>
      <Typography variant="h4" gutterBottom>
        Nurse Dashboard - Bed Overview
      </Typography>

      <Grid2 container spacing={3} style={{ marginTop: "20px" }}>
        {beds.slice(0, 10).map((bed) => (
          <Grid2 key={bed.id}>
            <BedCard bed={bed} assignBed={handleAssignBed} />
          </Grid2>
        ))}
      </Grid2>

      <Dialog open={open && !!selectedBed} onClose={handleClose}>
        <DialogTitle>Assign patient to {selectedBed?.bedNumber}</DialogTitle>
        <DialogContent>
          <TextField
            label="Full Name"
            name="fullName"
            fullWidth
            value={formData.fullName}
            margin="dense"
            onChange={handleChange}
            required
          />
          <TextField
            label="Age"
            name="age"
            type="number"
            fullWidth
            value={formData.age}
            margin="dense"
            onChange={handleChange}
            required
          />
          <TextField
            label="Birth Date"
            name="birthDate"
            type="date"
            fullWidth
            value={formData.birthDate}
            margin="dense"
            onChange={handleChange}
            required
          />
          <TextField
            select
            label="Sex"
            name="sex"
            fullWidth
            value={formData.sex}
            margin="dense"
            onChange={handleChange}
            required
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </TextField>
          <TextField
            label="Condition"
            name="condition"
            multiline
            rows={3}
            fullWidth
            value={formData.condition}
            margin="dense"
            onChange={handleChange}
            required
          />
          <TextField
            label="Admit Date & Time"
            name="admitDateTime"
            type="datetime-local"
            fullWidth
            value={formData.admitDateTime}
            margin="dense"
            onChange={handleChange}
            required
          />
          <TextField
            label="Contact Details"
            name="contactDetails"
            fullWidth
            value={formData.contactDetails}
            margin="dense"
            onChange={handleChange}
            required
          />
          <TextField
            select
            label="Frequency Measure"
            name="frequencyMeasure"
            fullWidth
            value={formData.frequencyMeasure}
            margin="dense"
            onChange={handleChange}
            required
          >
            <MenuItem value="Red">Red</MenuItem>
            <MenuItem value="Green">Green</MenuItem>
            <MenuItem value="Blue">Blue</MenuItem>
            <MenuItem value="Yellow">Yellow</MenuItem>
            <MenuItem value="Brown">Brown</MenuItem>
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            sx={{ textTransform: "none" }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={error ? "error" : "success"}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default NurseDashboard;
