import { Fragment, useEffect, useState } from "react";
import httpModule from "../../http.module";
import { IPharmacist, IPharmacy, IPrescription } from "../../global.types";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const Prescription = () => {
  const [prescription, setPrescription] = useState<IPrescription>();
  const [pharmacy, setPharmacy] = useState<IPharmacy>();
  const [pharmacist, setPharmacist] = useState<IPharmacist>();
  const { id } = useParams();
  const redirect = useNavigate();

  useEffect(() => {
    httpModule
      .get<IPharmacy>(`/Pharmacy/get-pharmacy/${id}`)
      .then((response) => {
        setPharmacy(response.data);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
      });
  }, []);

  useEffect(() => {
    httpModule
      .get<IPharmacist>(`/Pharmacist/get-pharmacist/${id}`)
      .then((response) => {
        setPharmacist(response.data);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
      });
  }, []);
  

  useEffect(() => {
    httpModule
      .get<IPrescription>(`/Prescription/get-prescription/${id}`)
      .then((response) => {
        setPrescription(response.data);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
      });
  }, []);

  const card = (
    <Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Id: {prescription?.id}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.primary">
          Patient Name: {prescription?.patientFirstName} {prescription?.patientLastName}
        </Typography>
        <Typography variant="body2">
          Drug Name: {prescription?.drugName}
          <br/>
          Drug Strength: {prescription?.drugStrength}
          <br/>
          Drug Dosage: {prescription?.dosage}
          <br/>
          Quantity: {prescription?.quantity}
          <br/>
          Is Dispensed: {prescription?.isDispensed === "0" ? "NO" : "YES"}
          <br/>
          Dispensed Date: {prescription?.dispensedDate === null ? ""
        : moment(prescription?.dispensedDate).format("YYYY-MM-DD HH:MM")}
           
          <br/>
          Pharmacy: {pharmacy?.name}
          <br/>
          Pharmacist: {pharmacist?.firstName} {pharmacist?.lastName}
          <br/>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => redirect("/prescriptions")}>
          Back
        </Button>
      </CardActions>
    </Fragment>
  );

  return (
    <Box sx={{ maxWidth: 800 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
};

export default Prescription;
