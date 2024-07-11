import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "../redux/slices/CartSlice";
import { AiFillDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./SweetAlert.css";

const Card = ({ shoe }) => {
  const cart = useSelector((state) => state.cart);
  // console.log(shoe);
  const img = shoe.original_picture_url;
  const price = shoe.retail_price_cents;
  const desc = shoe.story_html;
  const id = shoe.id;

  const shoeQty = cart?.filter((item) => item.id === id)[0]?.qty || 1;

  const dispatch = useDispatch();

  const add = () => {
    dispatch(addToCart(shoe));
    toast.success("Added to cart");
  };

  const remove = (itemIdx) => {
    console.log({ itemIdx });
    dispatch(removeFromCart(itemIdx));
    toast.error("Removed item from cart");
  };

  const toggleRemoveModal = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this item form your cart",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes",
      customClass: {
        confirmButton: "outlined-button",
      },
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire("Deleted!", "Your file has been deleted.", "success");
        remove(id);
      }
    });
  };

  const increase = (id) => {
    dispatch(increaseQty(id));
  };

  const decrease = (id) => {
    if (shoeQty === 1) {
      toggleRemoveModal(id);
    } else dispatch(decreaseQty(id));
  };

  return (
    <div>
      <div className="w-[300px] h-[420px] shadow-sm rounded-2xl p-4 bg-slate-50 dark:bg-[#1f1b24] dark:hover:bg-[#121015] dark:text-white dark:outline-none dark:border-none border border-slate-100 outline outline-slate-100  hover:shadow-2xl relative">
        <div className=" flex flex-col gap-6">
          <div>
            <img
              src={img}
              width={200}
              height={200}
              alt="shoe"
              className="mx-auto"
            />
            <Link to={`/preview/${id}`}>
              <button className="absolute bg-slate-600 dark:bg-slate-800 dark:font-semibold text-white text-xs p-1 top-2 right-2 rounded-md animate-pulse">
                preview
              </button>
            </Link>
          </div>

          <p className="text-base font-medium max-h-[96px] overflow-y-hidden">
            {desc.split(" ").slice(0, 20).join(" ") + "..."}
          </p>

          <div className="flex  items-center justify-between">
            {cart.some((item) => item.id === shoe.id) ? (
              <div>
                <div className="flex gap-x-6">
                  <p className="flex ">
                    <button
                      className="p-1 mr-2 bg-[#dadada] dark:bg-[#2a2a2a] dark:hover:bg-black dark:border-none border rounded-lg font-bold w-[30px]"
                      onClick={() => decrease(shoe.id)}
                    >
                      -
                    </button>
                    <span className="text-lg font-bold">{shoeQty}</span>
                    <button
                      className="p-1 ml-2 bg-[#dadada] dark:bg-[#2a2a2a] dark:hover:bg-black dark:border-none border rounded-lg font-bold w-[30px]"
                      onClick={() => increase(shoe.id)}
                    >
                      +
                    </button>
                  </p>
                  <div className="text-red-800  bg-red-200 group hover:bg-red-400 transition-transform duration-300 cursor-pointer rounded-full p-2 ml-2">
                    <AiFillDelete onClick={() => toggleRemoveModal(shoe.id)} />
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={add}
                className="bg-black dark:bg-slate-800 dark:hover:bg-black text-white p-2 rounded-md text-sm "
              >
                Add to Cart
              </button>
            )}
            <span className="text-xl font-semibold">₹ {price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
