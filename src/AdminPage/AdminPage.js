import Nav from "./Navigation/Nav";
import classes from "./AdminPage.module.css";

const AdminPage = (props) => {
  return (
    <main className={classes["admin-container"]}>
      <Nav></Nav>
      <section className={classes["admin-section"]}>
        <h1>Welcome to admin Page</h1>
      </section>
    </main>
  );
};

export default AdminPage;
