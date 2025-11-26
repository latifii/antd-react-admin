import { Checkbox, Form, FormProps, Input, theme, Typography } from "antd";
import { ButtonElm } from "../../components/Button/ButtonElm";
import { RegisterBody } from "../../apis/authApi";
import { Link } from "react-router-dom";
import { scrollToTop } from "../../utils/helpers";
import ThirdParty from "./Login/ThirdParty";

const { Title, Text } = Typography;

const Register = () => {
  interface RegisterFormProps extends RegisterBody {
    agreement: boolean;
    website: string; // Honeypot field
  }

  const [form] = Form.useForm<RegisterFormProps>();

  const {
    token: { colorBgContainer, boxShadow, borderRadius },
  } = theme.useToken();

  // const { mutate: registerMutate, isPending: registerPending } = useRegisterApi();

  const onFormFinish: FormProps<RegisterFormProps>["onFinish"] = async (
    values
  ) => {
    if (values.website && values.website.trim() !== "") {
      console.warn("Hello Mr bot");
      return;
    }

    console.log(values);
    // registerMutate({
    //     email: values.email,
    //     password: values.password
    // });
  };

  const handleNavToLogin = () => {
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
          ثبت‌نام
        </Title>
        <Text className="!text-lg z-10" style={{ color: "white" }}>
          از این فرم‌های فوق‌العاده برای ورود یا ایجاد حساب کاربری جدید در پروژه
          خود استفاده کنید.
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
        <Text className="!text-xl font-semibold mb-6">ثبت‌نام با</Text>

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
          }}
          size="large"
        >
          <Form.Item
            // label="نام"
            name="name"
            rules={[{ required: true, message: "لطفاً نام خود را وارد کنید." }]}
          >
            <Input placeholder="نام" />
          </Form.Item>

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
              { min: 6, message: "رمز عبور باید حداقل ۶ کاراکتر باشد." },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                message:
                  "رمز عبور باید شامل حداقل یک حرف بزرگ، یک حرف کوچک و یک عدد باشد.",
              },
            ]}
          >
            <Input.Password placeholder="رمز عبور" />
          </Form.Item>

          <Form.Item name="website" className="hidden">
            <Input type="text" tabIndex={-1} autoComplete="off" />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject("لطفاً شرایط و قوانین را بپذیرید."),
              },
            ]}
          >
            <Checkbox>شرایط و قوانین را می‌پذیرم</Checkbox>
          </Form.Item>

          <div className="mt-6">
            <ButtonElm
              // loading={registerPending}
              htmlType="submit"
              className="w-full"
            >
              ثبت‌نام
            </ButtonElm>
          </div>
        </Form>

        <Text className="mt-4 font-medium flex items-center gap-2">
          <Text type="secondary">قبلاً ثبت‌نام کرده‌اید؟ </Text>
          <Link to={"/auth/login"} onClick={handleNavToLogin}>
            ورود
          </Link>
        </Text>
      </div>
    </div>
  );
};

export default Register;
