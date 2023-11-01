import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid/models";
import moment from "moment";
import { IPrescription } from "../global.types";

const column: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "patientFirstName", headerName: "First Name", width: 100 },
  {
    field: "patientLastName",
    headerName: "Last Name",
    width: 200,
  },
  {
    field: "drugName",
    headerName: "Drug Name",
    width: 200,
  },

  {
    field: "drugStrength",
    headerName: "Drug Strength",
    width: 200,
  },
  {
    field: "dosage",
    headerName: "Dosage",
    width: 200,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 200,
  },
  {
    field: "isDispensed",
    headerName: "Is Dispensed",
    width: 100,
    renderCell: (params) => (params.value == "0" ? "No" : "Yes"),
  },
  {
    field: "dispensedDate",
    headerName: "Dispensed Date",
    width: 200,
    renderCell: (params) =>
      params.value === null
        ? ""
        : moment(params.row.dispensedDate).format("YYYY-MM-DD"),
  },
  {
    field: "pharmacyId",
    headerName: "Pharmacy Id",
    width: 100,
  },
  {
    field: "pharmacistId",
    headerName: "Pharmacist Id",
    width: 100,
  },
  {
    field: "action",
    headerName: "Actions",
    sortable: false,
    width: 200,
    renderCell: (params) => (
      <div>
        <Button variant="outlined" color="primary">
          <a href={`prescriptions/${params.row.id}`}>View</a>
        </Button>
        {/* <Button variant="outlined" color="secondary">
          <a href={`prescriptions/update/${params.row.id}`}>Update</a>
        </Button> */}
      </div>
    ),
  },
];

interface IPrescriptionsGridProps {
  data: IPrescription[];
}

const PrescriptionsGrid = ({ data }: IPrescriptionsGridProps) => {
  return (
    <Box sx={{ width: "100%", height: 450 }} className="jobs-grid">
      <DataGrid
        rows={data}
        columns={column}
        getRowId={(row) => row.id}
        rowHeight={50}
      />
    </Box>
  );
};

export default PrescriptionsGrid;
