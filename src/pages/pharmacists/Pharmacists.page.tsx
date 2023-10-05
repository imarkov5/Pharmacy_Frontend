import { useEffect, useState } from "react";
import "./pharmacists.scss";
import httpModule from "../../http.module";
import { IPharmacist } from "../../global.types";
import { CircularProgress } from "@mui/material";
import PharmacistsGrid from "../../components/pharmacists/PharmacistsGrid.component";

const Pharmacists = () => {
  const [pharmacists, setPharmacists] = useState<IPharmacist[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    httpModule
      .get<IPharmacist[]>("/Pharmacist/get-all-pharmacists")
      .then((response) => {
        setPharmacists(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="content pharmacists">
      <div className="heading">
        <h2>Pharmacists</h2>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : pharmacists.length === 0 ? (
        <h1>No Pharmacists</h1>
      ) : (
        <PharmacistsGrid data={pharmacists} />
      )}
    </div>
  );
};

export default Pharmacists;
