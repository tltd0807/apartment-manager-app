import React, { useContext } from "react";

import UserHeaderNew from "../../Components/Layout/UserHeader";
import AuthContext from "../../store/auth-context";

const UserPage = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <UserHeaderNew>
      <div
        style={{
          fontSize: "54px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "200px",
        }}
      >
        Welcome {authCtx.userName}
      </div>
    </UserHeaderNew>
  );
};

export default UserPage;
