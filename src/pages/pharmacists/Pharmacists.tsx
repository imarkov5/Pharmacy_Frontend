import { useEffect, useState } from "react";
import "./pharmacists.scss";
import httpModule from "../../http.module";
import { IPharmacist } from "../../global.types";
import { Button, CircularProgress } from "@mui/material";
import PharmacistsGrid from "../../components/PharmacistsGrid";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { useGetAllPharmacistsQuery } from "../../features/apiSlice";

const Pharmacists = () => {
  //const [pharmacists, setPharmacists] = useState<IPharmacist[]>([]);
  const { data: pharmacists, isLoading } = useGetAllPharmacistsQuery();
  //const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();

  // useEffect(() => {
  //   setLoading(true);
  //   httpModule
  //     .get<IPharmacist[]>("/Pharmacist/get-all-pharmacists")
  //     .then((response) => {
  //       setPharmacists(response.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       alert("Error");
  //       console.log(error);
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <div className="content pharmacists">
      <div className="heading">
        <h2>Pharmacists</h2>
        <Button variant="outlined" onClick={() => redirect("/pharmacists/add")}>
          <Add />
        </Button>
      </div>
      {isLoading ? (
        <CircularProgress size={100} />
      ) : pharmacists ? (
        <PharmacistsGrid data={pharmacists} />
      ) : (
        <h1>No Pharmacists</h1>
      )}
    </div>
  );
};

export default Pharmacists;
