import { useMemo } from "react";
import { theme } from "antd";
import ChartWrapper from "../../../components/ChartWrapper";

const PieChartStatus = () => {
  const {
    token: { colorBgContainer, borderRadius },
  } = theme.useToken();

  const statusData = useMemo(
    () => [
      { value: 80, name: "در انتظار" },
      { value: 150, name: "ارسال شده" },
      { value: 300, name: "تحویل شده" },
    ],
    []
  );

  const option = useMemo(
    () => ({
      backgroundColor: colorBgContainer,
      title: {
        text: "نمای کلی وضعیت سفارشات",
        subtext: "توزیع سفارشات معلق، ارسال شده و تحویل شده",
        x: "center",
      },
      tooltip: {
        trigger: "item",
        extraCssText:
          "direction: rtl; text-align: right; font-family: inherit;",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        left: "left",
        bottom: "0",
        data: ["در انتظار", "ارسال شده", "تحویل شده"],
      },
      toolbox: {
        feature: {
          saveAsImage: { title: "ذخیره تصویر" },
        },
        x: "left",
      },
      series: [
        {
          name: "سفارشات",
          type: "pie",
          radius: "55%",
          center: ["50%", "55%"],
          data: statusData,
          itemStyle: {
            borderRadius: borderRadius,
            borderWidth: 2,
          },
        },
      ],
    }),
    [colorBgContainer, borderRadius, statusData]
  );

  return <ChartWrapper option={option} height="400px" />;
};

export default PieChartStatus;
