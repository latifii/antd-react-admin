import { Outlet } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { IoSettingsOutline } from "react-icons/io5";
import { Layout, theme } from "antd";
import { Suspense } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { toggleSettingsDrawer } from "../redux/slices/tempSlice";
import { ButtonElm } from "../components/Button/ButtonElm";
import { menuCollapse } from "../redux/slices/storageSlice";
import BreadCrumbElm from "./BreadCrumbElm";
import ProfileDropDown from "../components/ProfileDropDown/ProfileDropDown";
import Notification from "../components/Notification/Notification";
import SuspenseLoading from "../components/Loading/SuspenseLoading";
import MainFooter from "./Footer/MainFooter";

const { Content, Header } = Layout;

const HeaderComp = () => {
  const dispatch = useAppDispatch();

  const {
    token: {
      colorBgContainer,
      boxShadowSecondary,
      colorBorderSecondary,
      borderRadius,
    },
  } = theme.useToken();

  const collapsed = useAppSelector((state) => state.storageSlice.collapse);
  const navStick = useAppSelector((state) => state.themeSlice.navStick);

  const handleOpenSettingsDrawer = () => dispatch(toggleSettingsDrawer(true));

  return (
    <>
      <Header
        className={`${
          navStick ? "sticky top-3" : ""
        } mt-3 z-20 !pl-2 !pr-4 flex justify-between items-center`}
        style={{
          background: colorBgContainer,
          boxShadow: navStick ? boxShadowSecondary : "none",
          borderColor: navStick ? "transparent" : colorBorderSecondary,
          borderRadius,
        }}
      >
        {/* Right */}
        <div className="flex flex-wrap justify-start items-center gap-3">
          <ButtonElm
            className="!hidden md:!flex !h-full !justify-center !items-center !aspect-square"
            type="text"
            onClick={() => dispatch(menuCollapse(!collapsed))}
            aria-label={collapsed ? "باز کردن منو" : "بستن منو"}
            title={collapsed ? "باز کردن منو" : "بستن منو"}
          >
            {collapsed ? (
              <MenuFoldOutlined className="text-base" />
            ) : (
              <MenuUnfoldOutlined className="text-base" />
            )}
          </ButtonElm>

          <BreadCrumbElm />
        </div>

        {/* Mobile Placeholder */}
        <div className="md:!hidden"></div>

        {/* Left */}
        <div className="flex justify-center items-center gap-3">
          <ButtonElm
            className="hover:!bg-transparent !p-1"
            type="text"
            onClick={handleOpenSettingsDrawer}
          >
            <IoSettingsOutline size={20} />
          </ButtonElm>

          <Notification />
          <ProfileDropDown />
        </div>
      </Header>

      <Content className="h-fit min-main-h my-6">
        <Suspense fallback={<SuspenseLoading className="suspense-height" />}>
          <Outlet />
        </Suspense>
      </Content>

      <div className="mt-auto">
        <MainFooter />
      </div>
    </>
  );
};

export default HeaderComp;
