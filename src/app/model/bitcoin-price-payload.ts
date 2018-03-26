export class BitcoinPricePayload {
  bpi: Array<Currency>;
  chartName: string;
  disclaimer: string;
  time: {};
}

export class Currency {
  code: string;
  description: string;
  rate: string;
  rate_float: number;
  symbol: string;
}
