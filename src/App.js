import "./App.css";
import Landing from "./Pages/LandingPage/Landing";
import UserPage from "./Pages/UserPage/UserPage";
import AdminPage from "./Pages/AdminPage/AdminPage";
import SignIn from "./Pages/SignIn/SignIn";
import { Route, Routes } from "react-router-dom";
import NotFound from "./Pages/ErrorPage/NotFound";
import ApartmentPage from "./Pages/ApartmentPage/ApartmentPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/apartment" element={<ApartmentPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
