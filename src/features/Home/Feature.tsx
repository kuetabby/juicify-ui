"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import { ArrowRightOutlined } from "@ant-design/icons";

import JuiceLogo from "@/assets/logo-mixer.png";
import AuditLogo from "@/assets/logo-audit.png";
import StakeLogo from "@/assets/logo-stake.png";

import "./style.css";

interface Props {}

export const AppFeature: React.FC<Props> = () => {
  const [isFeaturesVisible, setIsFeaturesVisible] = React.useState(false);

  const featuresRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setIsFeaturesVisible(entry.isIntersecting);
    });

    observer.observe(featuresRef.current as HTMLDivElement);
  }, []);

  return (
    <>
      <div id="features" className="h-20 md:h-24 relative" />
      <div className="w-full h-full relative px-2 mx-auto">
        <h1
          ref={featuresRef}
          className={`app-features ${
            isFeaturesVisible && "animate-slideInTopBasic"
          }`}
        >
          EMBRACE JUICYFI: ELEVATE YOUR JOURNEY WITH CUTTING-EDGE FEATURES
        </h1>

        <div className="w-full md:w-11/12 flex flex-wrap justify-between mx-auto mt-10 mb-5">
          <Card className="bg-transparent shadow-rose w-full h-auto sm:w-[47.5%] xl:w-[30%] font-semibold">
            <Image
              src={JuiceLogo}
              alt="juice-logo"
              className="w-40 h-40 mt-4 mx-auto rounded-full shadow-sunny"
            />
            <CardHeader className="card-features-header">
              Juice Crypto
            </CardHeader>
            <CardBody className="text-white pt-0">
              {/* <div className="card-features-body-subtitle">
                Offering enhanced privacy and security by mixing
                cryptocurrencies
              </div> */}
              Crypto Juice feature ensures unparalleled privacy and security in
              your transactions. By seamlessly blending cryptocurrencies, it
              offers enhanced confidentiality, safeguarding your financial
              activities within a secure and anonymous environment
            </CardBody>
            <CardFooter className="pt-0 mx-auto">
              <Link href="/" target="_blank" rel="noopener noreferrer">
                <Button
                  rightIcon={<ArrowRightOutlined />}
                  className="bg-pink-light hover:bg-pink-rose active:bg-pink-rose focus:bg-pink-rose text-white mt-4 shadow-sunny"
                >
                  Juice Now
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="bg-transparent shadow-rose w-full h-auto sm:w-[47.5%] xl:w-[30%] font-semibold my-6 sm:my-0">
            <Image
              src={AuditLogo}
              alt="audit-logo"
              className="w-40 h-40 mt-4 mx-auto rounded-full shadow-sunny"
            />
            <CardHeader className="card-features-header">
              Audit Tools
            </CardHeader>
            <CardBody className="text-white pt-0">
              {/* <div className="mb-3">
                Providing comprehensive tools for auditing smart contracts
              </div> */}
              JuicyFi's specialized Audit Tools meticulously review and verify
              smart contracts across multiple networks within the blockchain.
              This comprehensive auditing process ensures transparency and
              heightened security, fortifying the integrity and reliability of
              smart contracts across JuicyFi's expansive network
            </CardBody>
            <CardFooter className="pt-0 mx-auto">
              <Link href="/" target="_blank" rel="noopener noreferrer">
                <Button
                  rightIcon={<ArrowRightOutlined />}
                  className="bg-pink-light hover:bg-pink-rose active:bg-pink-rose focus:bg-pink-rose text-white mt-4 shadow-sunny"
                >
                  Audit Now
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="bg-transparent shadow-rose w-full h-auto sm:w-[47.5%] xl:w-[30%] mx-auto xl:mx-0 font-semibold sm:mt-8 xl:mt-0">
            <Image
              src={StakeLogo}
              alt="stake-logo"
              className="w-40 h-40 mt-4 mx-auto rounded-full shadow-sunny"
            />
            <CardHeader className="card-features-header">Staking</CardHeader>
            <CardBody className="text-white pt-0">
              {/* <div className="mb-3">
                Allowing users to earn rewards by participating in staking and
                contributing to network security
              </div> */}
              Participate in JuicyFi's Staking feature to earn rewards while
              strengthening the ecosystem. By staking your assets, you
              contribute directly to the platform's stability and growth,
              earning passive income as you support JuicyFi's expansion
            </CardBody>
            <CardFooter className="pt-0 mx-auto">
              <Link href="/" target="_blank" rel="noopener noreferrer">
                <Button
                  rightIcon={<ArrowRightOutlined />}
                  className="bg-pink-light hover:bg-pink-rose active:bg-pink-rose focus:bg-pink-rose text-white mt-4 shadow-sunny"
                >
                  Stake Now
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};
