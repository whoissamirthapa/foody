import React from "react";

const Dashboard = () => {
    return (
        <>
            <section className="flex flex-row max-h-screen bg-[#2C3333] overflow-auto">
                <aside className="bg-[#395B64] min-w-[250px] h-screen">
                    Sidebar
                </aside>
                <main className="h-screen overflow-auto">
                    <section className="flex flex-row w-full flex-wrap justify-start px-4 py-4">
                        <div className="h-[300px] w-[500px] bg-[#395B64] shadow-lg rounded-xl m-4"></div>
                        <div className="h-[300px] w-[300px] bg-[#395B64] m-4"></div>
                        <div className="h-[300px] w-[1000px] bg-[#395B64] m-4"></div>
                        <div className="h-[300px] w-[500px] bg-[#395B64] m-4"></div>
                        <div className="h-[300px] w-[400px] bg-[#395B64] m-4"></div>
                        <div className="h-[300px] w-[700px] bg-[#395B64] m-4"></div>
                    </section>
                </main>
            </section>
        </>
    );
};

export default Dashboard;
