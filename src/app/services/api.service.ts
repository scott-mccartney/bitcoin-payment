import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {

  coinMarketCapApi = 'https://api.coinmarketcap.com/v1/ticker/';
  geminiSandboxApi = 'https://api.sandbox.gemini.com/';
  headers: Headers;
  cryptoNames = ['Bitcoin', 'Ethereum', 'Litecoin', 'Nano'];
  cryptos = [{
    'crypto': this.cryptoNames[0],
    'price': new EventEmitter<string>()
  }, {
    'crypto': this.cryptoNames[1],
    'price': new EventEmitter<string>()
  }, {
    'crypto': this.cryptoNames[2],
    'price': new EventEmitter<string>()
  }, {
    'crypto': this.cryptoNames[3],
    'price': new EventEmitter<string>()
  }];

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Accept', 'application/json');
  }

  public getCryptoPricesPerUSD(): void {
    this.http.get(this.coinMarketCapApi,
      { headers: this.headers }).subscribe(res => {
        const pricesJSON = res.json();

        for (const crypto of pricesJSON) {
          if (this.cryptoNames.indexOf(crypto['name']) !== -1) {
            this.cryptos[this.cryptoNames.indexOf(crypto['name'])]['price'].emit(crypto['price_usd']);
          }
        }
      });
  }
}
