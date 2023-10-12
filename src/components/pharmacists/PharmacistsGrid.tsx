import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid/models";
import { IPharmacist } from "../../global.types";

const column: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "firstName", headerName: "First Name", width: 100 },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 200,
  },
];

interface IPharmacistsGridProps {
  data: IPharmacist[];
}

const PharmacistsGrid = ({ data }: IPharmacistsGridProps) => {
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

export default PharmacistsGrid;
