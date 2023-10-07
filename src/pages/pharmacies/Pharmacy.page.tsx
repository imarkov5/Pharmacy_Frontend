import { Fragment, useEffect, useState } from "react";
import httpModule from "../../http.module";
import { IPharmacy } from "../../global.types";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const Pharmacy = () => {
  const [pharmacy, setPharmacy] = useState<IPharmacy>();
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

  const card = (
    <Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Id: {pharmacy?.id}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.primary">
          Pharmacy Name: {pharmacy?.name}
        </Typography>
        <Typography variant="body2">
          Number Of Filled Prescription: {pharmacy?.numberOfFilledPrescriptions}
          <br/>
          <br/>
          Address: 
          {pharmacy?.address.street}, {pharmacy?.address.city}{" "}
          {pharmacy?.address.state} {pharmacy?.address.zip}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => redirect("/pharmacies")}>
          Back
        </Button>
      </CardActions>
    </Fragment>
  );

  return (
    <Box sx={{ maxWidth: 500 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
};

export default Pharmacy;
