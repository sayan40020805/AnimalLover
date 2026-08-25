// src/components/Layout.jsx
import React from 'react';
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
    useEffect(() => {
        document.body.classList.remove("dark-mode");
    }, []);

    return (
        <>
            <Navbar />

            <main style={{ paddingTop: "80px" }}>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
