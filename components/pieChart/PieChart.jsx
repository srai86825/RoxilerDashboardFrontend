"use client";
import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";

import { months } from "@/utils";
import { MonthPicker } from "@/components";

const PieChartComponent = () => {
  const [month, setMonth] = useState(3);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        // console.log(month);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/charts/pieChart?month=${
            month ? month : ""
          }`
        );
        const { data } = await res.json();
        // console.log(data);
        setData(data);
      } catch (error) {
        console.log("Error fetching PieChart: "+error);
      }
    };

    (async () => {
      await fetchData();
      setLoading(false);
    })();
  }, [month]);

  return (
    <div>
      <div className="flex flex-row justify-between items-center heading-color">
        <h2 className="mr-10 text-2xl">
          PieChart -{" "}
          {loading ? (
            " loading..."
          ) : (
            <span className="font-bold">{months[month]}</span>
          )}
        </h2>
        <MonthPicker month={month} setMonth={setMonth} />
      </div>

      {data && (
        <PieChart
          series={[
            {
              data: data.map((d, i) => {
                const temp = { ...d };
                temp["value"] = d.count;
                temp["label"] = d.category;
                delete temp["count"];
                delete temp["category"];
                return temp;
              }),
            },
          ]}
          width={500}
          height={200}
        />
      )}
    </div>
  );
};

export default PieChartComponent;
