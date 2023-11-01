export interface IPharmacy {
    id: number;
    name: string;
    numberOfFilledPrescriptions: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
  }
  export interface ICreatePharmacyDto {
    id: number | undefined;
    name: string | undefined;
    address: {
      street: string | undefined;
      city: string | undefined;
      state: string | undefined;
      zip: string | undefined;
    };
  }
  export interface IPrescription {
    id: number;
    patientFirstName: string;
    patientLastName: string;
    drugName: string;
    drugStrength: string;
    dosage: string;
    quantity: string;
    isDispensed: string;
    dispensedDate: string;
    pharmacyId: string;
    pharmacistId: string;
  }
  export interface ICreatePrescriptionDto {
    id: number | undefined;
    patientFirstName: string | undefined;
    patientLastName: string | undefined;
    drugName: string | undefined;
    drugStrength: string | undefined;
    dosage: string | undefined;
    quantity: string | undefined;
    isDispensed: string | undefined;
    pharmacyId: string | undefined;
    pharmacistId: string | null | undefined;
  }
  export interface IPharmacist{
    id: number;
    firstName: string;
    lastName: string;
  }
  export interface ICreatePharmacistDto{
    firstName: string;
    lastName: string;
  }
  