import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Layout, Menu, Modal } from "antd";
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
const { Footer, Sider, Content } = Layout;

const LayoutAuthenticated = (props) => {
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
  const LogoutHandler = () => {
    showModal();
  };
  const { state } = useLocation();
  const navItem = [
    {
      label: "Admin",
      to: "/admin",
    },
    {
      label: "Apartment List",
      to: "/admin/apartments",
    },
    {
      label: "Request List",
      to: "/admin/request",
    },
    {
      label: "Unrent List",
      to: "/admin/unrent",
    },
    {
      label: "Unpaid List",
      to: "/admin/unpaid",
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
      {" "}
      <Modal
        title="Thoát"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn muốn đăng xuất ?</p>
      </Modal>{" "}
      <Layout style={{ minHeight: "100vh" }}>
        <Sider style={{ background: "white" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              marginTop: "20px",
              marginLeft: "10px",
            }}
          >
            <Avatar size={34} icon={<UserOutlined />} src={authCtx.avatarUrl} />
            <span style={{ marginLeft: "10px" }}>{authCtx.userName}</span>
          </div>
          <Menu
            defaultSelectedKeys={[state?.position || "0"]}
            mode="inline"
            style={{
              marginTop: "20px",
            }}
            onClick={(e) => {
              navigate(navItem[e.key].to, { state: { position: e.key } });
            }}
            items={items}
          />
          <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            <Button
              shape="round"
              block
              danger
              style={{ marginTop: "10px" }}
              onClick={LogoutHandler}
            >
              Logout
            </Button>
          </div>
        </Sider>
        <Layout>
          <Content style={{ padding: "40px 50px" }}>{props.children}</Content>
          {/* <Footer>Footer</Footer> */}
        </Layout>
      </Layout>
    </>
  );
};

export default LayoutAuthenticated;
