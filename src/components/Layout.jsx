import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu, Space, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Bookmark,
  ChevronDown,
  CircleAlert,
  LogOut,
  Trash,
} from "lucide-react";
const { Header, Sider, Content } = Layout;
const AppLayout = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  // Handle sign-out action
  const handleSignOut = () => {
    // Perform any necessary cleanup (e.g., clear tokens, user data, etc.)
    // Then redirect to the login page
    navigate("/"); // Redirect to login page
  };
  const items = [
    {
      label: (
        <>
          <Space>
            <LogOut />
            SignOut
          </Space>
        </>
      ),
      key: "1",
      onClick: () => handleSignOut(),
    },
  ];
  return (
    <Layout className="">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="md"
        className={collapsed ? "sider-collapsed" : "sider-expanded"}
        style={{
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 1,
          overflowY: "auto",
          backgroundColor: "#4f39f6",
        }}
      >
        <div
          style={{
            color: "#fff",
            fontSize: `${collapsed ? "10px" : "18px"}`,
            fontWeight: "bold",
            padding: "16px",
            textAlign: "center",
            // backgroundColor: "#001529",
            whiteSpace: "normal",
            wordBreak: "break-word",
            backgroundColor: "#4f39f6", // 👈 logo section bg
          }}
        >
          <img
            alt="Your Company"
            src="/logo.png"
            className="mx-auto h-20 w-auto"
          />
        </div>
        <Menu
          //   theme="dark"
          style={{ backgroundColor: "#4f39f6" }}
          className="custom-menu" // Add a custom class here
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <Bookmark />,
              label: "Bookmarks",
            },
            {
              key: "2",
              icon: <CircleAlert />,
              label: "Error",
            },
            {
              key: "3",
              icon: <Trash />,
              label: "Trash",
            },
          ]}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 250 }}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
        >
          <div className="flex justify-between space-x-2 mx-2">
            <div className="flex items-center space-x-2">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                className="ml-2 mt-3 no-focus-outline !bg-white"
              />
              {/* <div className="font-bold uppercase">
              {`${getRouteTitle(location.pathname)}  ${id ? id : ""}`}
            </div> */}
            </div>
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <div className="flex items-center gap-2 ">
                <Avatar style={{ backgroundColor: "#4f39f6" }}>MH</Avatar>
                <div>Mubashir Hussan</div>
                <ChevronDown className=" cursor-pointer" />
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            scrollBehavior: "auto",
          }}
        >
          <div className="h-full">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default AppLayout;
