import React, { useContext } from "react";
import LayoutAuthenticated from "../../Components/Layout/LayoutAuthenticated";
import AuthContext from "../../store/auth-context";

const AdminPage = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <LayoutAuthenticated>
      <section>Welcome {authCtx.userName}</section>
    </LayoutAuthenticated>
  );
};

export default AdminPage;
