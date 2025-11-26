import { Card, Col, Row, Typography } from "antd";
import React, { Suspense } from "react";
import SuspenseLoading from "../../components/Loading/SuspenseLoading";

const PieChartStatus = React.lazy(() => import("./Charts/PieChartStatus"));
const PieChartCategory = React.lazy(() => import("./Charts/PieCategory"));
const StackedLineChart = React.lazy(() => import("./Charts/StackedLineChart"));

const { Title, Text } = Typography;

const Home = () => {
  const salesData = [
    {
      title: "فروش امروز",
      value: "۳۰۰,۰۰۰,۰۰۰ تومان",
      percentage: "+۳۰٪",
    },
    {
      title: "کاربران امروز",
      value: "۲۰۰ نفر",
      percentage: "+۲۰٪",
    },
    {
      title: "مشتریان جدید",
      value: "۱,۲۰۰+ نفر",
      percentage: "-۲۰٪",
    },
    {
      title: "درآمد سفارش‌های جدید",
      value: "۹۰,۰۰۰,۰۰۰ تومان",
      percentage: "+۱۰٪",
    },
  ];

  return (
    <div className="bg-transparent mt-3">
      <Title level={1} className="font-bold my-4">
        آمار کلی
      </Title>

      <Row gutter={[16, 16]}>
        {salesData.map((item, index) => (
          <Col xs={24} sm={12} md={12} lg={6} key={index}>
            <Card hoverable>
              <Title level={4}>{item.title}</Title>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <Text strong className="text-lg">
                  {item.value}
                </Text>
                <Text
                  type={item.percentage.startsWith("+") ? "success" : "danger"}
                  className="mr-2 text-base"
                  style={{ direction: "ltr" }}
                >
                  {item.percentage}
                </Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <div
        className="mt-8 overflow-x-auto [color-scheme:light] dark:[color-scheme:dark]"
        style={{ scrollbarWidth: "thin" }}
      >
        <Suspense fallback={<SuspenseLoading />}>
          <StackedLineChart />
        </Suspense>
      </div>

      <div
        className="overflow-auto [color-scheme:light] dark:[color-scheme:dark] mt-8 grid grid-cols-[repeat(auto-fill,minmax(410px,1fr))] gap-5"
        style={{ scrollbarWidth: "thin" }}
      >
        <Suspense fallback={<SuspenseLoading />}>
          <PieChartCategory />
        </Suspense>
        <Suspense fallback={<SuspenseLoading />}>
          <PieChartStatus />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
