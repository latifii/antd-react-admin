import { Layout, Result, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { ButtonElm } from "../components/Button/ButtonElm";
import AuthFooter from "../layout/Footer/AuthFooter";
import { FaArrowRight } from "react-icons/fa6";

const { Content } = Layout;

const NotFound = () => {
  const navigate = useNavigate();

  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div
      style={{ backgroundColor: colorBgLayout }}
      className="min-h-screen flex flex-col justify-between items-center w-full"
    >
      <Content
        style={{ backgroundColor: "transparent" }}
        className="flex-grow w-full !h-full flex flex-col justify-center items-center pt-16 gap-3"
      >
        <Result
          status="404"
          title="۴۰۴"
          subTitle="با عرض پوزش، صفحه‌ای که درخواست کرده‌اید یافت نشد."
          extra={
            <ButtonElm onClick={goBack} size="large" icon={<FaArrowRight />}>
              بازگشت به صفحه قبل
            </ButtonElm>
          }
        />
      </Content>
      <div className="w-full">
        <AuthFooter />
      </div>
    </div>
  );
};

export default NotFound;
