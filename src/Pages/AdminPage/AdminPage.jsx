import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import LayoutAuthenticated from "../../Components/Layout/LayoutAuthenticated";
import Nav from "../../Components/Layout/Navigation/Nav";
import classes from "./AdminPage.module.css";

const AdminPage = (props) => {
  const [activeTab, setActiveTab] = useState(0);

  const { state } = useLocation();
  console.log("useLocation: ", useLocation());
  console.log("state: ", state);

  const onClickHandler = (number) => {
    setActiveTab(number);
  };

  // 1 là apartment list, 2 là rent, 3 là user
  return (
    <LayoutAuthenticated>
      {/* <main className={classes["admin-container"]}>
        <Nav
          onClickFocus={onClickHandler}
          activeTab={activeTab}
          userInfo={state}
        />
        <section className={classes["admin-section"]}>
          {activeTab === 0 && <h1>Welcome {state.username}</h1>}
          {activeTab === 1 && <ApartmentList />}
          {activeTab === 2 && <RequestList />}
          {activeTab === 3 && <UnrentList />}
          {activeTab === 4 && <UnpaidList />}
        </section>
      </main> */}
      <section>Welcome</section>
    </LayoutAuthenticated>
  );
};

export default AdminPage;
