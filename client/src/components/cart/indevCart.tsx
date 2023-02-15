import React from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";

interface IndevCartProps {
  dish: {
    id: number;
    name: string;
    category: string;
    price: number;
    image: any;
    quantity: number;
    totalPrice: number;
  };
}
const IndvCartItem: React.FC<IndevCartProps> = (props) => {
  const dish = props.dish;
  return (
    <>
      <tr key={dish?.id} className="cart_tr">
        <td className="first_cart_tr_td flex justify-between flex-col sm:flex-row md:flex-col lg:flex-row">
          <div>
            <img
              src={dish?.image}
              alt=""
              height={"150px"}
              width={"150px"}
              className="object-contain"
              loading="lazy"
            />
          </div>
          <div className="text-start sm:text-end md:text-start lg:text-end  pl-2">
            <h5 className="text-semibold text-xl">{dish.name}</h5>
            <i>{dish.category}</i>
            <p className="text-semibold mb-3">
              <span className="text-orange-400">$</span>
              {dish.price}
            </p>
            <div className="flex justify-start sm:justify-end md:justify-start lg:justify-end">
              <button className="border-none text-red-700 flex items-center">
                <RiDeleteBin5Fill className="w-[15px] h-[15px] text-red-700" />{" "}
                Remove
              </button>
            </div>
          </div>
        </td>
        <td className="xs_cart_col font-bold text-lg text-center">Quantity</td>
        <td className="font-semibold text-center">
          <button className="border-none outline-none p-0 mr-2 text-2xl">
            -
          </button>
          <span className="border-2 border-orange-300 px-1.5 py-1 rounded-lg text-xl">
            {dish.quantity}
          </span>
          <button
            className={`${
              dish.quantity >= 5 && "opacity-30 cursor-not-allowed"
            } border-none outline-none p-0 ml-2 text-2xl`}
            disabled={dish.quantity >= 5}
          >
            +
          </button>
        </td>
        <td className="xs_cart_col font-bold text-lg text-center">Price</td>
        <td className="font-semibold text-xl text-center">
          <span className="text-orange-400">$</span>
          {dish.price}
        </td>
        <td className="xs_cart_col font-bold text-lg text-center">Total</td>
        <td className="font-semibold text-xl text-center">
          <span className="text-orange-400">$</span>
          {dish.totalPrice}
        </td>
      </tr>
    </>
  );
};

export default IndvCartItem;
