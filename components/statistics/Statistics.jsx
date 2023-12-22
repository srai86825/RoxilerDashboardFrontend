"use client";
import { months } from "@/utils";
import { useEffect, useState } from "react";
import { MonthPicker } from "..";

const Statistics = () => {
  const [month, setMonth] = useState(3);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        // console.log(month);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/statistics?month=${
            month ? month : ""
          }`
        );
        const { data } = await res.json();
        // console.log(data);
        setData(data);
      } catch (error) {
        console.log("Error fetching statistics: " + error);
      }
    };

    (async () => {
      await fetchData();
      setLoading(false);
    })();
  }, [month]);
  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-10">
        <h2 className="mr-10 text-2xl heading-color">
          Statistics -{" "}
          {loading ? (
            " loading..."
          ) : (
            <span className="font-bold">{months[month]}</span>
          )}
        </h2>
        <MonthPicker month={month} setMonth={setMonth} />
      </div>

      <div>
        <div className="flex flex-row justify-between">
          <p>Total Sale: </p>
          <p className="font-semibold">
            {loading ? "loading..." : data.totalSaleAmount}
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <p>Total sold items: </p>
          <p className="font-semibold">
            {loading ? "loading..." : data.totalSoldItems}
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <p>Total not sold Sale: </p>
          <p className="font-semibold">
            {loading ? "loading..." : data.totalNotSoldItems}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
