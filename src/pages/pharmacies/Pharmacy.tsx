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
import { useGetPharmacyByIdQuery } from "../../features/apiSlice";

const Pharmacy = () => {
  const { id } = useParams();
  const redirect = useNavigate();

  const { data: pharmacy, isLoading, error } = useGetPharmacyByIdQuery(id);

  const card = (
    <div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <CircularProgress size={100} />
      ) : pharmacy ? (
        <Fragment>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Id: {pharmacy.id}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.primary">
              Pharmacy Name: {pharmacy.name}
            </Typography>
            <Typography variant="body2">
              Number Of Filled Prescription:{" "}
              {pharmacy.numberOfFilledPrescriptions}
              <br />
              <br />
              Address:
              {pharmacy.address.street}, {pharmacy.address.city}{" "}
              {pharmacy.address.state} {pharmacy.address.zip}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => redirect("/pharmacies")}>
              Back To Pharmacies
            </Button>
            <Button size="small" onClick={async() => {redirect(`/pharmacies/update/${id}`)}}>
          Update
        </Button>
          </CardActions>
        </Fragment>
      ) : null}
    </div>
  );

  return (
    <Box sx={{ maxWidth: 500 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
};

export default Pharmacy;
