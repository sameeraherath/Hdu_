import { Button, Typography, Container, Box, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";

const HospitalHeroSection = () => {
  return (
    <Box className="min-h-screen flex flex-col ">
      {/* Hero Section */}
      <Box className="py-32 pt-34">
        <Container maxWidth="lg">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-1/2">
              <Typography variant="h2" className="text-4xl md:text-5xl  mb-4 ">
                General Hospital Kegalle Patient Management System
              </Typography>
              <Typography
                variant="subtitle1"
                className="text-xl mb-8 opacity-90 pt-8 pb-8 px-2"
              >
                Streamlined healthcare management for better patient care and
                hospital efficiency
              </Typography>
              <Box className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    borderRadius: "10px",
                    backgroundColor: "primary.main",
                    textTransform: "none",
                    height: "58px",
                  }}
                >
                  Get Started
                </Button>
              </Box>
            </div>
            <div className="w-full md:w-1/2 hidden md:block">
              <Box className="relative">
                <Paper
                  elevation={10}
                  sx={{
                    padding: "20px",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <Box className="p-4 bg-blue-100 rounded-3xl mb-4">
                    <div className="flex gap-2 mb-2 pt-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <Typography
                      variant="body2"
                      className="text-gray-800 font-mono pt-2"
                    >
                      Checking patient records...
                    </Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    className="font-bold mb-2 text-blue-900"
                  >
                    Dash Board
                  </Typography>
                  <Typography variant="body2" className="text-gray-700 pt-2">
                    Name: John Smith
                    <br />
                    ID: KGH-2025-10045
                    <br />
                    Next Appointment: March 15, 2025
                    <br />
                    Department: Cardiology
                  </Typography>
                </Paper>
              </Box>
            </div>
          </div>
        </Container>
      </Box>
    </Box>
  );
};

export default HospitalHeroSection;
