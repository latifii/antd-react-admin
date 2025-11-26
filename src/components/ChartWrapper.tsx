import { useCallback, useEffect, useRef } from "react";
import { theme } from "antd";
import { debounce } from "lodash";
import { useAppSelector } from "../redux/store";
import { ECBasicOption } from "echarts/types/dist/shared";
import * as echarts from "echarts";

interface ChartWrapperProps {
  option: ECBasicOption;
  height?: string | number;
  className?: string;
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({
  option,
  height = "300px",
  className,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<echarts.EChartsType>(null);
  const {
    token: { padding, borderRadiusLG, colorBgContainer },
  } = theme.useToken();

  const lightTheme = useAppSelector((state) => state.themeSlice.lightTheme);

  const renderChart = useCallback(
    (
      chartRef: React.RefObject<HTMLDivElement | null>,
      options: ECBasicOption
    ) => {
      if (!chartRef.current) {
        throw new Error("Chart container not mounted");
      }
      const chartInstance = echarts.init(
        chartRef.current,
        lightTheme ? null : "dark",
        {
          renderer: "svg",
        }
      );
      chartInstance.setOption(options);
      chartInstanceRef.current = chartInstance;
      return chartInstance;
    },
    [lightTheme]
  );

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = renderChart(chartRef, option);
    chartInstanceRef.current = chart;

    const handleResize = debounce(() => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.resize();
      }
    }, 50);

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    resizeObserver.observe(chartRef.current);

    window.addEventListener("resize", handleResize);

    return () => {
      chart.dispose();
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [option, renderChart, chartRef]);

  return (
    <div
      ref={chartRef}
      className={` overflow-hidden ${className}`}
      style={{
        backgroundColor: colorBgContainer,
        padding: padding,
        borderRadius: borderRadiusLG,
        width: "100%",
        height: height,
        direction: "ltr",
      }}
    />
  );
};

export default ChartWrapper;
