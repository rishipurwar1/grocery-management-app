import React from "react";
import { useDispatch } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import { createProduct } from "../../actions/products";
import Button from "./Button";
import Label from "./Label";
import OrderInput from "./OrderInput";
import { uom } from "../../constants/constants";

const Modal = ({ showModal, setShowModal }) => {
  const dispatch = useDispatch();

  const formMethods = useForm();
  const { handleSubmit, register, reset } = formMethods;

  const onSubmit = async (data) => {
    await dispatch(createProduct(data));
    setShowModal(!showModal);
    reset();
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-2xl my-6 mx-auto">
              {/*content*/}
              <div className="border-0 rounded shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-lg font-medium">Add New Product</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    x
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <FormProvider {...formMethods}>
                    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                      <div className="flex flex-col text-left">
                        <Label children="Product Name" />
                        <OrderInput
                          type="text"
                          inputName="product_name"
                          className="w-72"
                        />
                      </div>
                      <div className="flex flex-col text-left">
                        <Label children="Unit" />
                        <select
                          className="w-full p-3 placeholder-blueGray-300 bg-gray-100 text-blueGray-600 rounded-md border focus:outline-none border border-gray-200 transition text-xs"
                          name="uom_id"
                          id="uom_id"
                          {...register("uom_id", { required: true })}
                        >
                          {uom.map((uom) => {
                            return (
                              <option value={uom.uom_id} key={uom.uom_id}>
                                {uom.uom_name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="flex flex-col text-left">
                        <Label children="Price Per Unit" />
                        <OrderInput type="number" inputName="price_per_unit" />
                      </div>
                      <div className="flex items-center justify-end py-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                        <Button type="submit" className="bg-blue-700">
                          Save
                        </Button>
                      </div>
                    </form>
                  </FormProvider>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
