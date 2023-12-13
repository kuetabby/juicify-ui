"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import clsx from "clsx";
import { MenuOutlined } from "@ant-design/icons";

import PageTabs from "../PageTabs";
import { NavbarDrawer } from "./Drawer";

import { pacifico } from "@/utils/font";

import AppLogo from "@/assets/logo-app.png";

import "./style.css";

interface Props {}

const Navbar: React.FC<Props> = () => {
  const {
    isOpen: isScroll,
    onOpen: onOpenScroll,
    onClose: onCloseScroll,
  } = useDisclosure();
  const {
    isOpen: isOpenDrawer,
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
  } = useDisclosure();

  const [isEqual640] = useMediaQuery("(min-width: 640px)");

  useEffect(() => {
    if (isEqual640) {
      onCloseDrawer();
    }
  }, [isEqual640]);

  useEffect(() => {
    window?.addEventListener("scroll", handleScroll);
    return () => window?.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (e: Event) => {
    const { scrollY } = e.currentTarget as Window;
    if (scrollY > 160) {
      onOpenScroll();
    }
    if (scrollY === 0) {
      onCloseScroll();
    }
  };

  return (
    <div
      className={clsx(
        "navbar-container bg-transparent",
        // pathname === "/" ? "bg-transparent" : "bg-black",
        pacifico.className
      )}
    >
      {/* <div className={clsx(isScroll ? "navbar-scroll" : "navbar")}> */}
      <div className="navbar">
        <div className="w-1/4 sm:w-1/2 flex items-center justify-between">
          <Link href="/" className={`logo-container text-white`}>
            <Image
              src={AppLogo}
              alt="mystic-logo"
              className="w-14 lg:w-16 h-14 lg:h-16 rounded-full"
            />
            <div className="logo-text">JuicyFi</div>
          </Link>
        </div>
        <div className="w-full md:w-2/3 hidden sm:flex justify-end">
          <PageTabs containterClass="flex ml-2" />
        </div>
        {/* <div
          className={clsx("!hidden md:!flex justify-end w-1/3 font-semibold")}
        >
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-auto mr-4"
          >
            <Button
              className="w-full bg-olive-green hover:bg-mint-green active:bg-mint-green focus:bg-mint-green text-white"
              leftIcon={<DollarOutlined style={{ fontSize: "1.5em" }} />}
            >
              Buy Now!
            </Button>
          </Link>

          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-auto"
          >
            <Button
              className="w-full bg-lush-green hover:bg-forest-green active:bg-forest-green focus:bg-forest-green text-white"
              leftIcon={<LineChartOutlined style={{ fontSize: "1.5em" }} />}
            >
              Chart
            </Button>
          </Link>
        </div> */}

        {/* small devices */}
        <div className="sm:hidden w-1/4 text-right animate-fadeInBasic">
          <Button
            className="bg-pink-rose hover:bg-pink-rose active:bg-pink-rose focus:bg-emerald-green"
            onClick={onOpenDrawer}
          >
            <MenuOutlined
              className="font-extrabold text-white"
              style={{ fontSize: "1.5em" }}
            />
          </Button>
        </div>
      </div>
      <NavbarDrawer isOpen={isOpenDrawer} onClose={onCloseDrawer} />
    </div>
  );
};

export default Navbar;
