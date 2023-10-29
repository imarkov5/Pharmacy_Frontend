import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPharmacy } from "../../global.types";

interface PharmacyState {
  pharmacies: IPharmacy[];
  status: string;
  error: string | null | undefined;
}

const initialState: PharmacyState = {
  pharmacies: [],
  status: "idle",
  error: null,
};

export const fetchPharmacies = createAsyncThunk(
  "pharmacies/fetchPharmacies",
  async () => {
    const response = await fetch(
      "https://localhost:7137/api/pharmacy/get-all-pharmacies",
      { method: "GET" }
    );
    const data = response.json();
    return data;
  }
);

export const fetchPharmacyById = createAsyncThunk(
  "pharmacy/fetchPharmacyById",
  async (pharmacyId : number) => {
    const response = await fetch(
      `https://localhost:7137/api/pharmacy/get-pharmacy/${pharmacyId}`,
      {
        method: "GET",
      }
    );
    return (await response.json()) as IPharmacy;
  }
);

const pharmaciesSlice = createSlice({
    name: "pharmacies",
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(fetchPharmacies.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchPharmacies.fulfilled, (state, action) => {
          state.status = "succeeded";
          // Add any fetched posts to the array
          state.pharmacies = state.pharmacies.concat(action.payload);
        })
        .addCase(fetchPharmacies.rejected, (state) => {
          state.status = "failed";
          //state.error = action.error.message;
        })
        .addCase(fetchPharmacyById.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchPharmacyById.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.pharmacies = state.pharmacies.concat(action.payload);
        })
        .addCase(fetchPharmacyById.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        })
        
    },
  });

  export const selectPostById = (state: { pharmacies: { pharmacies: IPharmacy[]; }; }, pharmacyId: number) => state.pharmacies.pharmacies.find(pharmacy => pharmacy.id === pharmacyId)
  
//   export const selectAllPharmacies = (state: { pharmacies: { pharmacies: IPharmacy[]; }; }) => state.pharmacies.pharmacies;
//   export const getAllPharmaciesStatus = (state: { pharmacies: { status: any; }; }) => state.pharmacies.status;
//   export const getAllPharmaciesError = (state: { pharmacies: { error: any; }; }) => state.pharmacies.error
  export default pharmaciesSlice.reducer;

  
  
