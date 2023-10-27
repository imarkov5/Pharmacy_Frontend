import { useState } from "react";
import "./pharmacies.scss";
import { ICreatePharmacyDto } from "../../global.types";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import httpModule from "../../http.module";

const AddPharmacy = () => {
  const [pharmacy, setPharmacy] = useState<ICreatePharmacyDto>({
    name: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
    },
  });

  const redirect = useNavigate();

  const handleClickSaveBtn = () => {
    if (
      pharmacy.name === "" ||
      pharmacy.address.street === "" ||
      pharmacy.address.city === "" ||
      pharmacy.address.state === "" ||
      pharmacy.address.zip === ""
    ) {
      alert("Fill out all fields");
      return;
    }
    httpModule
      .post("/Pharmacy/add-pharmacy", pharmacy)
      .then((response) => redirect("/pharmacies"))
      .catch((error) => console.log(error));
  };
  const handleClickBackBtn = () => {
    redirect("/pharmacies");
  };

  return (
    <div className="content">
      <div className="add-pharmacy">
      <h2>Add New Pharmacy</h2>
      <TextField fullWidth
        autoComplete="off"
        label="Pharmacy Name"
        variant="outlined"
        name="name"
        value={pharmacy.name}
        onChange={(e) => setPharmacy({ ...pharmacy, name: e.target.value })}
      />
      <TextField fullWidth
        autoComplete="off"
        label="Street"
        variant="outlined"
        name="street"
        value={pharmacy.address.street}
        onChange={(e) =>
          setPharmacy({
            ...pharmacy,
            address: { ...pharmacy.address, street: e.target.value },
          })
        }
      />
      <TextField fullWidth
        autoComplete="off"
        label="City"
        variant="outlined"
        name="city"
        value={pharmacy.address.city}
        onChange={(e) =>
          setPharmacy({
            ...pharmacy,
            address: { ...pharmacy.address, city: e.target.value },
          })
        }
      />
      <FormControl fullWidth>
        <InputLabel>State</InputLabel>
        <Select
          value={pharmacy.address.state}
          label="State"
          onChange={(e) =>
            setPharmacy({
              ...pharmacy,
              address: { ...pharmacy.address, state: e.target.value },
            })
          }
        >
          <MenuItem value="AL">Alabama</MenuItem>
          <MenuItem value="AK">Alaska</MenuItem>
          <MenuItem value="AZ">Arizona</MenuItem>
          <MenuItem value="AR">Arkansas</MenuItem>
          <MenuItem value="CA">California</MenuItem>
          <MenuItem value="CO">Colorado</MenuItem>
          <MenuItem value="ID">Idaho</MenuItem>
          <MenuItem value="NY">New York</MenuItem>
          <MenuItem value="TX">Texas</MenuItem>
          <MenuItem value="WA">Washington</MenuItem>
        </Select>
      </FormControl>
      <TextField fullWidth
        autoComplete="off"
        label="Zip"
        variant="outlined"
        name="zip"
        value={pharmacy.address.zip}
        onChange={(e) =>
          setPharmacy({
            ...pharmacy,
            address: { ...pharmacy.address, zip: e.target.value },
          })
        }
      />
      <div className="btns">
        <Button variant="outlined" color="primary" onClick={handleClickSaveBtn}>
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

export default AddPharmacy;
