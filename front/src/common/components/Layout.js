import React from "react";
import { Layout as Layouts } from "antd";
import FooterLayout from "./footer/index";
import HeaderLayout from "./header";
import "../../assets/style.css";

const Layout = (props) => {
  const { Content } = Layouts;

  return (
    <Layouts className="layout">
      <HeaderLayout />
      <Content>
        <div className="site-layout-content">
          <>{props.children}</>
        </div>
      </Content>
      <FooterLayout />
    </Layouts>
  );
};

export default Layout;
