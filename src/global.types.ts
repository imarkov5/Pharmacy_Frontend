export interface IPharmacy {
    id: number;
    name: string;
    numberOfFilledPrescriptions: string;
    address: {
      street: string | undefined;
      city: string | undefined;
      state: string | undefined;
      zip: string | undefined;
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
    patientFirstName: string;
    patientLastName: string;
    drugName: string;
    drugStrength: string;
    dosage: string;
    quantity: string;
    isDispensed: string;
    pharmacyId: string;
    pharmacistId: string;
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
  