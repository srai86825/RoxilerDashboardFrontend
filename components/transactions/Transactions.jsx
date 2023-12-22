"use client";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import Image from "next/image";

import { dataGridCustomToolbar } from "@/components";
import { months } from "@/utils";

const Transactions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [month, setMonth] = useState(3);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    setData({});

    try {
      const fetchTransactions = async () => {
        // console.log("Fetching transactions: " + isLoading);
        // console.log(paginationModel);
        // console.log("month: " + month);
        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_SERVER_DOMAIN
          }/transactions?search=${search}&page=${
            paginationModel.page + 1
          }&perPage=${paginationModel.pageSize}&month=${month ? month : ""}`
        );
        const { data } = await res.json();
        // console.log(data);
        setData(data);
      };

      fetchTransactions().then(() => {
        setIsLoading(false);
      });
    } catch (error) {
      console.log("Error fetching transactions: " + error);
    }
  }, [paginationModel, search, month]);

  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <div className="p-5">
          <Image
            src={params.value}
            className="mix-blend-multiply object-cover"
            width={100}
            height={100}
            alt="product-image"
          />
        </div>
      ),
    },
    {
      field: "_id",
      headerName: "ID",
      width: 150,
      sortable: false,
    },
    {
      field: "title",
      headerName: "Title",
      width: 220,
      sortable: false,
    },
    {
      field: "description",
      headerName: "Description",
      width: 300,
      sortable: false,
    },
    {
      field: "price",
      headerName: "Price",
      width: 90,
      sortable: false,
      renderCell: (param) => `$${Number(param.value).toFixed(2)}`,
    },
    {
      field: "category",
      headerName: "Category",
      sortable: false,
      width: 130,
    },
    {
      field: "sold",
      headerName: "Sold",
      width: 70,
      sortable: false,
    },
  ];

  return (
    <div className="flex flex-col max-w-full mt-20">
      <div className="min-w-full flex justify-center">
        <p className="text-bold-500 text-2xl heading-color">
          Transactions Dashboard -
          <span className="font-bold">{isLoading ? " loading..." : ' ' +months[month]}</span>
        </p>
      </div>
      <DataGrid
        rows={(data && data.transactions) || []}
        columns={columns}
        loading={!data}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 10 } },
        }}
        onPaginationModelChange={(p) => setPaginationModel(p)}
        rowCount={(data && data.total) || 0}
        paginationMode="server"
        getRowId={(row) => row._id}
        rowHeight={95}
        pageSizeOptions={[10, 50, 100]}
        slots={{ toolbar: dataGridCustomToolbar }}
        slotProps={{
          toolbar: { setSearch, searchText, setSearchText, month, setMonth },
        }}
        // width={{ width: 400 }}
      />
    </div>
  );
};

export default Transactions;
