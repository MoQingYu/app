import React, { useEffect } from "react";
import { Layout } from "antd"
import Sider from "./Sider";
import Header from "./Header";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "@store/actions/user";
const { Content } = Layout;

type LayoutModal = {
  fetchUser: ()=> void
}

const LayoutBasic: React.FC<LayoutModal> = (props) => {

  useEffect(()=> {
    
  }, [])

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider />
      <Layout>
        <Header />
        <Content>
          
        </Content>
      </Layout>
    </Layout>
  )
}

const mapDispatchToProps = (dispatch)=>(
  bindActionCreators(
    { fetchUser },
    dispatch
  )
)

export default connect(null, mapDispatchToProps)(LayoutBasic);