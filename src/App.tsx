import React, { Suspense, useEffect, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import { ConfigProvider, FloatButton, theme, App as AntApp } from "antd";
import { useAppSelector } from "./redux/store";
import { SettingOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { toggleSettingsDrawer } from "./redux/slices/tempSlice";
import MessageProviderContent from "./context/MessageContext";
import faIR from "antd/lib/locale/fa_IR";
import InitialSusLoading from "./components/Loading/InitialSusLoading";

const RequireAuth = React.lazy(() => import("./layout/RequireAuth"));
const ResponsiveNav = React.lazy(() => import("./layout/ResponsiveNav"));
const HeaderComp = React.lazy(() => import("./layout/HeaderComp"));
const GapComp = React.lazy(() => import("./layout/GapComp"));
const AuthWrapper = React.lazy(() => import("./layout/AuthWrapper"));

const Mail = React.lazy(() => import("./pages/Mail/Mail"));
const FormPg = React.lazy(() => import("./pages/FormPages/FormPg"));

const SettingDrawer = React.lazy(
  () => import("./components/Drawer/SettingDrawer")
);
const TablesPg = React.lazy(() => import("./pages/TablePages/TablesPg"));
const Login = React.lazy(() => import("./pages/Auth/Login/Login"));
const Home = React.lazy(() => import("./pages/Dashboard/Home"));
const Register = React.lazy(() => import("./pages/Auth/Register"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const App = () => {
  const dispatch = useDispatch();
  const lightTheme = useAppSelector((state) => state.themeSlice.lightTheme);
  const primaryColor = useAppSelector((state) => state.themeSlice.primaryColor);
  const bgImg = useAppSelector((state) => state.themeSlice.bgImg);
  const borderRadius = useAppSelector((state) => state.themeSlice.borderRadius);
  const compactMode = useAppSelector((state) => state.themeSlice.compactMode);
  const alpha = useAppSelector((state) => state.themeSlice.alpha);

  const newTheme = lightTheme
    ? compactMode
      ? [theme.defaultAlgorithm, theme.compactAlgorithm]
      : [theme.defaultAlgorithm]
    : compactMode
    ? [theme.darkAlgorithm, theme.compactAlgorithm]
    : [theme.darkAlgorithm];

  const {
    token: { colorText },
  } = theme.useToken();

  const themeColors: Record<string, string> = useMemo(
    () => ({
      colorLink: primaryColor,
      colorPrimary: primaryColor,
      colorBgLayout: lightTheme
        ? `rgba(245, 245, 245, ${alpha})`
        : `rgba(8, 8, 8, ${alpha})`,
      colorBgContainer: lightTheme
        ? "rgba(255, 255, 255, 1)"
        : "rgba(20, 20, 20, 1)",
    }),
    [lightTheme, primaryColor, alpha]
  );

  useEffect(() => {
    Object.entries(themeColors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
  }, [themeColors]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--borderRadiusAnt",
      `${borderRadius}px`
    );
  }, [borderRadius]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", !lightTheme);
  }, [lightTheme]);

  const handleOpenSettingsDrawer = () => {
    dispatch(toggleSettingsDrawer(true));
  };

  return (
    <>
      <ConfigProvider
        direction="rtl"
        locale={faIR}
        theme={{
          algorithm: newTheme,
          token: {
            ...themeColors,
            borderRadius: borderRadius,
          },
        }}
      >
        <AntApp>
          <MessageProviderContent>
            <div className={bgImg && `bg-image-before ${bgImg}`}></div>

            <div
              className={`min-h-screen`}
              style={{
                color: colorText,
              }}
            >
              <FloatButton
                onClick={handleOpenSettingsDrawer}
                type="primary"
                style={{ insetInlineEnd: 24 }}
                icon={<SettingOutlined />}
              />

              <Suspense fallback={<></>}>
                <SettingDrawer />
              </Suspense>

              <Suspense fallback={<InitialSusLoading className="h-screen" />}>
                <Routes>
                  <Route path="*" element={<NotFound />} />
                  <Route element={<AuthWrapper />}>
                    <Route path="/auth/register" element={<Register />} />
                    <Route path="/auth/login" element={<Login />} />
                  </Route>

                  <Route element={<RequireAuth />}>
                    <Route element={<ResponsiveNav />}>
                      <Route path="/applications/mail" element={<Mail />} />

                      <Route element={<GapComp />}>
                        <Route element={<HeaderComp />}>
                          <Route path="/" element={<Home />} />

                          <Route path="/pages/table" element={<TablesPg />} />
                          <Route path="/pages/forms" element={<FormPg />} />
                        </Route>
                      </Route>
                    </Route>
                  </Route>
                </Routes>
              </Suspense>
            </div>
          </MessageProviderContent>
        </AntApp>
      </ConfigProvider>
    </>
  );
};

export default App;
