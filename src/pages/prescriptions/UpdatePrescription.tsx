import { useState, useEffect } from "react";
import "./prescriptions.scss";
import { ICreatePrescriptionDto, IPrescription } from "../../global.types";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAllPharmaciesQuery,
  useGetAllPharmacistsQuery,
  useGetPharmacyByIdQuery,
  useUpdatePrescriptionMutation,
} from "../../features/apiSlice";
import httpModule from "../../http.module";

const UpdatePrescription = () => {
  const [prescription, setPrescription] = useState<ICreatePrescriptionDto>({
    patientFirstName: "",
    patientLastName: "",
    drugName: "",
    drugStrength: "",
    dosage: "",
    quantity: "",
    isDispensed: "",
    pharmacyId: "",
    pharmacistId: "",
  });
  const { id } = useParams();
  const redirect = useNavigate();

  const [updatePrescription] = useUpdatePrescriptionMutation();
  const { data: pharmacy } = useGetPharmacyByIdQuery(prescription?.pharmacyId);
  const { data: pharmacists } = useGetAllPharmacistsQuery();

  useEffect(() => {
    httpModule
      .get<IPrescription>(`/Prescription/get-prescription/${id}`)
      .then((response) => {
        setPrescription(response.data);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
      });
  }, []);

  const handleClickSaveBtn = () => {
    if (prescription.isDispensed == "1" && prescription.pharmacistId == "") {
      alert(
        "If prescription is dispensed, the pharmacist field can't be empty"
      );
      return;
    }
    updatePrescription(prescription);
    redirect(`/prescriptions/${id}`);
  };
  const handleClickBackBtn = () => {
    redirect("/prescriptions");
  };

  return (
    <div className="content">
      <div className="add-prescription">
        <h2>Update Prescription #{id}</h2>
        <TextField
          fullWidth
          autoComplete="off"
          label="Patient First Name"
          variant="filled"
          name="patientFirstName"
          value={prescription.patientFirstName}
        />
        <TextField
          fullWidth
          autoComplete="off"
          label="Patient Last Name"
          variant="filled"
          name="patientLastName"
          value={prescription.patientLastName}
        />
        <TextField
          fullWidth
          autoComplete="off"
          label="Drug Name"
          variant="filled"
          name="drugName"
          value={prescription.drugName}
        />
        <TextField
          fullWidth
          autoComplete="off"
          label="Drug Strength"
          variant="filled"
          name="drugStrength"
          value={prescription.drugStrength}
        />
        <TextField
          fullWidth
          autoComplete="off"
          label="Dosage"
          variant="filled"
          name="dosage"
          value={prescription.dosage}
        />
        <TextField
          fullWidth
          autoComplete="off"
          label="Quantity"
          variant="filled"
          name="quantity"
          value={prescription.quantity}
        />
        <TextField
          fullWidth
          autoComplete="off"
          label="Pharmacy"
          variant="filled"
          name="pharmacy"
          value={pharmacy?.name}
        />
        <FormControl fullWidth>
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
        </FormControl>

        <FormControl fullWidth>
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
        </FormControl>

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

export default UpdatePrescription;
