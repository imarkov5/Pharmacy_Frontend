import { useNavigate } from "react-router-dom";
import { useGetAllPharmacistsQuery } from "../../features/apiSlice";
import PharmacistsGrid from "../../components/PharmacistsGrid";
import "./pharmacists.scss";
import { Add } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";


const Pharmacists = () => {
  const { data: pharmacists, isLoading } = useGetAllPharmacistsQuery();
  const redirect = useNavigate();

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
