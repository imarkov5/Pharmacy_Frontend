import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.component";
import CustomLinearProgress from "./components/custom-linear-progress/CustomLinearProgress.component";

const Pharmacies = lazy(() => import("./pages/pharmacies/Pharmacies.page"));
const Prescriptions = lazy(() => import("./pages/prescriptions/Prescriptions.page"));
const Pharmacists = lazy(() => import("./pages/pharmacists/Pharmacists.page"));
const AddPharmacy = lazy(() => import("./pages/pharmacies/AddPharmacy.page"));
const AddPrescription = lazy(() => import("./pages/prescriptions/AddPrescription.page"));

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
            </Route>
            <Route path="/prescriptions">
              <Route index element={<Prescriptions />} />
              <Route path="add" element={<AddPrescription />} />
            </Route>
            <Route path="/pharmacists">
              <Route index element={<Pharmacists />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
