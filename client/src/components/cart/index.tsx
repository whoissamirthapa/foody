import { Label, Modal, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { cartItems } from "../../dummyData";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import IndvCartItem from "./indevCart";

type Props = {
  modal: boolean;
  setModal: (modal: boolean) => void;
};

const Cart: React.FC<Props> = (props) => {
  const modal = props.modal;
  const setModal = props.setModal;
  const navigate = useNavigate();

  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [totalPircewithShipping, setTotalPriceWithShipping] =
    useState(totalCartPrice);

  const handleShipping = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShipping(Number(e.target.value));
  };

  useEffect(() => {
    let total = totalCartPrice;
    total += shipping;
    setTotalPriceWithShipping(total);
  }, [shipping]);

  useEffect(() => {
    let temp = 0;
    for (let i = 0; i < cartItems.Items.length; i++) {
      //temp += cartItems.Items[i].price * cartItems.Items[i].quantity;
      temp += cartItems.Items[i].totalPrice;
    }
    setTotalCartPrice(temp);
  }, [cartItems]);

  const handleGoShopFromCart = () => {
    setModal(!modal);
    navigate("/menu");
  };
  return (
    <>
      <section>
        <Modal show={modal} size={"7xl"} onClose={() => setModal(!modal)}>
          <Modal.Body>
            <section className="w-full flex md:flex-row flex-col justify-between">
              <section className="cart_left  md:px-8 mb-4 lg:mb-0 bg-transparent">
                <header className="flex justify-between pb-3 text-2xl border-b-2 border-orange-300 font-bold">
                  <div>Shopping Cart</div>
                  <div>{cartItems.Items.length} Items</div>
                </header>

                <section className="w-full md:max-h-[550px] overflow-auto mt-4">
                  <table className="w-full max-h-[500px]">
                    <thead className="cart_table_head">
                      <tr className="cart_head_tr">
                        <th className="w-1/2 text-start">Product Details</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems ? (
                        cartItems?.Items?.map((dish) => {
                          return <IndvCartItem dish={dish} key={dish.id} />;
                        })
                      ) : (
                        <div>Loading...</div>
                      )}
                    </tbody>
                  </table>
                </section>
              </section>

              {/* ------------Order Summary------------*/}
              <section className="cart_right bg-[#f1f1f1] md:py-0 py-8 lg:mb-0 lg px-2 rounded-md flex flex-col justify-center">
                <header className="text-2xl border-b-2 border-orange-300 md:px-4 pb-3 font-bold">
                  Order Summery
                </header>
                <section className="mt-4">
                  <header className="flex flex-wrap justify-between">
                    <div className="text-xl font-semibold">
                      {cartItems.Items.length === 1 ? "Item" : "Items"}
                      &nbsp;{cartItems.Items.length}
                    </div>
                    <div className="text-xl font-semibold">
                      <span className="text-orange-400">$</span>
                      {totalCartPrice}
                    </div>
                  </header>
                  <section className="pb-8 border-b-[1px] border-orange-300">
                    <form className="flex flex-col gap-4 my-4">
                      <div id="select">
                        <div className="mb-2 block text-lg">
                          <Label htmlFor="shipping" value="Shipping" />
                        </div>
                        <Select
                          id="shipping"
                          className="focus:border-orange-400"
                          name="shipping"
                          required={true}
                          value={shipping}
                          onChange={handleShipping}
                        >
                          <option value={0}>0-4KM ($0)</option>
                          <option value={1}>5-9KM ($1)</option>
                          <option value={3}>10-14 ($3)</option>
                          <option value={5}>Above 15KM ($5)</option>
                        </Select>
                      </div>
                    </form>
                    <form>
                      <div className="mb-2 block">
                        <Label htmlFor="promocode" value="Promo Code" />
                      </div>
                      <TextInput
                        id="promocode"
                        type="text"
                        placeholder="Enter your code"
                      />
                      <div className="mt-4">
                        <button className="bg-red-500 px-4 py-2 text-white rounded-lg hover:shadow-lg">
                          Apply
                        </button>
                      </div>
                    </form>
                  </section>
                </section>
                <section className="mt-4">
                  <section className="text-xl flex flex-wrap justify-between">
                    <div className="font-semibold">Total Cost</div>
                    <div className="font-bold">
                      <span className="text-orange-400">$</span>
                      {totalPircewithShipping}
                    </div>
                  </section>
                  <div className="mt-8">
                    <button className="w-full bg-orange-400 py-3 text-white uppercase hover:shadow-xl rounded-lg">
                      CheckOut
                    </button>
                  </div>
                </section>
              </section>
            </section>
          </Modal.Body>
          <Modal.Footer>
            <section className="w-full md:px-8 flex flex-wrap justify-between items-center">
              <div>
                <button
                  onClick={handleGoShopFromCart}
                  className="border-none block flex items-center text-orange-700 hover:text-orange-500 hover:underline"
                >
                  <BsArrowLeft className="mr-2" /> Continue to Order
                </button>
              </div>
              <div>
                <button
                  className="block text-red-600 border-2 border-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white"
                  onClick={() => setModal(!modal)}
                >
                  Cancel
                </button>
              </div>
            </section>
          </Modal.Footer>
        </Modal>
      </section>
    </>
  );
};

export default Cart;
