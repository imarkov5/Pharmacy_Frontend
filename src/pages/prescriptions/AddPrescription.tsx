import { useState } from "react";
import "./prescriptions.scss";
import { ICreatePrescriptionDto } from "../../global.types";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  useAddPrescriptionMutation,
  useGetAllPharmaciesQuery,
  useGetAllPharmacistsQuery,
} from "../../features/apiSlice";

const AddPrescription = () => {
  const [prescription, setPrescription] = useState<ICreatePrescriptionDto>({
    id: undefined,
    patientFirstName: "",
    patientLastName: "",
    drugName: "",
    drugStrength: "",
    dosage: "",
    quantity: "",
    isDispensed: "0",
    pharmacyId: "",
    pharmacistId: null,
  });

  const [addPrescription] = useAddPrescriptionMutation();
  const { data: pharmacies } = useGetAllPharmaciesQuery();
  const { data: pharmacists } = useGetAllPharmacistsQuery();
  const redirect = useNavigate();

  const handleClickSaveBtn = () => {
    if (
      prescription.patientFirstName === "" ||
      prescription.patientLastName === "" ||
      prescription.drugName === "" ||
      prescription.drugStrength === "" ||
      prescription.dosage === "" ||
      prescription.quantity === "" ||
      // prescription.isDispensed === "" ||
      prescription.pharmacyId === ""
    ) {
      alert("Fill out all fields");
      return;
    }
    addPrescription(prescription);
    redirect("/prescriptions/");
  };
  const handleClickBackBtn = () => {
    redirect("/prescriptions");
  };

  return (
    <div className="content">
      <div className="add-prescription">
        <h2>Add New Prescription</h2>
        <TextField
          fullWidth
          autoComplete="off"
          label="Patient First Name"
          variant="outlined"
          name="patientFirstName"
          value={prescription.patientFirstName}
          onChange={(e) =>
            setPrescription({
              ...prescription,
              patientFirstName: e.target.value,
            })
          }
        />
        <TextField
          fullWidth
          autoComplete="off"
          label="Patient Last Name"
          variant="outlined"
          name="patientLastName"
          value={prescription.patientLastName}
          onChange={(e) =>
            setPrescription({
              ...prescription,
              patientLastName: e.target.value,
            })
          }
        />
        <TextField
          fullWidth
          autoComplete="off"
          label="Drug Name"
          variant="outlined"
          name="drugName"
          value={prescription.drugName}
          onChange={(e) =>
            setPrescription({ ...prescription, drugName: e.target.value })
          }
        />
        <TextField
          fullWidth
          autoComplete="off"
          label="Drug Strength"
          variant="outlined"
          name="drugStrength"
          value={prescription.drugStrength}
          onChange={(e) =>
            setPrescription({ ...prescription, drugStrength: e.target.value })
          }
        />
        <TextField
          fullWidth
          autoComplete="off"
          label="Dosage"
          variant="outlined"
          name="dosage"
          value={prescription.dosage}
          onChange={(e) =>
            setPrescription({ ...prescription, dosage: e.target.value })
          }
        />
        <TextField
          fullWidth
          autoComplete="off"
          label="Quantity"
          variant="outlined"
          name="quantity"
          value={prescription.quantity}
          onChange={(e) =>
            setPrescription({ ...prescription, quantity: e.target.value })
          }
        />

        <FormControl fullWidth>
          <InputLabel>Pharmacy</InputLabel>
          <Select
            value={prescription.pharmacyId}
            label="Pharmacy"
            onChange={(e) =>
              setPrescription({
                ...prescription,
                pharmacyId: e.target.value,
              })
            }
          >
            {pharmacies?.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* <FormControl fullWidth>
          <InputLabel>Is Dispensed</InputLabel>
          <Select
            value={prescription.isDispensed}
            label="Is Dispensed"
            onChange={(e) =>
              setPrescription({
                ...prescription,
                isDispensed: e.target.value,
              })
            }
          >
            <MenuItem value="0">No</MenuItem>
            <MenuItem value="1">Yes</MenuItem>
          </Select>
        </FormControl> */}

        {/* <FormControl fullWidth>
          <InputLabel>Pharmacist</InputLabel>
          <Select
            value={prescription.pharmacistId}
            label="Pharmacist"
            onChange={(e) =>
              setPrescription({
                ...prescription,
                pharmacistId: e.target.value,
              })
            }
          >
            {pharmacists?.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.firstName + " " + item.lastName}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}

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

export default AddPrescription;
