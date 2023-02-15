import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Footer from "../../components/footer";
import HomeMenu from "../../components/home/ourMenu";
import NavbarTop from "../../components/navbar";
import { menuPageSelector } from "../../dummyData";

const MenuPage: React.FC = () => {
  const [infoMenuState, changeMenuInfo] = React.useState({
    activeMenu: { id: 1, name: "All" },
    menus: menuPageSelector,
  });

  const activeToggle = (index: number) => {
    changeMenuInfo({
      ...infoMenuState,
      activeMenu: infoMenuState.menus[index],
    });
  };

  const toggleActiveStyle = (index: number) => {
    if (infoMenuState.menus[index] === infoMenuState.activeMenu) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    activeToggle(1);
  }, []);

  return (
    <>
      <Helmet>
        <title>Menu | Foody</title>
      </Helmet>
      <NavbarTop />
      <div className="px-[3px] md:px-[20px]">
        <header className="header_menu_page min-h-[400px] px-4 md:px-12 lg:px-32 text-center flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl mb-4">Menu</h1>
          <p className="md:px-32 text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec Lorem
            ipsum dolor sit, amet consectetur adipisicing elit. Facere assumenda
            repellendus distinctio officiis eum nisi sapiente quidem neque quia,
            ad, fugit aut blanditiis necessitatibus voluptate consequuntur porro
            quos animi officia.
          </p>
        </header>
        <section className="mt-4 md:mt-16 mb-4 md:mb-12">
          <header className="hidden md:flex flex-wrap justify-center items-center">
            {menuPageSelector?.map((item) => {
              return (
                <button
                  className={`${
                    toggleActiveStyle(item.id)
                      ? "bg-orange-400 text-white px-4 mt-2 py-2 rounded mr-1 hover:bg-orange-400 hover:shadow-lg hover:text-white"
                      : "bg-white px-4 mt-2 py-2 rounded mr-1 hover:bg-orange-400 hover:shadow-lg hover:text-white"
                  }`}
                  onClick={() => activeToggle(item.id)}
                  key={item.id}
                >
                  {item.name}
                </button>
              );
            })}
          </header>
          <header className="md:hidden flex flex-wrap justify-between items-center">
            <h2 className="text-xl text-semibold">Filter Menu</h2>
            <div>
              <select
                className="border-orange-300 focus:border-orange-500"
                name=""
                defaultValue={"all"}
              >
                {menuPageSelector?.map((item) => {
                  return (
                    <option
                      value={item.name.trim().toLocaleLowerCase()}
                      key={item.id}
                    >
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </header>
          <HomeMenu infoMenuPage={"menu"} />
        </section>
      </div>
      <Footer />
    </>
  );
};

export default MenuPage;
