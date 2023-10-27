import { useEffect, useState } from "react";
import "./prescriptions.scss";
import httpModule from "../../http.module";
import { IPrescription } from "../../global.types";
import { Button, CircularProgress } from "@mui/material";
import PrescriptionsGrid from "../../components/PrescriptionsGrid";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState<IPrescription[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();

  useEffect(() => {
    setLoading(true);
    httpModule
      .get<IPrescription[]>("/Prescription/get-all-prescriptions")
      .then((response) => {
        setPrescriptions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="content prescriptions">
      <div className="heading">
        <h2>Prescriptions</h2>
        <Button
          variant="outlined"
          onClick={() => redirect("/prescriptions/add")}
        >
          <Add />
        </Button>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : prescriptions.length === 0 ? (
        <h1>No prescriptions</h1>
      ) : (
        <PrescriptionsGrid data={prescriptions} />
      )}
    </div>
  );
};

export default Prescriptions;
