import { useMemo } from "react";
import { theme } from "antd";
import ChartWrapper from "../../../components/ChartWrapper";

const PieChartCategory = () => {
  const {
    token: { colorBgContainer, borderRadius },
  } = theme.useToken();

  const option = useMemo(
    () => ({
      backgroundColor: colorBgContainer,
      title: {
        text: "توزیع دسته‌بندی محصولات",
        subtext: "توزیع فروش بر اساس دسته‌بندی کالاها",
        x: "center",
      },
      tooltip: {
        trigger: "item",
        extraCssText:
          "direction: rtl; text-align: right; font-family: inherit;",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      toolbox: {
        feature: {
          saveAsImage: { title: "ذخیره تصویر" },
        },
        x: "left",
      },
      legend: {
        orient: "horizontal",
        left: "center",
        bottom: "0",
        itemGap: 25,
        textStyle: {
          fontSize: 12,
        },
        data: [
          "گوشی‌های هوشمند",
          "لپ‌تاپ‌ها",
          "تبلت‌ها",
          "لوازم جانبی",
          "ساعت‌های هوشمند",
          "تلویزیون‌ها",
          "کنسول‌های بازی",
        ],
      },
      series: [
        {
          name: "فروش",
          type: "pie",
          radius: "55%",
          center: ["50%", "50%"],
          data: [
            { value: 150, name: "گوشی‌های هوشمند" },
            { value: 120, name: "لپ‌تاپ‌ها" },
            { value: 100, name: "تبلت‌ها" },
            { value: 200, name: "لوازم جانبی" },
            { value: 130, name: "ساعت‌های هوشمند" },
            { value: 90, name: "تلویزیون‌ها" },
            { value: 80, name: "کنسول‌های بازی" },
          ],
          itemStyle: {
            borderRadius: borderRadius,
            borderWidth: 2,
          },
        },
      ],
    }),
    [colorBgContainer, borderRadius]
  );

  return <ChartWrapper option={option} height="400px" />;
};

export default PieChartCategory;
