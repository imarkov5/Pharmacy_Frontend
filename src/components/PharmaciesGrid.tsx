import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid/models";
import moment from "moment";
import { IPharmacy } from "../global.types";

const column: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },
  { field: "name", headerName: "Name", width: 200 },
  {
    field: "numberOfFilledPrescriptions",
    headerName: "# Of Filled RX",
    width: 100,
  },
  {
    field: "address",
    headerName: "Address",
    width: 500,
    renderCell: (params) => {
      return (
        <>
          <div>
            {params.value.street}, {params.value.city}, {params.value.state}{" "}
            {params.value.zip}
          </div>
        </>
      );
    },
  },

  {
    field: "createdDate",
    headerName: "Created Date",
    width: 200,
    renderCell: (params) => moment(params.row.createdDate).format("YYYY-MM-DD"),
  },
  {
    field: "updatedDate",
    headerName: "Updated Date",
    width: 200,
    renderCell: (params) => moment(params.row.updatedDate).format("YYYY-MM-DD"),
  },
  {
    field: "action",
    headerName: "Actions",
    sortable: false,
    width: 200,
    renderCell: (params) => (
      <div>
        <Button variant="outlined" color="primary">
          <a href={`pharmacies/${params.row.id}`}>View</a>
        </Button>
        {/* <Button variant="outlined" color="secondary">
          <a href={`pharmacies/update/${params.row.id}`}>Update</a>
        </Button> */}
      </div>
    ),
  },
];

interface IPharmaciesGridProps {
  data: IPharmacy[];
}

const PharmaciesGrid = ({ data }: IPharmaciesGridProps) => {
  return (
    <Box sx={{ width: "100%", height: 450 }} className="companies-grid">
      <DataGrid
        rows={data}
        columns={column}
        getRowId={(row) => row.id}
        rowHeight={50}
      />
    </Box>
  );
};

export default PharmaciesGrid;
