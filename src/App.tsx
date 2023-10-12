import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import CustomLinearProgress from "./components/custom-linear-progress/CustomLinearProgress";
import Pharmacies from "./pages/pharmacies/Pharmacies";
import Pharmacy from "./pages/pharmacies/Pharmacy";
import AddPharmacy from "./pages/pharmacies/AddPharmacy";
import Prescriptions from "./pages/prescriptions/Prescriptions";

// const Pharmacies = lazy(() => import("./pages/pharmacies/Pharmacies.page"));
// const Prescriptions = lazy(
//   () => import("./pages/prescriptions/Prescriptions.page")
// );
const Pharmacists = lazy(() => import("./pages/pharmacists/Pharmacists"));
//const AddPharmacy = lazy(() => import("./pages/pharmacies/AddPharmacy.page"));
const AddPrescription = lazy(
  () => import("./pages/prescriptions/AddPrescription")
);
const AddPharmacist = lazy(
  () => import("./pages/pharmacists/AddPharmacist")
);
// const Pharmacy = lazy(() => import("./pages/pharmacies/Pharmacy.page"));
const Prescription = lazy(
  () => import("./pages/prescriptions/Prescription")
);
const UpdatePharmacy = lazy(
  () => import("./pages/pharmacies/UpdatePharmacy")
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
