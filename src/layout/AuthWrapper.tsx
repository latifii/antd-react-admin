import { Layout } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import AuthFooter from "./Footer/AuthFooter";
import { useAppSelector } from "../redux/store";
import { imgFileByBgClass } from "../redux/slices/themeSlice";
import SuspenseLoading from "../components/Loading/SuspenseLoading";
import { Suspense } from "react";

const { Content } = Layout;

const AuthWrapper = () => {
  const navigate = useNavigate();

  const lightTheme = useAppSelector((state) => state.themeSlice.lightTheme);
  const bgImg = useAppSelector((state) => state.themeSlice.bgImg);

  const toBeUsedImg = imgFileByBgClass.get(bgImg);

  const handleNavToHome = () => {
    if (localStorage.getItem("log") === "x") {
      navigate("/");
    }
  };

  return (
    <>
      <div
        className={`auth-bg fixed inset-0 -z-10`}
        style={{
          backgroundColor: lightTheme
            ? `rgba(245, 245, 245, 1)`
            : `rgba(8, 8, 8, 1)`,
        }}
      ></div>

      <div className="p-2 z-0">
        <div
          className={`overflow-hidden rounded-lg w-full h-[600px] md:h-[550px] 2xl:h-[800px] relative duration-200`}
          style={{
            backgroundImage: `url("${toBeUsedImg}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className={`absolute inset-0 z-[5] ${
              lightTheme ? "bg-black/30" : "bg-black/60"
            }`}
          />

          <div className="z-10 relative p-4">
            <div className="w-fit">
              <div
                role="button"
                onClick={handleNavToHome}
                className={`cursor-pointer w-full h-full transition-all duration-300`}
              >
                <span className="text-4xl font-medium select-none !text-white">
                  پنل مدیریت
                </span>
              </div>
            </div>
            <div></div>
          </div>
        </div>

        <div className="z-10 w-full absolute top-[200px] 2xl:top-[280px] left-1/2 -translate-x-1/2">
          <Content>
            <Suspense fallback={<SuspenseLoading className="min-h-screen" />}>
              <Outlet />
            </Suspense>
          </Content>

          <AuthFooter />
        </div>
      </div>
    </>
  );
};

export default AuthWrapper;
