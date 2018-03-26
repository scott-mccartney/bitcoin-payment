import { Component, OnInit } from '@angular/core';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-crypto-prices',
  templateUrl: './crypto-prices.component.html',
  styleUrls: ['./crypto-prices.component.css']
})
export class CryptoPricesComponent implements OnInit {
  cryptoNames = ['Bitcoin', 'Ethereum', 'Litecoin', 'Nano'];
  cryptoPrices = [{
    'crypto': this.cryptoNames[0],
    'price': -1,
    'ico': '../../assets/icons/bitcoin_avatar.png'
  }, {
    'crypto': this.cryptoNames[1],
    'price': -1,
    'ico': '../../assets/icons/ethereum_avatar.png'
  }, {
    'crypto': this.cryptoNames[2],
    'price': -1,
    'ico': '../../assets/icons/litecoin_avatar.png'
  }, {
    'crypto': this.cryptoNames[3],
    'price': -1,
    'ico': '../../assets/icons/nano_avatar.png'
  }];

  constructor(private api: ApiService) {
    this.api.cryptos[0].price.subscribe(price => {
      this.cryptoPrices[0].price = price;
    });
    this.api.cryptos[1].price.subscribe(price => {
      this.cryptoPrices[1].price = price;
    });
    this.api.cryptos[2].price.subscribe(price => {
      this.cryptoPrices[2].price = price;
    });
    this.api.cryptos[3].price.subscribe(price => {
      this.cryptoPrices[3].price = price;
    });
    this.api.getCryptoPricesPerUSD();
  }

  ngOnInit() {

  }
}
