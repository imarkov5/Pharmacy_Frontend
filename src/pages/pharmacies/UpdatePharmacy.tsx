import { useEffect, useState } from "react";
import "./pharmacies.scss";
import { ICreatePharmacyDto, IPharmacy } from "../../global.types";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import httpModule from "../../http.module";
import { useAppDispatch, useAppSelector } from "../../app/storeHooks";
import {
  fetchPharmacyById,
  selectPharmacyById,
  updatePharmacy,
} from "../../features/pharmacies/pharmaciesSlice";

const UpdatePharmacy = () => {
  const { id } = useParams();
  const pharmacyId = Number(id);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const pharmacyDB = useAppSelector((state) =>
    selectPharmacyById(state, pharmacyId)
  );
  const pharmacyStatus = useAppSelector((state) => state.pharmacies.status);

  useEffect(() => {
    if (pharmacyStatus === "idle") {
      dispatch(fetchPharmacyById(Number(id)));
    }
  }, [pharmacyStatus, dispatch]);

  const [pharmacy, setPharmacy] = useState<ICreatePharmacyDto>({
    name: pharmacyDB?.name,
    address: {
      street: pharmacyDB?.address.street,
      city: pharmacyDB?.address.city,
      state: pharmacyDB?.address.state,
      zip: pharmacyDB?.address.zip,
    },
  });

  const [requestStatus, setRequestStatus] = useState("idle");
  const canSave = [pharmacy].every(Boolean) && requestStatus === "idle";

  useEffect(() => {
    httpModule
      .get<IPharmacy>(`/Pharmacy/get-pharmacy/${id}`)
      .then((response) => {
        setPharmacy(response.data);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
      });
  }, []);

  const handleClickSaveBtn = async () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        await dispatch(updatePharmacy(pharmacy)).unwrap();
        setPharmacy({
          name: "",
          address: {
            street: "",
            city: "",
            state: "",
            zip: "",
          },
        });
        navigate(`/pharmacies/${id}`);
        navigate(0);
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const handleClickBackBtn = () => {
    navigate("/pharmacies");
    navigate(0);
  };

  return (
    <div className="content">
      <div className="add-pharmacy">
        <h2>Update Pharmacy #{id}</h2>
        <TextField
          fullWidth
          autoComplete="off"
          label="Pharmacy Name"
          variant="outlined"
          name="name"
          value={pharmacy.name}
          onChange={(e) => setPharmacy({ ...pharmacy, name: e.target.value })}
        />
        <TextField
          fullWidth
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
        <TextField
          fullWidth
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
        <TextField
          fullWidth
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

export default UpdatePharmacy;
