import { useEffect, useState } from "react";
import "./pharmacies.scss";
import httpModule from "../../http.module";
import { IPharmacy } from "../../global.types";
import { Button, CircularProgress } from "@mui/material";

import PharmaciesGrid from "../../components/PharmaciesGrid";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../app/storeHooks";
import { fetchPharmacies } from "../../features/pharmacies/pharmaciesSlice";

const Pharmacies = () => {
  const redirect = useNavigate();
  const dispatch = useAppDispatch();
  const pharmacies = useAppSelector((state) => state.pharmacies.pharmacies);
  const pharmaciesStatus = useAppSelector((state) => state.pharmacies.status);
  const error = useAppSelector((state) => state.pharmacies.error)

  useEffect(() => {
    if (pharmaciesStatus === "idle") {
      dispatch(fetchPharmacies());
    }
  }, [pharmaciesStatus, dispatch]);

  
  let content;

  if(pharmaciesStatus === 'loading') {
    content = <CircularProgress size={100} />;
  }else if(pharmaciesStatus === 'succeeded'){
    content = <PharmaciesGrid data={pharmacies} />
  }else if(pharmaciesStatus === 'failed'){
    content = <p>{error}</p>
  }

  return (
    <div className="content pharmacies">
      <div className="heading">
        <h2>Pharmacies</h2>
        <Button variant="outlined" onClick={() => redirect("/pharmacies/add")}>
          <Add />
        </Button>
      </div>
      {content}
    </div>
  );
};

export default Pharmacies;
