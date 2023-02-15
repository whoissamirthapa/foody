import { Label, Textarea, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";

import { ImLocation2 } from "react-icons/im";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

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
import { useDispatch } from "react-redux";
import { CONTACTUS_REQUEST } from "../../saga/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const ContactPage = () => {
  const dispatch = useDispatch();

  const contactResponse = useSelector(
    (state: RootState) => state.companyProfile?.contactUsData
  );

  //----- Map Start
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

  //----- Map End

  const [contactInfo, setContactInfo] = useState({
    name: "",
    address_location: "",
    email: "",
    mobile_no: "",
    subject: "",
  });
  const [message, setMessage] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo({ ...contactInfo, [name]: value });
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      contactInfo.name.trim() === "" ||
      contactInfo.address_location.trim() === "" ||
      contactInfo.mobile_no.trim() === "" ||
      contactInfo.subject.trim() === "" ||
      message.trim() === ""
    ) {
      alert("Please fill all the fields");
      return;
    }
    setLoadingSubmit(true);
    const contactInfoData = { ...contactInfo, message };
    dispatch({ type: CONTACTUS_REQUEST, payload: contactInfoData });
    setLoadingSubmit(false);
  };

  console.log(contactResponse);
  return (
    <>
      <Helmet>
        <title>Contact | Foody</title>
      </Helmet>
      <NavbarTop />
      <div className="px-[3px] md:px-[20px]">
        <header className="header_contact_page min-h-[400px] px-4 md:px-12 lg:px-32 text-center flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl mb-4">Contact Us</h1>
          <p className="md:px-32 text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec Lorem
            ipsum dolor sit, amet consectetur adipisicing elit. Facere assumenda
            repellendus distinctio officiis eum nisi sapiente quidem neque quia,
            ad, fugit aut blanditiis necessitatibus voluptate consequuntur porro
            quos animi officia.
          </p>
        </header>
        <section className="mt-2 mb-16 md:mb-24">
          <header className="text-2xl md:text-3xl mt-8 md:mt-16 text-center mb-8 font-semibold">
            Do you have any feedback or queries?
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
              <header className="text-xl mb-4">Get Started</header>
              <section className="w-1/1">
                <form
                  className="flex flex-col w-1/1 block gap-4"
                  style={{ width: "100%" }}
                  onSubmit={handleSubmit}
                >
                  <section className="flex justify-between w-1/1">
                    <div style={{ width: "49%" }}>
                      <div className="mb-2 block">
                        <Label htmlFor="name" value="Your name*" />
                      </div>
                      <TextInput
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your name"
                        value={contactInfo.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div style={{ width: "49%" }}>
                      <div className="mb-2 block">
                        <Label
                          htmlFor="address_location"
                          value="Your location*"
                        />
                      </div>
                      <TextInput
                        id="address_location"
                        name="address_location"
                        type="text"
                        placeholder="Your location"
                        value={contactInfo.address_location}
                        onChange={handleInputChange}
                      />
                    </div>
                  </section>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="mobile_no" value="Your Number*" />
                    </div>
                    <TextInput
                      id="mobile_no"
                      name="mobile_no"
                      type="number"
                      placeholder="9840000000"
                      value={contactInfo.mobile_no}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="email" value="Your email" />
                    </div>
                    <TextInput
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@gmail.com"
                      value={contactInfo.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="subject" value="Your subject*" />
                    </div>
                    <TextInput
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="Subject"
                      value={contactInfo.subject}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div id="textarea">
                    <div className="mb-2 block">
                      <Label htmlFor="message" value="Your message*" />
                    </div>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Leave a message..."
                      rows={4}
                      value={message}
                      onChange={handleMessageChange}
                    />
                  </div>
                  <button
                    className="px-1.32 py-2 w-[100px] text-white bg-orange-400 rounded-md"
                    type="submit"
                    disabled={loadingSubmit}
                  >
                    {loadingSubmit ? "Sending..." : "Send"}
                  </button>
                </form>
              </section>
            </section>
          </section>
          <section className="triangle mt-8 md:mt-16 text-white min-h-[400px] pb-[100px] pt-4 md:pt-8 px-4 flex flex-wrap items-center justify-around">
            <section className="text-center  mt-4 sm:mt-0 min-w-[170px]">
              <header className="flex flex-col items-center justify-center">
                <span className="inline-block sm:mb-4 flex items-center justify-center bg-white text-orange-400 w-[60px] h-[60px] rounded-full">
                  <ImLocation2 className="w-[30px] h-[30px]" />
                </span>
                <h3 className="text-2xl">Address</h3>
              </header>
              <section className="text-base">
                <p>
                  32907 Maharaj Road
                  <br />
                  Butwal, Nepal
                </p>
              </section>
            </section>
            <section className="text-center mt-4 sm:mt-0 min-w-[170px]">
              <header className="flex flex-col items-center justify-center">
                <span className="inline-block sm:mb-4 flex items-center justify-center bg-white text-orange-400 w-[60px] h-[60px] rounded-full">
                  <FaPhoneAlt className="w-[30px] h-[30px]" />
                </span>
                <h3 className="text-2xl">Phone</h3>
              </header>
              <section className="text-base">
                <p>
                  <a href="telto:+977075">+977 0754826</a>
                  <br />
                  <a href="telto:+97798">+977 9856819888</a>
                </p>
              </section>
            </section>
            <section className="text-center mt-4 sm:mt-0 min-w-[170px]">
              <header className="flex flex-col items-center justify-center">
                <span className="inline-block sm:mb-4 flex items-center justify-center bg-white text-orange-400 w-[60px] h-[60px] rounded-full">
                  <IoMdMail className="w-[30px] h-[30px]" />
                </span>
                <h3 className="text-2xl">Email</h3>
              </header>
              <section className="text-base">
                <p>
                  <a href="mailto:name@gmail.com">name@gmail.com</a>
                  <br />
                  <a href="mailto:contact@example.com">contact@example.com</a>
                </p>
              </section>
            </section>
          </section>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
