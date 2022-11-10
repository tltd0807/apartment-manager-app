import { useState } from "react";
import { useLocation } from "react-router-dom";
import Nav from "../../Components/Layout/Navigation/Nav";
import classes from "./AdminPage.module.css";

const AdminPage = (props) => {
  const { activeTab, setActiveTab } = useState(0);
  const { state } = useLocation();
  // const { username, avatarUrl } = state; // Read values passed on state

  const onClickHandler = (number) => {
    setActiveTab(number);
  };
  return (
    <main className={classes["admin-container"]}>
      <Nav onClick={onClickHandler} activeTab={activeTab} userInfo={state} />
      <section className={classes["admin-section"]}>
        {activeTab !== 0 && <h1>Welcome {state.username}</h1>}
      </section>
    </main>
  );
};

export default AdminPage;
