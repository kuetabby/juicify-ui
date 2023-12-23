import Image from "next/image";
import { NumberFormatValues, NumericFormat } from "react-number-format";
import { Input, useDisclosure } from "@chakra-ui/react";
import { DownOutlined } from "@ant-design/icons";

import { SelectCurrencyTo } from "../Select/CurrencyTo";

import type { MixerState } from "../@models";

import "../style.css";

interface Props {
  state: MixerState;
  onChangeReceiveMixerAmount: (e: NumberFormatValues) => void;
  onChangeReceiveMixerCurrency: (
    curr: string,
    network: string,
    name: string,
    imageUrl: string
  ) => void;
}

export const Receive: React.FC<Props> = ({
  state,
  onChangeReceiveMixerAmount,
  onChangeReceiveMixerCurrency,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="w-3/4 sm:w-[45%] mx-auto sm:mx-0 mt-10 sm:mt-0">
      <div className="w-full flex items-center justify-between">
        <div className="text-xs font-semibold">You Receive</div>
        <div className="mx-2">{state.name.toUpperCase()}</div>
      </div>
      <div className="w-full flex items-center justify-between border-[3px] border-white rounded-lg">
        <NumericFormat
          className="w-4/5 lg:w-[90%] !border-none !shadow-none !outline-none pointer-events-none font-semibold"
          // getInputRef={inputRef}
          value={state.amount}
          onValueChange={onChangeReceiveMixerAmount}
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
            width={25}
            height={25}
            className="mr-2"
          />
          {/* <div className="mx-2">{state.currency.toUpperCase()}</div> */}
          <DownOutlined />
        </div>
      </div>
      <SelectCurrencyTo
        isOpen={isOpen}
        state={state}
        onChangeReceiveMixerCurrency={onChangeReceiveMixerCurrency}
        onClose={onClose}
      />
    </div>
  );
};
