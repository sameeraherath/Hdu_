import { Card, CardContent, Typography, Chip, Button } from "@mui/material";
import { styled } from "@mui/system";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HotelIcon from "@mui/icons-material/Hotel";

const StyledCard = styled(Card)(({ theme, occupied }) => ({
  width: "315px",
  height: "155px",
  margin: theme.spacing(2),
  backgroundColor: occupied ? "#ffebee" : "#e8f5e9",
  transition: "0.3s",
  "&:hover": {
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
  },
  cursor: "pointer",
  borderRadius: "10px",
}));

const BedCard = ({ bed, assignBed }) => {
  const isOccupied = bed.patientId !== null;

  return (
    <StyledCard occupied={isOccupied.toString()}>
      <CardContent>
        <Typography variant="h6" color="textPrimary">
          Bed Number: {bed.bedNumber}
        </Typography>
        <Chip
          label={isOccupied ? "Occupied" : "Available"}
          color={isOccupied ? "error" : "success"}
          size="small"
          style={{ marginBottom: "10px" }}
        />
        {isOccupied && bed.patientId ? (
          <>
            <Typography variant="body1" color="textSecondary">
              Patient ID: {bed.patientId}
            </Typography>
          </>
        ) : (
          <div>
            <div>
              <Typography variant="body1" color="textSecondary">
                No patient assigned
              </Typography>
            </div>

            <div>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  marginTop: "5px",
                  fontSize: "16px",
                  borderRadius: "20px",
                  backgroundColor: "white",
                  color: "primary.main",
                }}
                startIcon={<HotelIcon />}
                onClick={() => assignBed(bed)}
              >
                Assign
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default BedCard;
