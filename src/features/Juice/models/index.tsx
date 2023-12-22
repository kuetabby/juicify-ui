export enum MixerType {
  FLOAT = "standard",
  FIXED = "fixed-rate",
}

export interface MixerState {
  currency: string;
  name: string;
  amount: string;
  network: string;
  imageUrl: string;
}

export interface Token {
  ticker: string;
  name: string;
  image: string;
  hasExternalId: boolean;
  isFiat: boolean;
  featured: boolean;
  isStable: boolean;
  supportsFixedRate: boolean;
  network: string;
  tokenContract: any;
  buy: boolean;
  sell: boolean;
  legacyTicker: string;
}

export interface EstimateExchange {
  fromCurrency: string;
  toCurrency: string;
  fromAmount: string;
  toAmount: string;
  fromNetwork: string;
  toNetwork: string;
  flowType: MixerType;
}

export interface AddressValidationParams {
  network: string;
  address: string;
}

export interface CreateExchangeDto {
  fromCurrency: string;
  fromNetwork: string;
  toCurrency: string;
  toNetwork: string;
  fromAmount: string;
  toAmount: string;
  address: string;
  flow: string;
  type: string;
  rateId: string;
}
