import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteProduct } from "../../actions/products";
import Button from "../reusable/Button";
import Modal from "../reusable/Modal";
import Table from "../table/Table";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const products = useSelector((state) => state.products);
  const data = React.useMemo(() => products, [products]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "product_name",
      },
      {
        Header: "Unit",
        accessor: "uom_name",
      },
      {
        Header: "Price Per Unit",
        accessor: "price_per_unit",
      },
      {
        Header: "Action",
        // id: "delete",
        accessor: "product_id",
        Cell: (row) => (
          <Button
            className="bg-red-500"
            aria-label="delete button"
            onClick={(e) => {
              e.preventDefault();
              dispatch(deleteProduct(row.cell.value));
            }}
          >
            Delete
          </Button>
        ),
      },
    ],
    [data]
  );

  return (
    <>
      <div className="bg-white shadow-lg max-w-5xl mx-auto rounded flex flex-col mt-5">
        <h1 className="text-xl text-black opacity-70 font-normal p-4 text-left border-b border-gray-300">
          Manage Products
        </h1>
        <div className="my-4 self-end">
          <Button
            onClick={() => setShowModal(true)}
            className="mr-4 bg-blue-700"
          >
            Add New Product
          </Button>
        </div>
        <Table columns={columns} data={data} />
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default Dashboard;
