import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <footer className="bg-orange-50">
        <div
          onClick={scrollToTop}
          className="h-[40px] cursor-pointer flex items-center justify-center bg-orange-100 mb-4 text-center"
        >
          Back to Top
        </div>
        <section className="footer_child w-1/1 pt-4 pb-8 md:pt-8 md:pb-16 border-b-2 flex flex-wrap flex-col md:flex-row content-between px-[20px]">
          <section className="mb-4 md:mb-0">
            <header className="text-lg font-semibold md:mb-4">
              About Foody
            </header>
            <section className="text-base">
              <p className="w-1/1 pr-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                officia debitis minus? Sequi quas corporis eos, sed sapiente
                repellat, facilis necessitatibus et voluptatum quaerat dolore
                sit veniam unde eius quae!
              </p>
            </section>
          </section>
          <section className="mb-4 md:mb-0">
            <header className="text-lg font-semibold md:mb-4">
              Quick links
            </header>
            <ul className="text-base">
              <li>
                <Link to={"/menu"}>Menu</Link>
              </li>
              <li>
                <Link to={"/service"}>Services</Link>
              </li>
              <li>
                <Link to={"/about"}>About</Link>
              </li>
              <li>
                <Link to={"/contact"}>Contact</Link>
              </li>
            </ul>
          </section>
          <section className="mb-4 md:mb-0">
            <header className="text-lg font-semibold md:mb-4">Get Help</header>
            <ul>
              <li className="uppercase">
                <Link to={"/#"}>How to order?</Link>
              </li>
              <li>
                <Link to={"/#"}>FAQs</Link>
              </li>
              <li>
                <Link to={"/#"}>Terms of Usage</Link>
              </li>
              <li>
                <Link to={"/#"}>Privacy | Policy</Link>
              </li>
            </ul>
          </section>
          <section className="mb-4 md:mb-0">
            <header className="text-lg font-semibold md:mb-4">
              Connect At
            </header>
            <ul>
              <li>
                <a
                  href={"https://facebook.com"}
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={"https://instagram.com"}
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="mailto:name@example.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Mail
                </a>
              </li>
            </ul>
          </section>
        </section>
        <section className="py-4 text-center text-[17px]">
          Copyright &copy; {new Date().getFullYear()} Foody. All Rights
          Reserved.
        </section>
      </footer>
    </>
  );
};

export default Footer;
