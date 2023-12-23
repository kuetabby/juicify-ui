"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { CopyrightOutlined } from "@ant-design/icons";

import { useIsMounted } from "@/hooks/useIsMounted";

import AppTransparentLogo from "@/assets/logo-transparent.png";
import TwitterLogo from "@/assets/logo-twitter.png";
import TelegramLogo from "@/assets/logo-telegram.png";
import MediumLogo from "@/assets/logo-medium.png";
import GitbookLogo from "@/assets/logo-gitbook.png";

import { montserrat } from "@/utils/font";

import "./style.css";

interface Props {}

const AppFooter: React.FC<Props> = () => {
  if (!useIsMounted) {
    return null;
  }

  return (
    <footer className={clsx("app-footer bg-dark-fade", montserrat.className)}>
      <div className="app-footer-wrapper">
        <div className="w-full flex flex-wrap items-center mb-2">
          <div className="app-footer-title">
            <Image
              src={AppTransparentLogo}
              alt="logo-footer"
              className="w-14 h-14"
            />
            <span>JuicyFi</span>
          </div>
          <div className="w-full sm:w-1/2 flex justify-center sm:justify-end">
            <Link
              href="https://twitter.com/JuicyFiNetwork"
              target="_blank"
              rel="noopener noreferrer"
              className="w-auto hover:text-yellow-500"
            >
              <Image
                src={TwitterLogo}
                alt="tw-logo"
                className="w-10 lg:w-8 h-10 lg:h-8"
              />
            </Link>
            {/* <Link
              href="https://medium.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-auto mx-2 hover:text-green-500"
            >
              <Image
                src={MediumLogo}
                alt="dc-logo"
                className="w-10 lg:w-8 h-10 lg:h-8 !rounded-full"
              />
            </Link> */}
            <Link
              href="https://t.me/juicyfi"
              target="_blank"
              rel="noopener noreferrer"
              className="w-auto hover:text-yellow-500 mx-2"
            >
              <Image
                src={TelegramLogo}
                alt="tele-logo"
                className="w-10 lg:w-8 h-10 lg:h-8"
              />
            </Link>
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-auto hover:text-yellow-500"
            >
              <Image
                src={GitbookLogo}
                alt="whitepaper-logo"
                className="w-10 lg:w-8 h-10 lg:h-8"
              />
            </Link>
          </div>
        </div>

        <div className="all-reserved">
          <div className="w-full flex flex-wrap justify-center sm:justify-between items-center my-2">
            <Link
              href="mailto:admin@juicyfi.network"
              rel="noopener noreferrer"
              className="app-footer-email"
            >
              admin@juicyfi.network
            </Link>
            <div className="sm:ml-2 text-xs font-semibold">
              Copyright{" "}
              <CopyrightOutlined className="mx-1" style={{ fontSize: "1em" }} />{" "}
              2023. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
