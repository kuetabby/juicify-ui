import Image from "next/image";
import { NumberFormatValues, NumericFormat } from "react-number-format";
import { Input, useDisclosure } from "@chakra-ui/react";
import { DownOutlined } from "@ant-design/icons";

import { SelectCurrencyFrom } from "../Select/CurrencyFrom";

import type { MixerState } from "../@models";

import "../style.css";

interface Props {
  state: MixerState;
  onChangeSendMixerAmount: (e: NumberFormatValues) => void;
  onChangeSendMixerCurrency: (
    curr: string,
    network: string,
    name: string,
    imageUrl: string
  ) => void;
}

export const Send: React.FC<Props> = ({
  state,
  onChangeSendMixerAmount,
  onChangeSendMixerCurrency,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="w-3/4 sm:w-[45%] mx-auto sm:mx-0">
      <div className="w-full flex items-center justify-between">
        <div className="text-xs font-semibold">You Send</div>
        <div className="mx-2">{state.name.toUpperCase()}</div>
      </div>
      <div className="w-full flex items-center justify-between border-[3px] border-white rounded-lg">
        <NumericFormat
          className="w-4/5 lg:w-[90%] border-none !shadow-none !outline-none font-semibold"
          // getInputRef={inputRef}
          value={state.amount}
          onValueChange={onChangeSendMixerAmount}
          thousandSeparator=","
          decimalSeparator="."
          decimalScale={7}
          allowNegative={false}
          maxLength={18}
          customInput={Input}
        />
        <div
          className="w-1/5 lg:w-[10%] flex justify-end items-center cursor-pointer hover:opacity-70 mr-2"
          onClick={onOpen}
        >
          <Image
            src={state.imageUrl}
            alt="send-network-icon"
            width={30}
            height={30}
            className="mr-2"
          />
          {/* <div className="mx-2">{state.currency.toUpperCase()}</div> */}
          <DownOutlined />
        </div>
      </div>
      <SelectCurrencyFrom
        isOpen={isOpen}
        state={state}
        onChangeSendMixerCurrency={onChangeSendMixerCurrency}
        onClose={onClose}
      />
    </div>
  );
};
