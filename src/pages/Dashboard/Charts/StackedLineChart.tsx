import { useMemo } from "react";
import { theme } from "antd";
import ChartWrapper from "../../../components/ChartWrapper";
import { TooltipComponentOption } from "echarts/components";
import { ECBasicOption } from "echarts/types/dist/shared";

// https://github.com/apache/echarts/issues/14723
type Unified<T> = Exclude<T, T[]>;
type TooltipFormatterCallback = Exclude<
  NonNullable<TooltipComponentOption["formatter"]>,
  string
>;
type TooltipFormatterParams = Parameters<TooltipFormatterCallback>[0];
type SingleTooltipFormatterParams = Unified<TooltipFormatterParams>;
type MultipleTooltipFormatterParams = SingleTooltipFormatterParams[];

const seriesNames = {
  sales: "درآمد",
  remaining: "باقیمانده",
  booked: "فروخته شده",
  total: "کل موجودی",
  event: "محصول",
} as const;

type SeriesNames = (typeof seriesNames)[keyof typeof seriesNames];

interface SeriesType {
  [event]: string;
  [total]: number;
  [booked]: number;
  [remaining]: number;
  [sales]: number;
}

const { booked, remaining, sales, total, event } = seriesNames;

const StackedLineChart = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const chartData: SeriesType[] = useMemo(
    () => [
      {
        [event]: "گوشی هوشمند X",
        [total]: 1000,
        [booked]: 850,
        [remaining]: 150,
        [sales]: 1400000000,
      },
      {
        [event]: "لپ‌تاپ Pro",
        [total]: 700,
        [booked]: 620,
        [remaining]: 80,
        [sales]: 1700000000,
      },
      {
        [event]: "هدفون بی‌سیم",
        [total]: 2000,
        [booked]: 1800,
        [remaining]: 200,
        [sales]: 540000000,
      },
      {
        [event]: "ساعت هوشمند",
        [total]: 1500,
        [booked]: 1400,
        [remaining]: 100,
        [sales]: 1120000000,
      },
      {
        [event]: "تبلت مینی",
        [total]: 600,
        [booked]: 520,
        [remaining]: 80,
        [sales]: 780000000,
      },
      {
        [event]: "کنسول بازی",
        [total]: 800,
        [booked]: 750,
        [remaining]: 50,
        [sales]: 187500000,
      },
      {
        [event]: "تلویزیون 4K",
        [total]: 500,
        [booked]: 450,
        [remaining]: 50,
        [sales]: 135000000,
      },
      {
        [event]: "اسپیکر بلوتوث",
        [total]: 1200,
        [booked]: 1000,
        [remaining]: 200,
        [sales]: 250000000,
      },
      {
        [event]: "پهپاد حرفه‌ای",
        [total]: 300,
        [booked]: 270,
        [remaining]: 30,
        [sales]: 1080000000,
      },
      {
        [event]: "هدست VR",
        [total]: 400,
        [booked]: 320,
        [remaining]: 80,
        [sales]: 640000000,
      },
    ],
    []
  );

  const option: ECBasicOption = useMemo(
    () => ({
      backgroundColor: colorBgContainer,
      dataset: [
        {
          id: "dataset_raw",
          source: chartData,
        },
      ],
      title: {
        text: "نمودار فروش و موجودی",
        x: "center",
      },
      tooltip: {
        trigger: "axis",
        extraCssText: "direction: rtl; text-align: right;",
        formatter: function (params: MultipleTooltipFormatterParams) {
          const data = params[0]?.data as SeriesType;
          const Product = data["محصول"];
          let tooltipContent = `
                    <div style="margin-bottom: 2px; font-family: inherit;">
                        <p>${Product}</p> 
                    </div>
                    `;

          params.forEach((item) => {
            const data = item.data as SeriesType;
            const seriesName = item.seriesName as SeriesNames;

            const value = data[seriesName];
            const formattedValue = Number(value).toLocaleString("fa-IR");

            const newVal =
              item.seriesName === sales
                ? `${formattedValue} تومان`
                : formattedValue;

            tooltipContent += `
                        <div style="display: flex; justify-content: space-between; align-items: center; gap: 2rem">
                            <span>${item.marker} ${item.seriesName}</span>
                            <span style="font-weight: bold;">${newVal}</span>
                        </div>
                    `;
          });

          return tooltipContent;
        },
      },
      grid: [
        { top: "110px", bottom: "55%" }, // Index 0
        { top: "60%" }, // Index 1
      ],
      xAxis: [
        { type: "category", nameLocation: "middle", gridIndex: 0 }, // belongs to grid 0
        { type: "category", nameLocation: "middle", gridIndex: 1 }, // belongs to grid 1
      ],
      yAxis: [
        { name: "محصول", gridIndex: 0 },
        { name: "درآمد (تومان)", gridIndex: 1 },
      ],

      toolbox: {
        show: true,
        x: "left",
        feature: {
          dataZoom: {
            yAxisIndex: "none",
            title: { zoom: "زوم", back: "برگشت زوم" },
          },
          magicType: {
            type: ["line", "bar"],
            title: { line: "نمودار خطی", bar: "نمودار میله‌ای" },
          },
          restore: { title: "برگشت" },
          saveAsImage: { title: "ذخیره تصویر" },
        },
      },
      legend: {
        orient: "horizontal",
        bottom: 0,
        itemGap: 25,
        textStyle: {
          fontSize: 12,
        },
        data: ["درآمد", "فروخته شده", "باقیمانده", "کل موجودی"],
      },
      series: [
        {
          type: "line",
          name: total,
          xAxisIndex: 0,
          yAxisIndex: 0,
          encode: {
            x: event,
            y: total,
            tooltip: total,
          },
          markLine: {
            data: [{ type: "average", name: "میانگین" }],
            label: { formatter: "میانگین" },
          },
        },
        {
          type: "line",
          name: booked,
          xAxisIndex: 0,
          yAxisIndex: 0,
          encode: {
            x: event,
            y: booked,
            tooltip: booked,
          },
          markPoint: {
            data: [
              { type: "max", name: "حداکثر" },
              { type: "min", name: "حداقل" },
            ],
          },
          markLine: {
            data: [
              { type: "average", name: "میانگین" },
              [
                {
                  symbol: "none",
                  x: "85%",
                  yAxis: "max",
                },
                {
                  symbol: "circle",
                  label: {
                    position: "start",
                    formatter: "بیشترین فروش",
                  },
                  type: "max",
                  name: booked,
                },
              ],
            ],
          },
        },
        {
          type: "line",
          name: remaining,
          xAxisIndex: 0,
          yAxisIndex: 0,
          lineStyle: {
            type: "dashed",
          },
          encode: {
            x: event,
            y: remaining,
            tooltip: remaining,
          },
          markLine: {
            data: [{ type: "average", name: "میانگین" }],
          },
        },
        {
          type: "line",
          name: sales,
          xAxisIndex: 1,
          yAxisIndex: 1,
          encode: {
            x: event,
            y: sales,
            tooltip: sales,
          },
          markPoint: {
            data: [
              { type: "max", name: "حداکثر" },
              { type: "min", name: "حداقل" },
            ],
          },
          markLine: {
            data: [
              { type: "average", name: "میانگین" },
              [
                {
                  symbol: "none",
                  x: "85%",
                  yAxis: "max",
                },
                {
                  symbol: "circle",
                  label: {
                    position: "start",
                    formatter: "رکورد درآمد",
                  },
                  type: "max",
                  name: sales,
                },
              ],
            ],
          },
        },
      ],
    }),
    [colorBgContainer, chartData]
  );

  return (
    <ChartWrapper option={option} height="600px" className="min-w-[600px]" />
  );
};

export default StackedLineChart;
