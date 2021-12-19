import React, { useEffect } from "react";
import Button from "../reusable/Button";
import Table from "../table/Table";
import { useSelector } from "react-redux";
import { getOrders } from "../../actions/orders";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getOrders());
    // dispatch(getProducts());
  }, [dispatch]);
  const orders = useSelector((state) => state.orders);

  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        accessor: "datetime",
      },
      {
        Header: "Order Number",
        accessor: "order_id",
      },
      {
        Header: "Customer Name",
        accessor: "customer_name",
      },
      {
        Header: "Total Cost",
        accessor: "total",
      },
    ],
    []
  );

  const data = React.useMemo(() => orders, [orders]);
  return (
    <div className="bg-white shadow-lg max-w-5xl mx-auto rounded flex flex-col mt-5">
      <h1 className="text-xl text-black opacity-70 font-normal p-4 text-left border-b border-gray-300">
        Grocery Store Management System
      </h1>
      <div className="my-4 self-end">
        <Button
          className="bg-blue-700 mr-2"
          onClick={() => navigate("/products")}
        >
          Manage Products
        </Button>
        <Button
          className="bg-blue-700 mr-4"
          onClick={() => navigate("/create")}
        >
          New Order
        </Button>
      </div>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Dashboard;
