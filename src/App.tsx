import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.component";
import CustomLinearProgress from "./components/custom-linear-progress/CustomLinearProgress.component";

const Pharmacies = lazy(() => import("./pharmacies/Pharmacies.page"));

function App() {
  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <Suspense fallback={<CustomLinearProgress />}>
          <Routes>
            <Route path="/pharmacies">
              <Route index element={<Pharmacies />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
