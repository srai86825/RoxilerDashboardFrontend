"use client";
import { BarChart } from "@mui/x-charts/BarChart";
import { useState, useEffect } from "react";

import { months } from "@/utils";
import { MonthPicker } from "@/components";

const BarChartComponent = () => {
  const [month, setMonth] = useState(3);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        console.log(month);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/charts/barChart?month=${
            month ? month : ""
          }`
        );
        const { data } = await res.json();
        console.log(data);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };

    (async () => {
      await fetchData();
      setLoading(false);
    })();
  }, [month]);

  return (
    <div className="mb-20">
      <div className="flex flex-row justify-between items-center">
        <h2 className="mr-10 text-2xl heading-color">
          BarChart -{" "}
          {loading ? (
            " loading..."
          ) : (
            <span className="font-bold">{months[month]}</span>
          )}
        </h2>
        <MonthPicker month={month} setMonth={setMonth} />
      </div>

      {data && (
        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: data.map((d) => {
                return d.range;
              }),
            },
          ]}
          series={[
            {
              data: data.map((d) => {
                return parseInt(d.count);
              }),
            },
          ]}
          height={300}
          className="min-w-full"
        />
      )}
    </div>
  );
};
export default BarChartComponent;
