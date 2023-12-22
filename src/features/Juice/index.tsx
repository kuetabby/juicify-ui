"use client";
import { useEffect, useState } from "react";
import { Button, Input, useDisclosure, useToast } from "@chakra-ui/react";
import { NumberFormatValues } from "react-number-format";

import { Send } from "./Send";
import { Receive } from "./Receive";

import Loader from "@/components/Loader";

import useDebounce from "@/hooks/useDebounce";
import { useIsMounted } from "@/hooks/useIsMounted";

import { useEstimateExchange } from "./api/useEstimateExchange";
// import { useAddressValidation } from "./api/useAddressValidation";
import { useCreateExchange } from "./api/useCreateExchange";

import { MixerState, MixerType } from "./models";

import "./style.css";

interface Props {}

const initialSendMixer: MixerState = {
  network: "eth",
  currency: "eth",
  name: "ETH (ERC20)",
  imageUrl: "/uploads/eth_f4ebb54ec0.svg",
  amount: "0.1",
};

const initialReceiveMixer: MixerState = {
  network: "eth",
  currency: "usdt",
  name: "USDT (ERC20)",
  imageUrl: "/uploads/usdterc20_5ae21618aa.svg",
  amount: "",
};

const Juice: React.FC<Props> = () => {
  const [sendMixer, setSendMixer] = useState(initialSendMixer);
  const [receiveMixer, setReceiveMixer] = useState(initialReceiveMixer);
  const [typeMixer, setTypeMixer] = useState(MixerType.FIXED);

  const [recipientAddress, setRecipientAddress] = useState("");
  const debounceRecipientAddress = useDebounce(recipientAddress, 200);

  const isMounted = useIsMounted();
  const { isOpen: isClicked, onClose, onOpen } = useDisclosure();
  const toast = useToast();

  const { mutateAsync: createExchange, isLoading: isLoadingCreateExchange } =
    useCreateExchange();

  const {
    data: estimateExchange,
    isSuccess: isSuccessEstimate,
    isLoading: isLoadingEstimate,
  } = useEstimateExchange({
    flowType: typeMixer,
    fromAmount: sendMixer.amount,
    fromCurrency: sendMixer.currency,
    fromNetwork: sendMixer.network,
    toAmount: receiveMixer.amount,
    toCurrency: receiveMixer.currency,
    toNetwork: receiveMixer.network,
  });

  // const { data: isAddressValid } = useAddressValidation({
  //   address: debounceRecipientAddress,
  //   network: sendMixer.network,
  //   toggle: isClicked,
  //   closeToggle: onClose,
  // });

  useEffect(() => {
    if (isSuccessEstimate && estimateExchange) {
      setReceiveMixer((state) => ({
        ...state,
        amount: String(estimateExchange?.toAmount),
      }));
    }
  }, [estimateExchange, isSuccessEstimate]);

  const onChangeSendMixerCurrency = (
    curr: string,
    network: string,
    name: string,
    imageUrl: string
  ) => {
    setSendMixer((state) => ({
      ...state,
      currency: curr,
      network,
      imageUrl,
      name,
    }));
  };

  const onChangeSendMixerAmount = (values: NumberFormatValues) => {
    setSendMixer((state) => ({
      ...state,
      amount: values.value,
    }));
  };

  const onChangeReceiveMixerCurrency = (
    curr: string,
    network: string,
    name: string,
    imageUrl: string
  ) => {
    setReceiveMixer((state) => ({
      ...state,
      currency: curr,
      network,
      imageUrl,
      name,
    }));
  };

  const onChangeReceiveMixerAmount = (values: NumberFormatValues) => {
    setReceiveMixer((state) => ({
      ...state,
      amount: values.value,
    }));
  };

  const onChangeTypeMixer = (type: MixerType) => {
    setTypeMixer(type);
  };

  const onChangeRecipientAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientAddress(e.target.value);
  };

  const onCreateExchange = async () => {
    const DataJSON = {
      fromAmount: sendMixer.amount,
      fromCurrency: sendMixer.currency,
      fromNetwork: sendMixer.network,
      toCurrency: receiveMixer.currency,
      toNetwork: receiveMixer.network,
      toAmount: "",
      address: debounceRecipientAddress,
      flow: typeMixer,
      type: "direct",
      rateId: typeMixer === MixerType.FIXED ? estimateExchange?.rateId : "",
    };

    try {
      const request = await createExchange(DataJSON);
      const response = await request;

      return response;
    } catch (error: any) {
      console.error(error);
      let errorMessage = "An error occurred while processing your request";
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMessage = error.response.data.message || error.response.data;
        status = error.response.status;
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = "No response received";
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = error.message;
      }
      toast({
        title: errorMessage,
        status: "error",
      });
    }
  };

  if (!isMounted) {
    return <Loader />;
  }

  return (
    <div className="juice-container">
      <div id="juice" className="h-12 md:h-20 relative" />
      <div className="w-full md:w-11/12 h-full relative mx-auto">
        <h1 className={`app-juice-title`}>Lightning cryptocurrency exchange</h1>

        <div className="h-12 md:h-20 relative" />
        <div className="flex flex-wrap justify-between items-center">
          <Send
            state={sendMixer}
            onChangeSendMixerAmount={onChangeSendMixerAmount}
            onChangeSendMixerCurrency={onChangeSendMixerCurrency}
          />
          {/* <div className="w-full text-center mt-4 mb-2">
            <SwitchIcon style={{ fontSize: "1.5em" }} />
          </div> */}

          {/* <div className="w-full h-14 md:h-20" /> */}
          <Receive
            state={receiveMixer}
            onChangeReceiveMixerAmount={onChangeReceiveMixerAmount}
            onChangeReceiveMixerCurrency={onChangeReceiveMixerCurrency}
          />
        </div>

        <div className="h-8 relative" />
        <div className="w-3/4 sm:w-full mx-auto">
          <span className="text-xs font-semibold">Recipient</span>
          <Input
            value={recipientAddress}
            onChange={onChangeRecipientAddress}
            className="w-full my-2 py-1 border-2 border-white focus:border-white !shadow-none !outline-none"
            color={"white"}
            placeholder="Your Recipient Address"
            _placeholder={{
              textColor: "white",
            }}
          />
        </div>

        <div className="h-6 relative" />
        <div className="w-3/4 sm:w-full mx-auto flex flex-wrap justify-between items-center">
          <div className="w-full sm:w-2/3 flex flex-wrap items-center">
            <div className="w-full sm:w-2/12 lg:w-[5em]">
              <span className="text-xs sm:text-sm font-semibold">
                Order type
              </span>
            </div>
            <div className="w-full sm:w-4/5 flex justify-center sm:justify-start">
              <Button
                className={`w-1/2 sm:w-24 border-2 ${
                  typeMixer === MixerType.FIXED
                    ? "border-pink-500"
                    : "border-white"
                } rounded-tr-none rounded-br-none !bg-transparent text-white`}
                onClick={() => onChangeTypeMixer(MixerType.FIXED)}
              >
                Fixed
              </Button>
              <Button
                className={`w-1/2 sm:w-24 border-2 ${
                  typeMixer === MixerType.FLOAT
                    ? "border-pink-500"
                    : "border-white"
                }  rounded-tl-none rounded-bl-none border-l-0 !bg-transparent text-white`}
                onClick={() => onChangeTypeMixer(MixerType.FLOAT)}
              >
                Float
              </Button>
            </div>
          </div>
          <div className="w-full sm:w-1/4 mt-4 sm:mt-0 text-center sm:text-end">
            <Button
              colorScheme="pink"
              isDisabled={!recipientAddress}
              onClick={onCreateExchange}
              isLoading={isLoadingEstimate || isLoadingCreateExchange}
            >
              Exchange now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Juice;
