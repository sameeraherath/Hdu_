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
              <Typography variant="h3" className="text-4xl md:text-5xl  mb-4 ">
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
                <img
                  src="/hero.jpg"
                  alt="hero"
                  style={{ width: "500px", height: "440px" }}
                />
              </Box>
            </div>
          </div>
        </Container>
      </Box>
    </Box>
  );
};

export default HospitalHeroSection;
