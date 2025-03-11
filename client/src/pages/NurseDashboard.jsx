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

      if (!response.ok) {
        throw new Error("Failed to assign bed.");
      }


    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


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

          </Grid2>
        ))}
      </Grid2>


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

          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            sx={{ textTransform: "none" }}
          >

    </div>
  );
};

export default NurseDashboard;
