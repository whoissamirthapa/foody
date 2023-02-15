import React from "react";
import Footer from "../../components/footer";
import NavbarTop from "../../components/navbar";

const Error404 = () => {
    return (
        <>
            <NavbarTop />
            <section className="min-h-screen flex items-center justify-center">
                <div className="text-lg md:text-2xl">
                    <h2>404 Error | Page not found</h2>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Error404;
