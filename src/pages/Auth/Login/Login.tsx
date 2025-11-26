import { Checkbox, Form, FormProps, Input, theme, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginBody } from "../../../apis/authApi";
import { ButtonElm } from "../../../components/Button/ButtonElm";
import { scrollToTop } from "../../../utils/helpers";
import ThirdParty from "./ThirdParty";

const { Title, Text } = Typography;

const Login = () => {
  type LoginFormProps = LoginBody;

  const [form] = Form.useForm<LoginFormProps>();

  const {
    token: { colorBgContainer, boxShadow, borderRadius },
  } = theme.useToken();

  const navigate = useNavigate();

  const onFormFinish: FormProps<LoginFormProps>["onFinish"] = async (
    values
  ) => {
    //    Login Logic
    console.log(values);
    localStorage.setItem("log", "x");
    navigate("/");
    scrollToTop();
  };

  const handleNavToRegisger = () => {
    scrollToTop();
  };

  return (
    <div className="flex max-w-[500px] w-full p-2.5 mx-auto flex-col gap-10 justify-center items-center h-full text-clip">
      <div className="z-10 space-y-3 text-center">
        <Title
          level={1}
          className="z-10 text-center !font-bold md:!text-5xl"
          style={{ color: "white" }}
        >
          ورود به حساب
        </Title>
        <Text className="!text-lg z-10" style={{ color: "white" }}>
          خوش آمدید! برای ورود از مشخصات خود یا حساب شبکه‌های اجتماعی استفاده
          کنید.
        </Text>
      </div>

      <div
        style={{
          backgroundColor: colorBgContainer,
          boxShadow: boxShadow,
          borderRadius: borderRadius,
        }}
        className="flex flex-col justify-start items-center mt-4 w-full z-10 p-6 shadow-md"
      >
        <Text className="!text-xl font-semibold mb-6">ورود با</Text>

        <ThirdParty />

        <div className="relative w-full mb-8 flex items-center">
          <div className="flex-grow h-[1px] bg-gradient-to-r from-5% from-colorBgContainer to-colorPrimary" />
          <Text type="secondary" className="px-4 font-semibold">
            یا
          </Text>
          <div className="flex-grow h-[1px] bg-gradient-to-l from-5% from-colorBgContainer to-colorPrimary" />
        </div>

        <Form
          layout="vertical"
          form={form}
          onFinish={onFormFinish}
          className="w-full"
          initialValues={{
            email: null,
            password: null,
            rememberMe: false,
          }}
          size="large"
        >
          {/* Email Field - Kept */}
          <Form.Item
            // label="ایمیل"
            name="email"
            rules={[
              { required: true, message: "لطفاً ایمیل خود را وارد کنید." },
              {
                type: "email",
                message: "لطفاً یک آدرس ایمیل معتبر وارد کنید.",
              },
            ]}
          >
            <Input placeholder="ایمیل" />
          </Form.Item>

          <Form.Item
            // label="رمز عبور"
            name="password"
            rules={[
              { required: true, message: "لطفاً رمز عبور خود را وارد کنید." },
            ]}
          >
            <Input.Password placeholder="رمز عبور" />
          </Form.Item>

          <Form.Item name="website" className="hidden">
            <Input type="text" tabIndex={-1} autoComplete="off" />
          </Form.Item>

          <div className="flex justify-between items-center mb-4">
            <Form.Item name="rememberMe" valuePropName="checked" noStyle>
              <Checkbox>مرا به خاطر بسپار</Checkbox>
            </Form.Item>
            <Link to="/auth/forgot-password" className="text-sm">
              رمز عبور را فراموش کرده‌اید؟
            </Link>
          </div>

          <div className="mt-6">
            <ButtonElm
              // disabled={loginPending}
              // loading={loginPending}
              aria-label="ورود"
              htmlType="submit"
              className="w-full"
            >
              ورود
            </ButtonElm>
          </div>
        </Form>

        <Text type="secondary" className="text-center mt-4 text-xs">
          (توجه: این یک قالب نمایشی است. با هر اطلاعات ورودی وارد خواهید شد.)
        </Text>

        <Text className="mt-6 font-medium">
          <Text type="secondary">حساب کاربری ندارید؟ </Text>
          <Link to={"/auth/register"} onClick={handleNavToRegisger}>
            ثبت‌نام
          </Link>
        </Text>
      </div>
    </div>
  );
};

export default Login;
