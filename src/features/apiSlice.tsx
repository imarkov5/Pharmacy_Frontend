import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPharmacist, IPharmacy, IPrescription } from "../global.types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7137/api/" }),
  tagTypes: ["Pharmacies", "Prescriptions", "Pharmacists"],

  endpoints: (builder) => ({
    getAllPharmacies: builder.query<IPharmacy[], string | void>({
      query: () => "pharmacy/get-all-pharmacies",
      providesTags: ["Pharmacies"],
    }),

    getAllPrescriptions: builder.query<IPrescription[], string | void>({
      query: () => "prescription/get-all-prescriptions",
      providesTags: ["Prescriptions"],
    }),

    getAllPharmacists: builder.query<IPharmacist[], string | void>({
      query: () => "pharmacist/get-all-pharmacists",
      providesTags: ["Pharmacists"],
    }),

    getPharmacyById: builder.query<IPharmacy, string | void>({
      query: (id) => `pharmacy/get-pharmacy/${id}`,
      providesTags: ["Pharmacies"],
    }),
    getPrescriptionById: builder.query<IPrescription, string | void>({
      query: (id) => `prescription/get-prescription/${id}`,
      providesTags: ["Prescriptions"],
    }),
    getPharmacistById: builder.query<IPharmacist, string | void>({
      query: (id) => `pharmacist/get-pharmacist/${id}`,
      providesTags: ["Pharmacists"],
    }),

    addPharmacy: builder.mutation({
      query: (pharmacy) => ({
        url: "pharmacy/add-pharmacy",
        method: "POST",
        body: pharmacy,
      }),
      invalidatesTags: ["Pharmacies"],
    }),
    addPrescription: builder.mutation({
      query: (prescription) => ({
        url: "prescription/add-prescription",
        method: "POST",
        body: prescription,
      }),
      invalidatesTags: ["Prescriptions"],
    }),
    addPharmacist: builder.mutation({
      query: (pharmacist) => ({
        url: "pharmacist/add-pharmacist",
        method: "POST",
        body: pharmacist,
      }),
      invalidatesTags: ["Pharmacists"],
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
  useGetAllPharmacistsQuery,
  useGetPharmacyByIdQuery,
  useGetPrescriptionByIdQuery,
  useGetPharmacistByIdQuery,
  useAddPharmacyMutation,
  useAddPrescriptionMutation,
  useAddPharmacistMutation,
  useUpdatePharmacyMutation,
  useDeletePharmacyMutation,
} = apiSlice;
