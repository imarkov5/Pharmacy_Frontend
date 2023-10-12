import { Fragment } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import {
  useGetPrescriptionByIdQuery,
  useGetPharmacyByIdQuery,
  useGetPharmacistByIdQuery,
} from "../../features/apiSlice";

const Prescription = () => {
  const { id } = useParams();
  const redirect = useNavigate();
  const {
    data: prescription,
    isLoading,
    error,
  } = useGetPrescriptionByIdQuery(id);
  const { data: pharmacy } = useGetPharmacyByIdQuery(prescription?.pharmacyId);
  const { data: pharmacist } = useGetPharmacistByIdQuery(
    prescription?.pharmacistId
  );

  const card = (
    <div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <CircularProgress size={100} />
      ) : prescription ? (
        <Fragment>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Id: {prescription.id}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.primary">
              Patient Name: {prescription.patientFirstName}{" "}
              {prescription.patientLastName}
            </Typography>
            <Typography variant="body2">
              Drug Name: {prescription.drugName}
              <br />
              Drug Strength: {prescription.drugStrength}
              <br />
              Drug Dosage: {prescription.dosage}
              <br />
              Quantity: {prescription.quantity}
              <br />
              Is Dispensed: {prescription.isDispensed === "0" ? "NO" : "YES"}
              <br />
              Dispensed Date:{" "}
              {prescription.dispensedDate === null
                ? ""
                : moment(prescription.dispensedDate).format("YYYY-MM-DD HH:MM")}
              <br />
              Pharmacy: {pharmacy?.name}
              <br />
              Pharmacist: {pharmacist?.firstName} {pharmacist?.lastName}
              <br />
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => redirect("/prescriptions")}>
              Back
            </Button>
          </CardActions>
        </Fragment>
      ) : null}
    </div>
  );

  return (
    <Box sx={{ maxWidth: 800 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
};

export default Prescription;
