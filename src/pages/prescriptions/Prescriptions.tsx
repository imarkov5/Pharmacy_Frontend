import "./prescriptions.scss";
import { Button, CircularProgress } from "@mui/material";
import PrescriptionsGrid from "../../components/PrescriptionsGrid";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useGetAllPrescriptionsQuery } from "../../features/apiSlice";

const Prescriptions = () => {
  const { data: prescriptions, isLoading } = useGetAllPrescriptionsQuery();
  const redirect = useNavigate();

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
      {isLoading ? (
        <CircularProgress size={100} />
      ) : prescriptions ? (
        <PrescriptionsGrid data={prescriptions} />
      ) : null}
    </div>
  );
};

export default Prescriptions;
