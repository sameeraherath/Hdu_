import { Button, Typography, Container, Box, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";

const HospitalHeroSection = () => {
  return (
    <Box className="min-h-screen flex flex-col ">
      <Box className="py-32 pt-34 ">
        <Container maxWidth="lg">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-1/2">
              <Box className="flex items-center gap-4 mb-4">
                <img
                  src="/1.jpeg"
                  alt="Hospital Logo"
                  style={{
                    width: "180px",
                    height: "180px",
                    borderRadius: "50%",
                  }}
                />
                <Typography
                  variant="h5"
                  className="text-4xl md:text-5xl"
                  sx={{ fontWeight: "bold" }}
                >
                  HDU Surgical Unit
                  <br />
                  District General Hospital
                  <br />
                  Kegalle
                </Typography>
              </Box>

              <Typography
                variant="subtitle"
                className="text-xl mb-8 opacity-80 pt-8  "
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
                    marginTop: "20px",
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
                  style={{ width: "515px", height: "440px" }}
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
