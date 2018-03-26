import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatFormField, MatSelect, MatDatepicker, MatDatepickerInput } from '@angular/material';

import { ApiService } from '../services/api.service';
import { BitcoinPricePayload } from '../model/bitcoin-price-payload';

const CRYPTO_ROUND = 1000000000;
const WALLET_ADDRESS = '1HhGaef4KbQVmY6rtTVSyrUwR6deRq1UCm';
@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  accountNumberInput = '1234567';
  usdAmountInput = new FormControl(0);
  cryptoAmountInput = new FormControl(0);
  bitcoinPrice: number;
  chosenPaymentType: string;
  firstNameInput = '';
  lastNameInput = '';
  message = '';
  qrCodeString = 'QR not generated';
  qrCodeHidden = true;
  qrDisabled = true;

  paymentTypes = ['Credit/Debit', 'Bitcoin', 'Magic Beans'];

  constructor(private formBuilder: FormBuilder,
    private api: ApiService) {
    this.chosenPaymentType = this.paymentTypes[0];
  }

  ngOnInit() {
    this.api.cryptos[0].price.subscribe(price => {
      this.bitcoinPrice = price;
    });

    this.usdAmountInput.valueChanges.subscribe(val => {
      this.setCryptoOnUSDChange(val);
    });
  }

  sendBitcoin(): void {
    // Get most recent bitcoin price, convert USD to amount of bitcoin,
    // and make payment based off that.
    this.message = 'Bitcoin sent';
  }

  generateQrCode(): void {
    if (this.usdAmountInput.value !== '') {
      if (this.nameAndAccountNumberMatch()) {
        // Instead of using first/last name and account number IN the bitcoin transaction, use them to
        // generate a one-time code for the payment based off that information so that it isn't viewable
        // in the blockchain

        // Label is going to be hashed account info
        this.qrCodeString = 'bitcoin:' + WALLET_ADDRESS + '?amount=' + this.cryptoAmountInput.value
          + '&label=' + this.accountNumberInput + '&message=' +
          btoa(this.firstNameInput + '_' + this.lastNameInput + '_' + this.accountNumberInput);

          this.qrCodeHidden = false;
      } else {
        this.qrCodeHidden = true;
      }
    }
  }

  nameAndAccountNumberMatch(): boolean {
    // Check that name/account number match so that payment can be attributed to user
    //    OR: generate fields based off sign-on and account confirmation on previous screen
    return true;
  }

  setCryptoOnUSDChange(val: number): void {
    this.cryptoAmountInput.setValue(Math.round((this.usdAmountInput.value / this.bitcoinPrice) * CRYPTO_ROUND) / CRYPTO_ROUND);
  }
}
