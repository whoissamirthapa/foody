import React, { useState, useRef, useEffect } from "react";
import { heroLanding, homeFruitslider, featuredDish } from "../../dummyData";
import "./home.css";
import AOS from "aos";
import "aos/dist/aos.css";

import BikeDelivery from "../../assets/deliveryicon.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { IoCart } from "react-icons/io5";
import HomeMenu from "../../components/home/ourMenu";
import { Link } from "react-router-dom";
import { Label, Textarea, TextInput } from "flowbite-react";

import { Feature, Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";
import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import { Point } from "ol/geom";
import { Vector } from "ol/source";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import Footer from "../../components/footer";
import NavbarTop from "../../components/navbar";
import { Helmet } from "react-helmet";

export type cartItemsType = {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  totalPrice: number;
};

const Home: React.FC = () => {
  const [cartItems, setCartItems] = React.useState<cartItemsType[]>([]);

  //-----Map Start
  const [map, setMap] = useState<object>();
  const mapElement = useRef<any>();

  const mapRef = useRef<object>();
  mapRef.current = map;

  const iconFeature = new Feature({
    geometry: new Point(fromLonLat([83.443862, 27.682773])), //This marker will not move.
    name: "Butwal",
  });
  useEffect(() => {
    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new Vector({
            features: [iconFeature],
          }),
          style: new Style({
            image: new Icon({
              color: "#ff5a1f",
              anchor: [0.5, 46],
              crossOrigin: "anonymous",
              anchorXUnits: "fraction",
              anchorYUnits: "pixels",
              src: "https://openlayers.org/en/latest/examples/data/icon.png",
            }),
          }),
        }),
      ],
      view: new View({
        // center: transform([83.443862, 27.682773], "EPSG:4326", "EPSG:3857"),
        center: fromLonLat([83.443862, 27.682773]),
        zoom: 13,
        maxZoom: 30,
        minZoom: 2,
      }),
    });
    setMap({ ...initialMap });
  }, []);

  //----Map End

  useEffect(() => {
    AOS.init({
      offset: 10,
      duration: 600,
      easing: "ease-in-sine",
      delay: 100,
    });
  }, []);
  return (
    <React.Fragment>
      <Helmet>
        <title>Home | Foody</title>
      </Helmet>
      <NavbarTop />
      <div className="px-[3px] md:px-[20px]">
        <section className="md:flex justify-between mt-8">
          <section className="md:w-1/2 md:h-1/1 flex flex-col align-center justify-center">
            <div>
              <span className="rounded-full py-[5px] px-[10px] text-sm bg-orange-200 text-orange-500 text-bold">
                Home delivery{" "}
                <span className="rounded-full p-[1px] bg-white">
                  <img
                    src={BikeDelivery}
                    className="inline"
                    height="25px"
                    width="25px"
                    alt=""
                  />{" "}
                </span>
              </span>
            </div>
            <h1 className="text-[40px] md:text-[50px] lg:text-[60px] mt-4 md:leading-[4rem] lg:leading-[5rem] font-extra-bold">
              The Fastest
              <br /> Delivery in{" "}
              <span className="text-orange-400">
                Your <br />
                City
                <br />
              </span>
            </h1>
            <section className="mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
              debitis impedit dolorem, minima architecto expedita quae animi
              pariatur est delectus vitae quasi maxime ipsa perspiciatis nihil,
              ad tenetur. Molestiae, sunt alias ab et aliquid perspiciatis!
              Commodi ad cupiditate quod, magnam qui id accusamus laudantium
              sapiente modi itaque harum tempora quidem eos vero ab laborum nam
              delectus. Neque, architecto praesentium.
            </section>
            <section className="my-8">
              <button className=" rounded-full px-8  py-[0.8rem] bg-orange-400 text-white transition ease-in-out duration-200 hover:shadow-lg">
                Order now
              </button>
            </section>
          </section>
          <section className="landing_home_hero pt-12 sm:w-10/12 xs:m-auto md:w-1/2">
            <section className="landing_home_hero_child sm:w-9/12 h-full m-auto flex flex-wrap justify-center content-between">
              {heroLanding.map((item) => {
                return (
                  <article
                    className="indv_hero flex flex-col justify-around mr-4 sm:mb-16 mb-4 md:mb-4 pb-4 sm:max-h-[250px] min-w-[180px] sm:max-w-[170px]"
                    key={item.id}
                    data-aos="fade-down-right"
                  >
                    <div className="h-1/2 w-10/12 m-auto">
                      <img
                        src={item.image}
                        className="w-full mt-[-50px]"
                        alt=""
                      />
                    </div>
                    <div className="h-1/2 text-center pt-2">
                      <div className="font-bold text-xl mb-2">{item.name}</div>
                      <div className=" mb-2">{item.category}</div>
                      <div className="font-semibold">
                        <span className="text-orange-400 text-xl">$</span>
                        {item.price}
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>
          </section>
        </section>
        {/* ---------Featured Dish--------*/}
        <section className="mt-24">
          <header className="text-xl mb-4 font-bold border-l-4 border-orange-400 pl-1">
            Featured Dishes
          </header>
          <section className=" mb-12 flex featured_items flex-wrap justify-between">
            {featuredDish.map((dish) => {
              return (
                <article
                  className=" flex flex-col indv_featured_item mb-8 min-w-[250px]"
                  key={dish.id}
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
        </section>

        {/* ---------Fresh and Healthy Item--------*/}
        <section className="mt-24 mb-12">
          <header className="text-xl mb-4 font-bold border-l-4 border-orange-400 pl-1">
            Our Fresh &amp; Healthy Food
          </header>
          <section role={"home_fruit_sliders"}>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              mousewheel={true}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                1536: {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
              }}
              modules={[FreeMode, Mousewheel, Pagination]}
              className="mySwiper"
            >
              {homeFruitslider?.map((item, index) => {
                return (
                  <SwiperSlide key={item.id}>
                    <article className="flex justify-between p-4 items-center bg-white rounded-md h-[12rem]">
                      <section className="w-1/2">
                        <img
                          src={item.image}
                          className="h-full hover:scale-125 transition duration-1000 ease-in-out"
                          alt=""
                        />
                      </section>
                      <section>
                        <h3 className="text-lg font-semibold text-end">
                          {item.name}
                        </h3>
                        <p className="text-end italic">{item.category}</p>
                        <p className="text-end font-bold text-lg">
                          <span className="text-orange-400">$</span>
                          {item.price}
                        </p>
                        <div className="flex flex-wrap justify-end items-center mt-2">
                          {/* <button
                            className="border-[1px] border-black px-2 py-0 rounded-md text-sm mr-2"
                            onClick={() => {}}
                          >
                            -
                          </button>{" "}
                          <span className="text-lg">0</span>{" "}
                          <button
                            className="border-[1px] border-black  px-2 py-0 rounded-md text-sm ml-2 mr-4"
                            onClick={() => {}}
                          >
                            +
                          </button> */}
                          <button>
                            <IoCart className="text-orange-500 w-[40px] h-[40px]" />
                          </button>
                        </div>
                      </section>
                    </article>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </section>
        </section>

        {/* ---------Our Menu--------*/}
        <HomeMenu infoMenuPage="home" />

        {/* ---------About--------*/}
        <section className="mt-24 mb-4">
          <header className="text-xl mb-4 font-bold border-l-4 border-orange-400 pl-1">
            About
          </header>
          <section className="homeabout px-8 md:px-24 lg:px-40 py-8 h-auto text-white text-center flex flex-col items-center">
            <h3 className="text-2xl mb-4">About Us</h3>
            <p className="mb-4 lg:px-24 text-lg">
              <span className="border-b-2 border-orange-400">Foody</span> is the
              fastest, easiest and most convenient way to enjoy the best food of
              your favourite restaurants at home, at the office or wherever you
              want to.
            </p>
            <p className="lg:px-24">
              We know that your time is valuable and sometimes every minute in
              the day counts. That’s why we deliver! So you can spend more time
              doing the things you love.
            </p>
            <div className="mt-4">
              <Link to={"/about"}>
                <button className="px-4 py-2 bg-orange-400 text-white">
                  Learn More
                </button>
              </Link>
            </div>
          </section>
        </section>

        {/* ---------Contact--------*/}
        <section className="mt-24 mb-24">
          <header className="text-xl mb-4 font-bold border-l-4 border-orange-400 pl-1">
            Contact
          </header>
          <section className="flex flex-col md:flex-row justify-between bg-white px-4 md:px-0">
            <section className="home_contact_indv">
              <div
                style={{ height: "100%", width: "100%" }}
                ref={mapElement}
                className="map-container"
              />
            </section>
            <section className="home_contact_indv py-8 pr-4">
              <header className="text-xl mb-4">Do you have Any Queries?</header>
              <section className="w-1/1">
                <form
                  className="flex flex-col w-1/1 block gap-4"
                  style={{ width: "100%" }}
                >
                  <section className="flex justify-between w-1/1">
                    <div style={{ width: "49%" }}>
                      <div className="mb-2 block">
                        <Label htmlFor="name" value="Your name" />
                      </div>
                      <TextInput
                        id="name"
                        type="text"
                        placeholder="Your name"
                        required={true}
                      />
                    </div>
                    <div style={{ width: "49%" }}>
                      <div className="mb-2 block">
                        <Label htmlFor="location" value="Your location" />
                      </div>
                      <TextInput
                        id="location"
                        type="text"
                        placeholder="Your location"
                        required={true}
                      />
                    </div>
                  </section>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="email1" value="Your email" />
                    </div>
                    <TextInput
                      id="email1"
                      type="email"
                      placeholder="name@gmail.com"
                      required={true}
                    />
                  </div>

                  <div id="textarea">
                    <div className="mb-2 block">
                      <Label htmlFor="message" value="Your message" />
                    </div>
                    <Textarea
                      id="message"
                      placeholder="Leave a message..."
                      required={true}
                      rows={4}
                    />
                  </div>
                  <button
                    className="px-1.32 py-2 w-[100px] text-white bg-orange-400 rounded-md"
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              </section>
            </section>
          </section>
        </section>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
