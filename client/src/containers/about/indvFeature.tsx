import React from "react";
import EasyToUse from "../../assets/easytouse.jpg";

type Props = {
  item: {
    id: number;
    title: string;
    description: string;
    url: string;
  };
};

const IndvFeatureAbout: React.FC<Props> = (props) => {
  const item = props.item;
  const [hoverCard, setHoverCard] = React.useState(false);

  return (
    <article
      className={`${
        hoverCard ? "scale-105 " : "scale-100"
      } min-w-[300px] min-h-[250px] mb-4 sm:mr-2 transition duration-500 ease-in-out relative text-white overflow-hidden hover:bg-orange-300 hover:transition-all px-3 py-2 rounded-xl`}
      style={{
        width: "22%",
        backgroundImage: `${
          hoverCard
            ? "linear-gradient(to top, rgba(253, 186, 140,1),  rgba(253, 186, 140,1)) "
            : "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0.4)) "
        }, url(${item.url})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center top",
        zIndex: `${hoverCard ? "1" : "0"}`,
      }}
      onMouseOver={() => setHoverCard(true)}
      onMouseOut={() => setHoverCard(false)}
      key={item.id}
    >
      <section
        className={`w-full absolute top-0 left-0 ${
          hoverCard ? " hidden " : "flex"
        } h-full justify-center items-center`}
      >
        <h3 className="text-2xl font-bold text-white">{item.title}</h3>
      </section>
      <section
        className={`transition duration-500 ease-in-out text-black ${
          hoverCard ? " block" : "invisible"
        }`}
      >
        <header className="text-2xl font-bold mb-2 text-center">
          {item.title}
        </header>
        <section className="text-base">{item.description}</section>
      </section>
    </article>
  );
};

export default IndvFeatureAbout;
