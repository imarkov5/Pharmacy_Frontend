import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddPharmacistMutation } from "../../features/apiSlice";
import { ICreatePharmacistDto } from "../../global.types";
import "./pharmacists.scss";
import { Button, TextField } from "@mui/material";


const AddPharmacist = () => {
  const [pharmacist, setPharmacist] = useState<ICreatePharmacistDto>({
    firstName: "",
    lastName: "",
  });
  const redirect = useNavigate();
  const [addPharmacist] = useAddPharmacistMutation();

  const handleClickSaveBtn = () => {
    if (pharmacist.firstName === "" || pharmacist.lastName === "") {
      alert("Fill out all fields");
      return;
    }
    addPharmacist(pharmacist);
    redirect("/pharmacists");
  };
  const handleClickBackBtn = () => {
    redirect("/pharmacists");
  };

  return (
    <div className="content">
      <div className="add-pharmacist">
        <h2>Add New Pharmacist</h2>
        <TextField
          fullWidth
          autoComplete="off"
          label="First Name"
          variant="outlined"
          name="firstName"
          value={pharmacist.firstName}
          onChange={(e) =>
            setPharmacist({ ...pharmacist, firstName: e.target.value })
          }
        />
        <TextField
          fullWidth
          autoComplete="off"
          label="Last Name"
          variant="outlined"
          name="lastName"
          value={pharmacist.lastName}
          onChange={(e) =>
            setPharmacist({ ...pharmacist, lastName: e.target.value })
          }
        />

        <div className="btns">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickSaveBtn}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClickBackBtn}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddPharmacist;
