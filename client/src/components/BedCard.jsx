import { Card, CardContent, Typography, Chip } from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)(({ theme, occupied }) => ({
  width: "315px",
  height: "135px",
  margin: theme.spacing(2),
  backgroundColor: occupied ? "#ffebee" : "#e8f5e9",
  transition: "0.3s",
  "&:hover": {
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
  },
}));

const BedCard = ({ bed }) => {
  const isOccupied = bed.patientId !== null;

  return (
    <StyledCard occupied={isOccupied}>
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
        {isOccupied && (
          <>
            <Typography variant="body1" color="textSecondary">
              Patient Name: {bed.patientName}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Patient ID: {bed.patientId}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Condition: {bed.patient?.condition}
            </Typography>
          </>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default BedCard;
