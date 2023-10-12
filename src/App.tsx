import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.component";
import CustomLinearProgress from "./components/custom-linear-progress/CustomLinearProgress.component";
import Pharmacies from "./pages/pharmacies/Pharmacies.page";
import Pharmacy from "./pages/pharmacies/Pharmacy.page";
import AddPharmacy from "./pages/pharmacies/AddPharmacy.page";
import Prescriptions from "./pages/prescriptions/Prescriptions.page";

// const Pharmacies = lazy(() => import("./pages/pharmacies/Pharmacies.page"));
// const Prescriptions = lazy(
//   () => import("./pages/prescriptions/Prescriptions.page")
// );
const Pharmacists = lazy(() => import("./pages/pharmacists/Pharmacists.page"));
//const AddPharmacy = lazy(() => import("./pages/pharmacies/AddPharmacy.page"));
const AddPrescription = lazy(
  () => import("./pages/prescriptions/AddPrescription.page")
);
const AddPharmacist = lazy(
  () => import("./pages/pharmacists/AddPharmacist.page")
);
// const Pharmacy = lazy(() => import("./pages/pharmacies/Pharmacy.page"));
const Prescription = lazy(
  () => import("./pages/prescriptions/Prescription.page")
);
const UpdatePharmacy = lazy(
  () => import("./pages/pharmacies/UpdatePharmacy.page")
);

function App() {
  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <Suspense fallback={<CustomLinearProgress />}>
          <Routes>
            <Route path="/pharmacies">
              <Route index element={<Pharmacies />} />
              <Route path="add" element={<AddPharmacy />} />
              <Route path=":id" element={<Pharmacy />} />
              <Route path="update/:id" element={<UpdatePharmacy />} />
            </Route>
            <Route path="/prescriptions">
              <Route index element={<Prescriptions />} />
              <Route path="add" element={<AddPrescription />} />
              <Route path=":id" element={<Prescription />} />
            </Route>
            <Route path="/pharmacists">
              <Route index element={<Pharmacists />} />
              <Route path="add" element={<AddPharmacist />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
