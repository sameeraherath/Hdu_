import { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Grid2, CircularProgress } from "@mui/material";
import BedCard from "../components/BedCard";

const NurseDashboard = () => {
  const [beds, setBeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;
    const fetchBeds = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/beds`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBeds(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.log(err);
      }
    };

    fetchBeds();
  }, []);

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
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Nurse Dashboard - Bed Overview
      </Typography>
      <Grid2 container spacing={3}>
        {beds.slice(0, 10).map((bed) => (
          <Grid2 key={bed.id}>
            <BedCard bed={bed} />
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
};

export default NurseDashboard;
