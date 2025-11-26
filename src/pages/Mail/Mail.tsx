import React, { Suspense, useEffect } from "react";
import { Layout, theme } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { menuCollapse } from "../../redux/slices/storageSlice";
import SuspenseLoading from "../../components/Loading/SuspenseLoading";

const MailFilters = React.lazy(() => import("./components/MailFilters"));
const MailListing = React.lazy(() => import("./components/MailListing"));

const { Content } = Layout;

const Mail = () => {

    const dispatch = useAppDispatch();
    const {
        token: {
            colorBorder
        }
    } = theme.useToken();

    const collapse = useAppSelector(state => state.storageSlice.collapse);

    useEffect(() => {
        if (!collapse) {
            dispatch(menuCollapse(true));
            sessionStorage.setItem("mainAside", "false");
        }
    }, [dispatch, collapse])

    useEffect(() => {
        return () => {
            const val = sessionStorage.getItem("mainAside");
            dispatch(menuCollapse(val === "false" ? false : true));
            sessionStorage.removeItem("mainAside");
        }
    }, [dispatch])


    return (
        <>
            {/* LG Screen contents */}
            {/*Components which doesn't pass through HeaderComp component need to import Content for <main> tag */}
            <Content style={{
                margin: 0,
                padding: 0,
                backgroundColor: "transparent",
            }}
                className="!hiddens lg: !flex justify-center items-start w-full h-full overflow-auto"
            >
                <div style={{ borderColor: colorBorder }} className="w-s[256px] h-full">
                    <Suspense fallback={<SuspenseLoading className="min-w-[256px] min-res-h" />}>
                        <MailFilters />
                    </Suspense>
                </div>
                <div style={{ borderColor: colorBorder }}
                    className="reduce-userlist-width h-full flex-grow flex justify-center items-start divide-x "
                >
                    <div style={{ borderColor: colorBorder }}
                        className={`w-full h-full min-w-[400px] duration-150`}
                    >
                        <Suspense fallback={<SuspenseLoading className="min-w-[256px] min-res-h" />}>
                            <MailListing />
                        </Suspense>
                    </div>
                </div>
            </Content >


            {/* BELOW LG SCREEN CONTENTS */}
            {/* <Content style={{
                margin: 0,
                padding: 0,
                backgroundColor: "transparent",
            }}
                className="w-full h-full lg:!hidden content-responsive-height overflow-auto"
            >
                <div style={{ borderColor: colorBorder }} className="w-full h-full">
                    <Suspense fallback={<SuspenseLoading />}>
                        <MailListing />
                    </Suspense>
                </div>

            </Content > */}

        </>
    )
}

export default Mail
