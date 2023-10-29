import { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/storeHooks";
import { fetchPharmacies, fetchPharmacyById, selectPharmacyById } from "../../features/pharmacies/pharmaciesSlice";

const Pharmacy = () => {
  const { id } = useParams();
  const pharmacyId = Number(id);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const pharmacyStatus = useAppSelector((state) => state.pharmacies.status);
  
  const pharmacy = useAppSelector((state) => selectPharmacyById(state, pharmacyId))
  
  useEffect(() => {
    if (pharmacyStatus === "idle") {
      dispatch(fetchPharmacyById(pharmacyId));
    }
  }, [pharmacyStatus, dispatch]);

  

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
        {/* navigate(0) reloads the page to show all pharmacies*/}
        <Button size="small" onClick={async() => {navigate("/pharmacies"); navigate(0)}}>
          Back To Pharmacies
        </Button>
        <Button size="small" onClick={async() => {navigate(`/pharmacies/update/${id}`)}}>
          Update
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
