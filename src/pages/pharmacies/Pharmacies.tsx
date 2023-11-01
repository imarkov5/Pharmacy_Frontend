import "./pharmacies.scss";
import { Button, CircularProgress } from "@mui/material";
import { useGetAllPharmaciesQuery } from "../../features/apiSlice";
import PharmaciesGrid from "../../components/PharmaciesGrid";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";

const Pharmacies = () => {
  const { data: pharmacies, isLoading } = useGetAllPharmaciesQuery();
  const redirect = useNavigate();

  return (
    <div className="content pharmacies">
      <div className="heading">
        <h2>Pharmacies</h2>
        <Button variant="outlined" onClick={() => redirect("/pharmacies/add")}>
          <Add />
        </Button>
      </div>
      {isLoading ? (
        <CircularProgress size={100} />
      ) : pharmacies ? (
        <PharmaciesGrid data={pharmacies} />
      ) : null}
    </div>
  );
};

export default Pharmacies;
