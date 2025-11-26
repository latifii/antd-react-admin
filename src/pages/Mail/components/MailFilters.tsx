import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  InboxOutlined,
  SendOutlined,
  DeleteOutlined,
  EditOutlined,
  FileTextOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import ComposeMail from "./ComposeMail";
import { ButtonElm } from "../../../components/Button/ButtonElm";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { toggleMailCollapse } from "../../../redux/slices/mailSlice";
import { useSearchParams } from "react-router-dom";

const { Sider } = Layout;

const MailFilters: React.FC = () => {
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const [openCompose, setOpenCompose] = useState(false);
  const mailCollapse = useAppSelector((state) => state.mailSlice.mailCollapse);

  // ترجمه آیتم‌های منو
  const menuItems = [
    { key: "inbox", label: "صندوق ورودی", icon: <InboxOutlined /> },
    { key: "sent", label: "ارسال شده", icon: <SendOutlined /> },
    { key: "drafts", label: "پیش‌نویس‌ها", icon: <FileTextOutlined /> },
    { key: "trash", label: "زباله‌دان", icon: <DeleteOutlined /> },
  ];

  const handleCompose = () => {
    setOpenCompose(true);
  };

  const handleMenuClick = (key: string) => {
    const params = new URLSearchParams(searchParams);
    if (key !== "inbox") {
      params.set("tab", key);
    } else {
      params.delete("tab");
    }
    params.delete("mailId");
    setSearchParams(params);
  };

  return (
    <>
      <ComposeMail openCompose={openCompose} setOpenCompose={setOpenCompose} />

      {/* <div className="w-full h-full"> */}
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          top: 0,
          scrollbarWidth: "thin",
          backgroundColor: "transparent",
        }}
        collapsible
        collapsed={mailCollapse}
        className={`!hidden px-2 md:!block [color-scheme:light] dark:[color-scheme:dark] `}
        trigger={null}
        width={256}
        theme={"light"}
      >
        <div className={`mx-1 w-full mt-2 flex justify-start items-center`}>
          <ButtonElm
            className="!w-fit !px-5"
            type={"text"}
            size="large"
            onClick={() => dispatch(toggleMailCollapse(!mailCollapse))}
            aria-label={mailCollapse ? "باز کردن منو" : "بستن منو"}
            title={mailCollapse ? "باز کردن منو" : "بستن منو"}
          >
            {mailCollapse ? (
              <MenuUnfoldOutlined className="text-base" />
            ) : (
              <MenuFoldOutlined className="text-base" />
            )}
          </ButtonElm>
        </div>

        <div className="mx-1 mt-2 h-20 text-center relative">
          <ButtonElm
            icon={<EditOutlined className="text-lg" />}
            onClick={handleCompose}
            className={`!py-6 my-4 !absolute top-0 left-0 object-contain duration-1000 !justify-start ${
              mailCollapse
                ? "overflow-hidden text-colorPrimary invisible scale-50 !w-12"
                : "!w-fit visible scale-100"
            }`}
            title="ایجاد پیام"
            aria-label="Compose"
            size="large"
          >
            ایجاد پیام
          </ButtonElm>

          <ButtonElm
            onClick={handleCompose}
            className={`!py-6 max-w-30 my-4 !absolute top-0 left-0 object-contain duration-1000 ${
              !mailCollapse
                ? "overflow-hidden text-colorPrimary invisible scale-50 !w-12"
                : "!w-full visible scale-100"
            }`}
            title="ایجاد پیام"
            aria-label="Compose"
            size="large"
          >
            <EditOutlined className="text-lg" />
          </ButtonElm>
        </div>

        <Menu
          style={{ backgroundColor: "transparent" }}
          mode="vertical"
          defaultSelectedKeys={["inbox"]}
          onClick={({ key }) => handleMenuClick(key)}
          className="!border-transparent font-semibold text-sm"
          items={menuItems.map((item) => ({
            key: item.key,
            icon: item.icon,
            label: item.label,
          }))}
        />
      </Sider>
      {/* </div> */}
    </>
  );
};

export default MailFilters;
