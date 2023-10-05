import { useEffect, useState } from "react";
import "./pharmacies.scss";
import httpModule from "../../http.module";
import { IPharmacy } from "../../global.types";
import { Button, CircularProgress } from "@mui/material";

import PharmaciesGrid from "../../components/pharmacies/PharmaciesGrid.component";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";

const Pharmacies = () => {
  const [pharmacies, setPharmacies] = useState<IPharmacy[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();

  useEffect(() => {
    setLoading(true);
    httpModule
      .get<IPharmacy[]>("/Pharmacy/get-all-pharmacies")
      .then((response) => {
        setPharmacies(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="content pharmacies">
      <div className="heading">
        <h2>Pharmacies</h2>
        <Button variant="outlined" onClick={() => redirect("/pharmacies/add")}>
          <Add />
        </Button>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : pharmacies.length === 0 ? (
        <h1>No Pharmacies</h1>
      ) : (
        <PharmaciesGrid data={pharmacies} />
      )}
    </div>
  );
};

export default Pharmacies;
