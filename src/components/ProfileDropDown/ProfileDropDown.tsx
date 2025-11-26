import { Dropdown, Avatar, Divider, theme } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { ButtonElm } from "../Button/ButtonElm";
import { useLogOut } from "../../apis/authApi";

const ProfileDropDown = () => {
  const {
    token: { colorBgContainer, boxShadowSecondary, borderRadius, colorBorder },
  } = theme.useToken();

  const { mutate: logout } = useLogOut();

  const userData = {
    profileImage: "https://i.pravatar.cc/300?img=60",
    firstName: "سعید ",
    lastName: "سعیدی",
    emailId: "example@gmail.com",
  };

  return (
    <Dropdown
      trigger={["hover"]}
      popupRender={() => (
        <div
          style={{
            borderRadius,
            borderColor: colorBorder,
            backgroundColor: colorBgContainer,
            boxShadow: boxShadowSecondary,
          }}
          className="p-4 min-w-[300px] border flex flex-col items-start rtl"
        >
          <div className="w-full flex items-center gap-3">
            <Avatar size={40} src={userData.profileImage} />
            <div className="text-right">
              <p>{userData.firstName + " " + userData.lastName}</p>
              <span>{userData.emailId}</span>
            </div>
          </div>

          <Divider className="!my-3" />

          <ButtonElm
            type="text"
            size="large"
            className="w-full !justify-start"
            icon={<UserOutlined />}
          >
            مشاهده پروفایل
          </ButtonElm>

          <ButtonElm
            type="text"
            size="large"
            icon={<LogoutOutlined />}
            className="w-full !justify-start"
            onClick={() => logout()}
          >
            خروج از حساب
          </ButtonElm>
        </div>
      )}
    >
      <ButtonElm
        type="text"
        className="hover:!bg-transparent ml-4 !rounded-full"
        icon={<Avatar size={40} src="https://i.pravatar.cc/300?img=60" />}
      />
    </Dropdown>
  );
};

export default ProfileDropDown;
