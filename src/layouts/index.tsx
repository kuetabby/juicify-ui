"use client";
import React, { PropsWithChildren } from "react";
import clsx from "clsx";

import Navbar from "./Navbar";
import Footer from "./Footer";

import Provider from "@/library/Provider";

import { montserrat } from "@/utils/font";

import "./style.css";

interface Props extends PropsWithChildren {}

const BaseLayout: React.FC<Props> = ({ children }) => {
  return (
    <Provider>
      <Navbar />
      <div
        // src={AppBackground}
        // alt="app-bg"
        //   className="w-full h-[50vw] absolute top-0 left-0 bg-cover bg-center lg:bg-top bg-no-repeat brightness-[0.65]"
        className="app-background bg-app"
      />
      <main className={clsx("base-main-container", montserrat.className)}>
        {children}
      </main>
      <Footer />
    </Provider>
  );
};

export default BaseLayout;
