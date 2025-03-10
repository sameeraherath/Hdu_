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
  InputLabel,
} from "@mui/material";
import BedCard from "../components/BedCard";

const NurseDashboard = () => {
  const [beds, setBeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    birthDate: "",
    sex: "",
    condition: "",
    admitDateTime: "",
    contactDetails: "",
    frequencyMeasure: "",
    bedId: "",
  });

  const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

  useEffect(() => {
    const fetchBeds = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/beds`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBeds(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBeds();
  }, [BASE_URL]);

  const handleSubmit = async () => {
    if (
      !formData.fullName ||
      !formData.age ||
      !formData.birthDate ||
      !formData.sex ||
      !formData.condition ||
      !formData.admitDateTime ||
      !formData.contactDetails ||
      !formData.frequencyMeasure
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const patientData = {
      ...formData,
      bedId: formData.bedId || "",
    };

    try {
      console.log("D-Log ** patientData", patientData);
      const response = await fetch(`${BASE_URL}/beds/assign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(patientData),
      });

      if (!response.ok) {
        throw new Error("Failed to assign bed.");
      }

      alert("Bed assigned successfully.");
      setOpen(false);

      // Refresh the bed list after assignment
      const updatedBeds = await axios.get(`${BASE_URL}/beds`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBeds(updatedBeds.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Error assigning bed.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <CircularProgress />
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
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{ textTransform: "none" }}
      >
        Assign Bed
      </Button>

      <Grid2 container spacing={3} style={{ marginTop: "20px" }}>
        {beds.slice(0, 10).map((bed) => (
          <Grid2 key={bed.id}>
            <BedCard bed={bed} />
          </Grid2>
        ))}
      </Grid2>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Assign Bed</DialogTitle>
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
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
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
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
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
          <TextField
            label="Bed ID"
            name="bedId"
            fullWidth
            value={formData.bedId}
            margin="dense"
            onChange={handleChange}
            required
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            sx={{ textTransform: "none" }}
          >
            Assign
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NurseDashboard;
