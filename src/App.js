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
import RequestList from "./Components/Admin/RequestList/RequestList";
import UnrentList from "./Components/Admin/ApartmentList/UnrentList/UnrentList";
import UnpaidList from "./Components/Admin/UnpaidList/UnpaidList";
import ApartmentTable from "./Components/Admin/ApartmentList/ApartmentTable";
import UserInfo from "./Pages/UserInfo";
import Bills from "./Pages/UserPage/Bills";
import RentedPage from "./Pages/UserPage/RentedPage";
import EmptyApartment from "./Pages/UserPage/EmptyApartment";
import SignUp from "./Pages/SignUp/SignUp";
import ApartmentPageNew from "./Pages/ApartmentPage/ApartmentPageNew";
function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/apartmentOld" element={<ApartmentPage />} />
      <Route path="/apartment" element={<ApartmentPageNew />} />
      {authCtx.isLoggedIn && <Route path="/admin" element={<AdminPage />} />}
      {authCtx.isLoggedIn && (
        <Route path="/admin/apartments" element={<ApartmentTable />} />
      )}

      {authCtx.isLoggedIn && (
        <Route path="/admin/request" element={<RequestList />} />
      )}
      {authCtx.isLoggedIn && (
        <Route path="/admin/unrent" element={<UnrentList />} />
      )}
      {authCtx.isLoggedIn && (
        <Route path="/admin/unpaid" element={<UnpaidList />} />
      )}
      {authCtx.isLoggedIn && <Route path="/user" element={<UserPage />} />}
      {authCtx.isLoggedIn && <Route path="/user/info" element={<UserInfo />} />}
      {authCtx.isLoggedIn && (
        <Route path="/user/apartments" element={<EmptyApartment />} />
      )}
      {authCtx.isLoggedIn && <Route path="/user/bills" element={<Bills />} />}
      {authCtx.isLoggedIn && (
        <Route path="/user/rented" element={<RentedPage />} />
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
