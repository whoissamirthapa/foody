import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import { cartItemsType } from "../../../containers/home";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { IoCart } from "react-icons/io5";

type itemType = {
  item: {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
  };
};

const HealthyHomeFruit: React.FC<itemType> = ({ item }) => {
  const [qtyForCart, setQtyForCart] = React.useState(0);
  return (
    <>
      <SwiperSlide>
        <article className="flex justify-between p-4 items-center bg-white rounded-md h-[12rem]">
          <section className="w-1/2">
            <img src={item.image} className="h-full" alt="" />
          </section>
          <section>
            <h3 className="text-lg font-semibold text-end">{item.name}</h3>
            <p className="text-end italic">{item.category}</p>
            <p className="text-end font-bold text-lg">
              <span className="text-orange-400">$</span>
              {item.price}
            </p>
            <div className="flex flex-wrap justify-end items-center mt-2">
              <button
                className="border-[1px] border-black px-2 py-0 rounded-md text-sm mr-2"
                onClick={() => setQtyForCart(qtyForCart - 1)}
              >
                -
              </button>{" "}
              <span className="text-lg">{qtyForCart}</span>{" "}
              <button
                className="border-[1px] border-black  px-2 py-0 rounded-md text-sm ml-2 mr-4"
                onClick={() => setQtyForCart(qtyForCart + 1)}
              >
                +
              </button>
              <button>
                <IoCart className="text-orange-500 w-[40px] h-[40px]" />
              </button>
            </div>
          </section>
        </article>
      </SwiperSlide>

      {/* <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide> */}
    </>
  );
};

export default HealthyHomeFruit;
