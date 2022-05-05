import React from "react";
import { Layout, Nav } from "@douyinfe/semi-ui";
import "./Layout.less";
import { IconSetting, IconStar, IconUser } from "@douyinfe/semi-icons";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const LayoutContainer = () => {
    const { Header, Footer, Sider, Content } = Layout;
    const navigate = useNavigate();

    const gotoPage = ({ itemKey }) => {
        navigate("/admin/account")
    }

    return (
        <Layout className="admin-layout">
            <Sider className="navigation-wrapper">
                <Nav
                    className="navigation-container"
                    bodyStyle={{ height: 320 }}
                    items={[
                        {
                            itemKey: "account",
                            text: "账号管理",
                            icon: <IconUser />,
                        },
                        {
                            itemKey: "union",
                            text: "公会中心",
                            icon: <IconStar />,
                        },
                        {
                            text: "任务平台",
                            icon: <IconSetting />,
                            itemKey: "job",
                            items: ["任务管理", "用户任务查询"],
                        },
                    ]}
                    onSelect={gotoPage}
                />
            </Sider>
            <Layout className="admin-layout-main">
                <Header>
                    <div className="header">header</div>
                </Header>
                <Content>
                    <Outlet></Outlet>
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutContainer;
