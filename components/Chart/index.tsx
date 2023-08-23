import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import useWebSocket from "react-use-websocket";
import Avator from "@/assets/avator.png";

function Chart({
  coin = "BTC",
  onConnected = (state: number, data: any) => {},
}) {
  const [chartData, setChartData] = useState({
    InstitutionalFuture: [],
    RetailFuture: [],
    InstitutionalSpot: [],
    RetailSpot: [],
  });

  const {
    lastJsonMessage,
    readyState,
  }: { lastJsonMessage: any; readyState: number } = useWebSocket(
    `wss://web3tinkle.com:30001/subscribe?coin=${coin}`,
    {
      shouldReconnect: () => true,
      reconnectAttempts: 6,
      retryOnError: true,
      reconnectInterval: 100000,
    }
  );

  useEffect(() => {
    onConnected(readyState, lastJsonMessage);

    if (lastJsonMessage !== null) {
      const [
        InstitutionalFutureData,
        RetailFutureData,
        InstitutionalSpotData,
        RetailSpotData,
      ] = lastJsonMessage;
      const parseData = (
        data: [
          {
            time: string;
            net_flow: number;
          }
        ]
      ) => {
        return data?.map((item) => [item.time, item.net_flow / 1000000]);
      };

      const newData: any = {
        InstitutionalFuture: parseData(InstitutionalFutureData?.data) || [],
        RetailFuture: parseData(RetailFutureData?.data) || [],
        InstitutionalSpot: parseData(InstitutionalSpotData?.data) || [],
        RetailSpot: parseData(RetailSpotData?.data) || [],
      };
      setChartData(newData);
    }
  }, [lastJsonMessage, readyState]);

  const option = {
    grid: {
      top: 60,
      bottom: 70,
      right: 20,
      left: 60,
    },
    graphic: [
      {
        type: "text",
        id: "watermark",
        z: -10,
        left: "center",
        top: "middle",
        rotation: 170,
        style: {
          text: "Tinkle", // 设置水印文字内容
          fill: "rgba(0, 0, 0, 0.2)", // 设置水印文字颜色
          fontSize: 40,
          fontWeight: 800,
        },
      },
    ],
    legend: {
      show: true,
      type: "plain",
      right: 10,
      top: 0,
      itemWidth: 5,
      itemHeight: 5,
      data: [
        {
          name: "InstitutionalFuture",
          icon: "circle", // 使用圆点样式
        },
        {
          name: "RetailFuture",
          icon: "circle", // 使用圆点样式
        },
        {
          name: "InstitutionalSpot",
          icon: "circle", // 使用圆点样式
        },
        {
          name: "RetailSpot",
          icon: "circle", // 使用圆点样式
        },
      ],
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "time",
    },
    yAxis: {
      type: "value",
      name: "Funds",
      nameGap: 25,
      axisLabel: {
        formatter: "{value}m",
        margin: 15,
      },
    },
    series: [
      {
        name: "InstitutionalFuture",
        type: "bar",
        data: chartData.InstitutionalFuture,
        barMinWidth: 4,
        itemStyle: {
          color: "rgb(255, 142, 0)",
        },
      },
      {
        name: "RetailFuture",
        type: "bar",
        data: chartData.InstitutionalSpot,
        barMinWidth: 4,
        itemStyle: {
          color: "rgba(0,0,0)",
        },
      },
      {
        name: "InstitutionalSpot",
        type: "bar",
        data: chartData.RetailFuture,
        barMinWidth: 4,
        itemStyle: {
          color: "rgb(144, 93, 255)",
        },
      },
      {
        name: "RetailSpot",
        type: "bar",
        data: chartData.RetailSpot,
        barMinWidth: 4,
        itemStyle: {
          color: "rgb(245, 4, 211)",
        },
      },
    ],
  };

  return (
    <div className="chart-wrap">
      <ReactECharts option={option} style={{ height: "500px" }} />
    </div>
  );
}

export default Chart;
