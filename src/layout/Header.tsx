import React from "react";
import { Layout } from "antd"
const { Header } = Layout;


const BasicHeader: React.FC<any> = () => {

  return (
    <Header className="site-layout-background" style={{ padding: 0 }} />
  )
}

export default BasicHeader;