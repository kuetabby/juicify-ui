import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  InputGroup,
  InputLeftElement,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { SearchOutlined } from "@ant-design/icons";

import useDebounce from "@/hooks/useDebounce";

import { list_tokens } from "../utils/tokens";

import type { MixerState, Token } from "../models";

interface Props {
  state: MixerState;
  isOpen: boolean;
  onChangeSendMixerCurrency: (
    curr: string,
    network: string,
    name: string,
    imageUrl: string
  ) => void;
  onClose: () => void;
}

export const SelectCurrencyFrom: React.FC<Props> = ({
  isOpen,
  state,
  onChangeSendMixerCurrency,
  onClose,
}) => {
  const [search, setSearch] = useState("");

  const debounceSearch = useDebounce(search, 200);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSelect = (token: Token) => {
    onChangeSendMixerCurrency(
      token.ticker,
      token.network,
      token.name,
      token.image
    );
    onCloseModal();
  };

  const onCloseModal = () => {
    setSearch("");
    onClose();
  };

  const tokens = useMemo(() => {
    const list = list_tokens.filter((item) =>
      item.name.toLowerCase().includes(debounceSearch.toLowerCase())
    );

    if (list.length) {
      return list.map((item) => (
        <Card
          overflow="hidden"
          variant="outline"
          className={`w-full mb-4 bg-dark-secondary cursor-pointer ${
            state.currency === item.name &&
            "border-none bg-pink-light shadow-sunny"
          } hover:border-none hover:bg-pink-light hover:shadow-sunny`}
          key={item.legacyTicker}
          onClick={() => onSelect(item)}
        >
          <CardBody className="flex items-center px-0 py-2">
            <div className="w-1/12 ml-2">
              <Image
                src={item.image}
                alt={item.name}
                width={35}
                height={35}
                className="object-contain"
              />
            </div>

            <div className="w-3/4 flex flex-col text-white ml-3">
              <div className="font-bold">{item.ticker.toUpperCase()}</div>
              <div className="">{item.name}</div>
            </div>
          </CardBody>
        </Card>
      ));
    }

    return (
      <div className="mb-4 text-white font-bold text-lg">
        No matches were found for your query
      </div>
    );
  }, [debounceSearch, onChangeSendMixerCurrency]);

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal} size={"sm"}>
      <ModalOverlay />
      <ModalContent className="bg-dark-fade">
        <ModalHeader>
          Select a currency {"(from)"}
          <InputGroup className="mt-6   ">
            <InputLeftElement pointerEvents="none">
              <SearchOutlined />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Type a currency"
              onChange={onChangeSearch}
            />
          </InputGroup>
        </ModalHeader>
        <ModalCloseButton className="text-red-500 font-bold" />
        <ModalBody className="max-h-80 overflow-auto">{tokens}</ModalBody>

        {/* <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
};
