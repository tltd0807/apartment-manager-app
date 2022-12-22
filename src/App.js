import React, { useContext, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Spin } from "antd";
import "./App.css";
import AuthContext from "./store/auth-context";

// import Landing from "./Pages/LandingPage/Landing";
// import UserPage from "./Pages/UserPage/UserPage";
// import AdminPage from "./Pages/AdminPage/AdminPage";
// import SignIn from "./Pages/SignIn/SignIn";
// import NotFound from "./Pages/ErrorPage/NotFound";
// import RequestList from "./Components/Admin/RequestList/RequestList";
// import UnrentList from "./Components/Admin/ApartmentList/UnrentList/UnrentList";
// import UnpaidList from "./Components/Admin/UnpaidList/UnpaidList";
// import ApartmentTable from "./Components/Admin/ApartmentList/ApartmentTable";
// import UserInfo from "./Pages/UserInfo";
// import Bills from "./Pages/UserPage/Bills";
// import RentedPage from "./Pages/UserPage/RentedPage";
// import EmptyApartment from "./Pages/UserPage/EmptyApartment";
// import SignUp from "./Pages/SignUp/SignUp";
// import ApartmentPageNew from "./Pages/ApartmentPage/ApartmentPageNew";

const Landing = React.lazy(() => import("./Pages/LandingPage/Landing"));
const SignIn = React.lazy(() => import("./Pages/SignIn/SignIn"));
const UserPage = React.lazy(() => import("./Pages/UserPage/UserPage"));
const AdminPage = React.lazy(() => import("./Pages/AdminPage/AdminPage"));
const NotFound = React.lazy(() => import("./Pages/ErrorPage/NotFound"));
const RequestList = React.lazy(() =>
  import("./Components/Admin/RequestList/RequestList")
);
const UnrentList = React.lazy(() =>
  import("./Components/Admin/ApartmentList/UnrentList/UnrentList")
);
const UnpaidList = React.lazy(() =>
  import("./Components/Admin/UnpaidList/UnpaidList")
);
const ApartmentTable = React.lazy(() =>
  import("./Components/Admin/ApartmentList/ApartmentTable")
);
const UserInfo = React.lazy(() => import("./Pages/UserInfo"));
const Bills = React.lazy(() => import("./Pages/UserPage/Bills"));
const RentedPage = React.lazy(() => import("./Pages/UserPage/RentedPage"));
const EmptyApartment = React.lazy(() =>
  import("./Pages/UserPage/EmptyApartment")
);
const SignUp = React.lazy(() => import("./Pages/SignUp/SignUp"));
const ApartmentPageNew = React.lazy(() =>
  import("./Pages/ApartmentPage/ApartmentPageNew")
);

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Suspense
      fallback={
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {" "}
          <Spin tip="Loading..." size="large" />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
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
        {authCtx.isLoggedIn && (
          <Route path="/user/info" element={<UserInfo />} />
        )}
        {authCtx.isLoggedIn && (
          <Route path="/user/apartments" element={<EmptyApartment />} />
        )}
        {authCtx.isLoggedIn && <Route path="/user/bills" element={<Bills />} />}
        {authCtx.isLoggedIn && (
          <Route path="/user/rented" element={<RentedPage />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
