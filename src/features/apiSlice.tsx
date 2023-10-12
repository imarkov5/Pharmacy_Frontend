import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPharmacy, IPrescription } from "../global.types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7137/api/" }),
  tagTypes: ["Pharmacies", "Prescriptions"],

  endpoints: (builder) => ({
    getAllPharmacies: builder.query<IPharmacy[], string | void>({
      query: () => "pharmacy/get-all-pharmacies",
      providesTags: ["Pharmacies"],
    }),

    getAllPrescriptions: builder.query<IPrescription[], string | void>({
      query: () => "prescription/get-all-prescriptions",
      providesTags: ["Prescriptions"],
    }),

    getPharmacyById: builder.query<IPharmacy, string | void>({
      query: (id) => `pharmacy/get-pharmacy/${id}`,
      providesTags: ["Pharmacies"],
    }),

    addPharmacy: builder.mutation({
      query: (pharmacy) => ({
        url: "pharmacy/add-pharmacy",
        method: "POST",
        body: pharmacy,
      }),
      invalidatesTags: ["Pharmacies"],
    }),
    updatePharmacy: builder.mutation({
      query: (pharmacy) => ({
        url: `pharmacy/update-pharmacy/${pharmacy.id}`,
        method: "PUT",
        body: pharmacy,
      }),
      invalidatesTags: ["Pharmacies"],
    }),
    deletePharmacy: builder.mutation({
      query: ({ id }) => ({
        url: `pharmacy/delete-pharmacy/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Pharmacies"],
    }),
  }),
});
export const {
  useGetAllPharmaciesQuery,
  useGetAllPrescriptionsQuery,
  useGetPharmacyByIdQuery,
  useAddPharmacyMutation,
  useUpdatePharmacyMutation,
  useDeletePharmacyMutation,
} = apiSlice;
