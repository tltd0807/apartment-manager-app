import React from "react";
import classes from "./UserHeader.module.css";
import { Avatar, Button, Layout, Menu, Modal } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useState } from "react";
import { UserOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;
const UserHeaderNew = (props) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    authCtx.logout();
    navigate("/");
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { state } = useLocation();
  const navItem = [
    {
      label: "Thông tin",
      to: "/user/info",
    },
    {
      label: "Căn hộ trống",
      to: "/user/apartments",
    },
    {
      label: "Hóa đơn",
      to: "/user/bills",
    },
    {
      label: "Căn hộ đang thuê",
      to: "/user/rented",
    },
  ];
  const getItem = (label, key) => {
    return {
      key,
      label,
    };
  };
  const items = navItem.map((item, index) =>
    getItem(item.label, index.toString())
  );
  return (
    <>
      <Modal
        title="Thoát"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn muốn đăng xuất ?</p>
      </Modal>
      <Layout className={classes.layout}>
        <Header className={classes.header}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              marginLeft: "10px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            <Avatar size={45} icon={<UserOutlined />} src={authCtx.avatarUrl} />
            <span style={{ marginLeft: "10px" }}>{authCtx.userName}</span>
          </div>
          <Menu
            style={{ minWidth: 0, flex: "auto", justifyContent: "center" }}
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[state?.position || "-1"]}
            onClick={(e) => {
              navigate(navItem[e.key].to, { state: { position: e.key } });
            }}
            items={items}
          />
          <Button onClick={() => showModal()}>Đăng xuất</Button>
        </Header>
        <Content
          style={{
            padding: "0 50px",
          }}
        >
          <div className="site-layout-content">{props.children}</div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          <div
            style={{
              textAlign: "center",
              margin: "auto",
            }}
          >
            Develop by To Dat &amp; Gia Minh 2022
          </div>
        </Footer>
      </Layout>
    </>
  );
};
export default UserHeaderNew;
