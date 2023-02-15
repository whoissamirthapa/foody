import React, { useEffect } from "react";
import { IoCart } from "react-icons/io5";
import { Link } from "react-router-dom";
import { featuredDish } from "../../../dummyData";
import AOS from "aos";
import "aos/dist/aos.css";

export interface Props {
  infoMenuPage: string;
}
const HomeMenu: React.FC<Props> = (props) => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 600,
      easing: "ease-in-sine",
      delay: 100,
    });
  }, []);
  return (
    <section
      className={props.infoMenuPage === "home" ? `mt-24 pb-4` : `mt-8 pb-4`}
    >
      {props.infoMenuPage === "home" && (
        <header className="text-xl flex flex-wrap items-center justify-between mb-4 border-l-4 border-orange-400 pl-1">
          <div className="font-bold">Our Menu</div>
          <div>
            <select defaultValue={"Filter"} className="border-orange-400">
              <option disabled value={"Filter"}>
                Filter
              </option>
              <option value={"chicken"}>Chicken</option>
              <option value={"curry"}>Curry</option>
              <option value={"rice"}>Rice</option>
              <option value={"fish"}>Fish</option>
              <option value={"fruits"}>Fruits</option>
              <option value={"icecream"}>Ice Cream</option>
              <option value={"burger"}>Burger</option>
              <option value={"pizza"}>Pizza</option>
              <option value={"softdrinks"}>Soft Drinks</option>
            </select>
          </div>
        </header>
      )}
      <section className="pb-4 flex featured_items flex-wrap justify-between">
        {featuredDish.map((dish) => {
          return (
            <article
              className=" flex flex-col indv_featured_item mb-8 w-2/12 min-w-[250px]"
              key={dish.id}
              data-aos="zoom-in"
            >
              <div className="h-9/12 mb-2 object-contain overflow-hidden">
                <img
                  src={dish.image}
                  className="w-1/1 hover:scale-125 transition duration-500 ease-in-out"
                  alt=""
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="text-lg font-semibold">{dish.name}</div>
                <div className="flex items-center">
                  <div className="mr-4 font-bold">
                    <span className="font-bold text-orange-400">$</span>
                    {dish.price}
                  </div>
                  <div>
                    <button>
                      <IoCart className="text-orange-500 w-[30px] h-[30px]" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>
      {props.infoMenuPage !== "menu" && (
        <section className="flex justify-center">
          <Link to={"/menu"}>
            <button className="px-4 py-2 bg-orange-400 text-white  hover:shadow-lg transition duration-300 linear">
              More menu
            </button>
          </Link>
        </section>
      )}
    </section>
  );
};

export default HomeMenu;
