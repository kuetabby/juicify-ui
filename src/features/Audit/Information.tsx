import Image from "next/image";
import Link from "next/link";
import { CopyOutlined } from "@ant-design/icons";
import {
  Card,
  CardHeader,
  CardBody,
  List,
  ListItem,
  Divider,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CardFooter,
} from "@chakra-ui/react";

import { InformationTable } from "./InformationTable";

import { useCopyText } from "@/hooks/useCopyText";

import { shortenAddress } from "@/utils/address";

import { GoPlusTokenResponse, SupportedChainId } from "./models";
import { InformationOverview } from "./InformationOverview";
import { ChainInfo } from "./constants";
// import GoPlusLogo from "@/assets/goplus-logo.png";

interface Props {
  scanResponse: GoPlusTokenResponse;
  chainId: SupportedChainId;
  contractAddress: string;
  scanRefetch: () => void;
  onReset: () => void;
}

const urls = {
  dexScreener: "https://dexscreener.com",
  dexView: "https://www.dexview.com",
  dexTools: "https://www.dextools.io/app/en",
};

export const Information: React.FC<Props> = ({
  scanResponse,
  chainId,
  contractAddress,
  scanRefetch,
  onReset,
}) => {
  const {
    token_name,
    token_symbol,
    total_supply,
    owner_address,
    creator_address,
    is_honeypot,
    buy_tax,
    sell_tax,
    holders,
    dex,
    holder_count,
  } = scanResponse;

  const [copyContent] = useCopyText();

  const info = ChainInfo[chainId as keyof typeof ChainInfo];

  const isEmptyResponse = Object.keys(scanResponse).length === 0;

  return (
    <div className="w-full xl:w-[85%] mx-auto mt-10 relative">
      <div className="text-xl sm:text-2xl font-extrabold text-white mb-4 mx-auto sm:mx-0">
        Here's your audit result!
      </div>
      <div className="w-full flex flex-wrap justify-between mb-3">
        <div className="flex items-center">
          <Image src={info.logo} alt={info.label} className="w-8 h-8" />
          <div className="ml-2 font-semibold text-xl">
            CA : {contractAddress ? shortenAddress(contractAddress) : "-"}
            <CopyOutlined
              className="ml-2 cursor-pointer hover:text-secondary"
              onClick={() => copyContent(contractAddress)}
            />
          </div>
        </div>
        <div className="w-full sm:w-60 flex flex-wrap justify-around sm:justify-between mx-auto sm:mx-0 mt-4 sm:mt-0">
          <Button
            className={`w-5/12 sm:w-[45%] h-8 text-white`}
            onClick={scanRefetch}
            colorScheme="pink"
          >
            Refresh
          </Button>
          <Button
            colorScheme="whiteAlpha"
            className="w-5/12 sm:w-[45%] h-8"
            onClick={onReset}
          >
            Audit
          </Button>
        </div>
      </div>

      {isEmptyResponse ? (
        <Alert status="error" className="mt-4 rounded-xl">
          <AlertIcon />
          <AlertTitle className="text-red-500 font-bold">ERROR!</AlertTitle>
          <AlertDescription className="text-red-500">
            Did you choose the right chain? You scanned this contract on{" "}
            {info.code}.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="w-full flex flex-wrap justify-between relative">
          <div className="w-full h-full sm:w-1/2 mt-6 sm:mt-0">
            <Card className="w-full h-full bg-dark-secondary shadow-sunny rounded-lg text-white">
              <CardHeader className="pb-0 font-semibold text-xl">
                Project!
              </CardHeader>
              <CardBody>
                <List spacing={3}>
                  <ListItem className="w-full flex justify-between">
                    <div className="w-1/3 sm:w-2/5">Name</div>
                    <div className="w-3/5 sm:w-[55%] text-right font-bold">
                      {token_name?.toUpperCase() ?? "-"}
                    </div>
                  </ListItem>
                  <ListItem className="w-full flex justify-between">
                    <div className="w-1/3 sm:w-2/5">Symbol</div>
                    <div className="w-3/5 sm:w-[55%] text-right font-bold">
                      $ {token_symbol?.toUpperCase() ?? "-"}
                    </div>
                  </ListItem>
                  <ListItem className="w-full flex justify-between">
                    <div className="w-1/3 sm:w-2/5">Total Supply</div>
                    <div className="w-3/5 sm:w-[55%] text-right">
                      {total_supply
                        ? Number(total_supply).toLocaleString("en-US")
                        : "-"}
                    </div>
                  </ListItem>
                  <ListItem className="w-full flex justify-between">
                    <div className="w-1/3 sm:w-2/5">Creator</div>
                    <Link
                      href={`${info.explorer}/address/${
                        creator_address ?? "-"
                      }`}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="w-3/5 sm:w-[55%] text-right text-blue-500 underline underline-offset-4"
                    >
                      {creator_address
                        ? shortenAddress(creator_address)
                        : "unknown"}
                    </Link>
                  </ListItem>
                  <ListItem className="w-full flex justify-between">
                    <div className="w-1/3 sm:w-2/5">Owner</div>
                    <Link
                      href={`${info.explorer}/address/${owner_address ?? "-"}`}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="w-3/5 sm:w-[55%] text-right text-blue-500 underline underline-offset-4"
                    >
                      {owner_address
                        ? shortenAddress(owner_address)
                        : "unknown"}
                    </Link>
                  </ListItem>
                  <ListItem className="w-full flex justify-between">
                    <div className="w-1/3 sm:w-2/5">Explorer</div>
                    <Link
                      href={`${info.explorer}/token/${contractAddress ?? "-"}`}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="w-3/5 sm:w-[55%] text-right text-blue-500 underline underline-offset-4"
                    >
                      {contractAddress
                        ? shortenAddress(contractAddress)
                        : "unknown"}
                    </Link>
                  </ListItem>
                  <ListItem className="w-full flex justify-between">
                    <div className="w-1/3 sm:w-2/5">Honeypot Test</div>
                    <div className="w-3/5 sm:w-[55%] text-right font-bold">
                      {Number(is_honeypot) === 0 ? (
                        <span className="text-green-500">PASSED</span>
                      ) : (
                        <span className="text-red-500">FAILED</span>
                      )}
                    </div>
                  </ListItem>
                </List>
                <Divider className="my-4" />
                <div className="w-full">
                  <div>Tax Rate</div>
                  <div className="w-[13em] flex justify-between mt-3 font-semibold">
                    <div className="border border-white rounded-lg p-2">
                      {!!buy_tax ? (Number(buy_tax) * 100).toFixed(1) : "-"} %
                      Buy
                    </div>
                    <div className="border border-white rounded-lg p-2">
                      {!!sell_tax ? (Number(sell_tax) * 100).toFixed(1) : "-"} %
                      Sell
                    </div>
                  </div>
                </div>
              </CardBody>
              <CardFooter className="w-full pt-0">
                <div className="w-full flex flex-wrap justify-center mx-auto">
                  {/* md:w-4/5 lg:w-3/4 xl:w-3/5 2xl:w-1/2 */}
                  {dex && Boolean(dex.length) && (
                    <Link
                      href={`${urls.dexTools}/${info.dext}/pair-explorer/${dex[0].pair}`}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="text-base xs:text-lg text-blue-500 underline underline-offset-4"
                    >
                      DexTools
                    </Link>
                  )}

                  {Boolean(info.dexs) && (
                    <Link
                      href={`${urls.dexScreener}/${info.dexs}/${contractAddress}`}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="text-base xs:text-lg text-blue-500 underline underline-offset-4 mx-2 xl:mx-4"
                    >
                      DexScreener
                    </Link>
                  )}

                  {Boolean(info.dexv) && (
                    <Link
                      href={`${urls.dexView}/${info.dexv}/${contractAddress}`}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="text-base xs:text-lg text-blue-500 underline underline-offset-4"
                    >
                      DexView
                    </Link>
                  )}
                </div>
              </CardFooter>
            </Card>

            <InformationTable
              chainExplorer={info.explorer}
              dex={dex}
              holders={holders}
              holder_count={holder_count}
              extraClass="hidden sm:block"
            />
          </div>
          <div className="w-full h-full sm:w-[47.5%] mt-6 sm:mt-0">
            <InformationOverview scanResponse={scanResponse} />

            <InformationTable
              chainExplorer={info.explorer}
              dex={dex}
              holders={holders}
              holder_count={holder_count}
              extraClass="block sm:hidden"
            />
          </div>
          {/* <div className="mt-6 mb-3 relative mx-auto w-full sm:w-1/3 px-2 sm:px-0">
            <Image src={GoPlusLogo} alt="go+" className="object-contain" />
          </div> */}
        </div>
      )}
    </div>
  );
};
