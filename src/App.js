import "./App.css";
import Landing from "./Pages/LandingPage/Landing";
import UserPage from "./Pages/UserPage/UserPage";
import AdminPage from "./Pages/AdminPage/AdminPage";
import SignIn from "./Pages/SignIn/SignIn";
import { Route, Routes } from "react-router-dom";
import NotFound from "./Pages/ErrorPage/NotFound";
import ApartmentPage from "./Pages/ApartmentPage/ApartmentPage";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import ApartmentList from "./Components/Admin/ApartmentList/ApartmentList";
import RequestList from "./Components/Admin/RequestList/RequestList";
import UnrentList from "./Components/Admin/ApartmentList/UnrentList/UnrentList";
import UnpaidList from "./Components/Admin/UnpaidList/UnpaidList";
function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/apartment" element={<ApartmentPage />} />
      {authCtx.isLoggedIn && <Route path="/admin" element={<AdminPage />} />}
      {authCtx.isLoggedIn && (
        <Route path="/admin/apartments" element={<ApartmentList />} />
      )}
      {authCtx.isLoggedIn && (
        <Route path="/admin/unpaid" element={<RequestList />} />
      )}
      {authCtx.isLoggedIn && (
        <Route path="/admin/unrent" element={<UnrentList />} />
      )}
      {authCtx.isLoggedIn && (
        <Route path="/admin/request" element={<UnpaidList />} />
      )}
      {authCtx.isLoggedIn && (
        <Route path="/admin/user" element={<UserPage />} />
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
