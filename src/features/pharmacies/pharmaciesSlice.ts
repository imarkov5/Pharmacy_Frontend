import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPharmacy } from "../../global.types";
import axios from "axios";

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
  async (pharmacyId: number) => {
    const response = await fetch(
      `https://localhost:7137/api/pharmacy/get-pharmacy/${pharmacyId}`,
      {
        method: "GET",
      }
    );
    return (await response.json()) as IPharmacy;
  }
);

export const updatePharmacy = createAsyncThunk<IPharmacy, Partial<IPharmacy>>(
  "pharmacy/updatePharmacy",
  async (initialPartialPharmacy) => {
    const { id } = initialPartialPharmacy;
    try {
      const response = await axios.put(
        `https://localhost:7137/api/pharmacy/update-pharmacy/${id}`,
        initialPartialPharmacy
      );
      return response.data;
    } catch (err: any) {
      return err.message;
    }
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
        state.pharmacies = state.pharmacies.concat(action.payload);
      })
      .addCase(fetchPharmacies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
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
      .addCase(updatePharmacy.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePharmacy.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pharmacies[action.payload.id] = action.payload;
      })
      .addCase(updatePharmacy.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectPharmacyById = (
  state: { pharmacies: { pharmacies: IPharmacy[] } },
  pharmacyId: number
) => state.pharmacies.pharmacies.find((pharmacy) => pharmacy.id === pharmacyId);

//   export const selectAllPharmacies = (state: { pharmacies: { pharmacies: IPharmacy[]; }; }) => state.pharmacies.pharmacies;
//   export const getAllPharmaciesStatus = (state: { pharmacies: { status: any; }; }) => state.pharmacies.status;
//   export const getAllPharmaciesError = (state: { pharmacies: { error: any; }; }) => state.pharmacies.error
export default pharmaciesSlice.reducer;
