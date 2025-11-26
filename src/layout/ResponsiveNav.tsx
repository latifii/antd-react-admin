import React, { Suspense, useEffect, useState } from "react";
import { Divider, Layout, Menu, MenuProps, theme } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { scrollToTop } from "../utils/helpers";
import { useAppSelector } from "../redux/store";
import SuspenseLoading from "../components/Loading/SuspenseLoading";
import { menuData } from "../data/route";

const { Sider } = Layout;

const ResponsiveNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    token: { colorBgLayout, colorText, colorBgBlur },
  } = theme.useToken();

  const [selectedKey, setSelectedKey] = useState<string>(
    () => sessionStorage.getItem("selectedMenuKey") || location.pathname
  );

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const collapsed = useAppSelector((state) => state.storageSlice.collapse);

  type MenuItem = Required<MenuProps>["items"][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ) {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const items = menuData.map((item) =>
    getItem(
      item.label,
      item.key,
      item.icon,
      item.children as unknown as MenuItem[]
    )
  );

  const items2 = menuData.map((item) =>
    getItem(
      <div className="pb-2 flex flex-col gap-1 justify-center items-center">
        {React.cloneElement(item.icon as React.ReactElement)}
        <div className="text-xs font-normal">{item.label}</div>
      </div>,
      item.key,
      null,
      item.children as unknown as MenuItem[]
    )
  );

  const handleMenuClick = ({ key }: { key: string }) => {
    setSelectedKey(key);
    sessionStorage.setItem("selectedMenuKey", key);
    navigate(key);
    scrollToTop();
  };

  return (
    <Layout>
      <Sider
        style={{
          // overflow: "auto",
          height: "100vh",
          position: "sticky",
          top: 0,
          scrollbarWidth: "thin",
          backgroundColor: colorBgBlur,
        }}
        collapsible
        collapsed={collapsed}
        className={`!hidden md:!block [color-scheme:light] dark:[color-scheme:dark] `}
        trigger={null}
        theme={"light"}
      >
        <div
          style={{
            borderColor: "transparent",
            color: colorText,
            backgroundColor: "transparent",
          }}
          className="border-r px-4 h-16 w-full text-center relative"
        >
          <div
            className={`flex justify-center items-center my-3 px-4 absolute top-0 left-0 w-full h-full transition-all duration-300 ${
              collapsed ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}
          >
            <span className="text-4xl font-bold select-none">T</span>
          </div>

          <div
            className={`flex justify-center items-center my-3 px-4 absolute top-0 left-0 w-full h-full transition-all duration-300 ${
              collapsed ? "opacity-0 scale-50" : "opacity-100 scale-100"
            }`}
          >
            <span className="text-3xl font-medium select-none">پنل مدیریت</span>
          </div>
        </div>
        <Divider style={{ padding: 1 }} />
        <Menu
          theme={"light"}
          selectedKeys={[selectedKey]}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
          className="full-height"
          style={{
            backgroundColor: "transparent",
            borderColor: "transparent",
          }}
        />
      </Sider>

      <div className="w-0 flex-grow min-h-screen">
        <div className="min-res-h">
          <Suspense fallback={<SuspenseLoading />}>
            <Outlet />
          </Suspense>
        </div>

        <nav
          style={{ borderColor: colorBgLayout }}
          className="md:!hidden !mt-auto h-fit border-t flex justify-between items-center sticky bottom-0"
        >
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["/"]}
            selectedKeys={[selectedKey]}
            onClick={handleMenuClick}
            items={items2}
            style={{ scrollbarWidth: "thin" }}
            className={`justify-center flex-1 items-center !pt-2 max-w-screen [color-scheme:light] dark:[color-scheme:dark] `}
          />
        </nav>
      </div>
    </Layout>
  );
};

export default ResponsiveNav;
