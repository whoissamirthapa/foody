import React from "react";
import Easytouse from "../assets/easytouse.jpg";

const Test = () => {
  const [hoverCard, setHoverCard] = React.useState(false);

  return (
    <>
      <section className="my-24 flex sm:flex-row flex-col justify-between">
        <section>
          <article
            className={`${
              hoverCard ? "scale-105 " : "scale-100"
            } min-w-[300px] min-h-[250px] transition duration-500 ease-in-out relative text-white overflow-hidden hover:bg-orange-300 hover:transition-all px-3 py-2 rounded-xl`}
            style={{
              width: "24%",
              backgroundImage: `${
                hoverCard
                  ? "linear-gradient(to top, rgba(255,90,31,1),  rgba(255,90,31,1)) "
                  : "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0.4)) "
              }, url(${Easytouse})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center top",
            }}
            onMouseOver={() => setHoverCard(true)}
            onMouseOut={() => setHoverCard(false)}
          >
            <section
              className={`w-full absolute top-0 left-0 ${
                hoverCard ? " hidden " : "flex"
              } h-full justify-center items-center`}
            >
              <h3 className="text-2xl font-bold text-white">Easy to use</h3>
            </section>
            <section
              className={`transition duration-500 ease-in-out ${
                hoverCard ? " block" : "invisible"
              }`}
            >
              <header className="text-2xl font-bold mb-2 text-center">
                Easty to use
              </header>
              <section className="text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                sapiente tempora eveniet est laborum mollitia odit! Repellendus
                quos consequatur maiores blanditiis, recusandae odit eum
                deleniti! Deleniti asperiores non in natus!
              </section>
            </section>
          </article>
        </section>
      </section>
    </>
  );
};

export default Test;
