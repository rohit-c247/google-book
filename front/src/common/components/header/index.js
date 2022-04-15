import React from "react";
import { Layout, Button } from "antd";
import { logout, getToken } from "../../../Helpers";

const HeaderLayout = () => {
  const { Header } = Layout;
  return (
    <Header className="header">
      <div className="logo" />
      {getToken() ? (
        <Button
          onClick={() => logout()}
          style={{ float: "right", marginTop: "15px" }}
        >
          Logout
        </Button>
      ) : (
        ""
      )}
    </Header>
  );
};
export default HeaderLayout;
