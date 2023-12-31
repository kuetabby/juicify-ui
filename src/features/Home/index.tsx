"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@chakra-ui/react";
import { SwapRightOutlined } from "@ant-design/icons";

import { AppFeature } from "./Feature";
import { AppTokenomics } from "./Tokenomics";
import { AppFindUs } from "./FindUs";

import Loader from "@/components/Loader";

import { useIsMounted } from "@/hooks/useIsMounted";

import AppBackground from "@/assets/bg-app.png";

import "./style.css";

interface Props {}

const Home: React.FC<Props> = () => {
  const [isWelcomeVisible, setIsWelcomeVisible] = useState(false);

  const welcomeRef = useRef<HTMLDivElement | null>(null);

  const isMounted = useIsMounted();

  useEffect(() => {
    if (isMounted) {
      const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        setIsWelcomeVisible(entry.isIntersecting);
      });

      observer.observe(welcomeRef.current as HTMLDivElement);
    }
  }, [isMounted]);

  if (!isMounted) {
    return <Loader />;
  }

  return (
    <div className="homepage-container">
      <div id="welcome" className="h-12 md:h-20 relative" />
      <div className="w-full h-full relative">
        <div
          ref={welcomeRef}
          className={`w-full md:w-1/3 lg:w-1/5 h-14 md:h-24 flex flex-wrap items-center text-2xl font-bold ${
            isWelcomeVisible && "animate-fadeInLame"
          }`}
        >
          Welcome To <span className="app-name m-auto">JuicyFi</span>
        </div>

        <div className="h-4 md:h-6" />
        <div className="w-full sm:w-1/2 lg:w-1/3 flex items-baseline xs:text-xl sm:text-2xl font-bold">
          {/* Explore a new era of financial possibilities today. */}
          {/* Experience the power of privacy, security, and growth potential with
          JuicyFi. Explore a new era of financial possibilities today */}
          Your gateway to a secure and private financial ecosystem.
        </div>
        <div className="mt-4 mb-6 text-sm sm:text-base font-semibold">
          0xaf0E63457b2542B75fcEb6AA066D3DE420A6D88e
        </div>
        <Link
          href="/"
          // target="_blank"
          // rel="noopener noreferrer"
        >
          <Button
            className="w-[8.5em] bg-pink-light hover:bg-pink-rose active:bg-pink-rose focus:bg-pink-rose text-white shadow-sunny hover:shadow-rose ml-2 sm:ml-0"
            rightIcon={<SwapRightOutlined style={{ fontSize: "1.5em" }} />}
          >
            Whitepaper
          </Button>
        </Link>

        <Link
          href="https://app.uniswap.org/tokens/ethereum/0xaf0E63457b2542B75fcEb6AA066D3DE420A6D88e"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            className="w-[8em] bg-pink-light hover:bg-pink-rose active:bg-pink-rose focus:bg-pink-rose text-white shadow-sunny hover:shadow-rose ml-6"
            rightIcon={<SwapRightOutlined style={{ fontSize: "1.5em" }} />}
          >
            Buy Now
          </Button>
        </Link>
      </div>

      <AppFeature />
      <AppFindUs />
      <AppTokenomics />
    </div>
  );
};

export default Home;
