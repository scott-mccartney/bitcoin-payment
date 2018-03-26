import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QRCodeModule } from 'angularx-qrcode';

import { AppComponent } from './app.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { CryptoPricesComponent } from './crypto-prices/crypto-prices.component';
import { ApiService } from './services/api.service';

@NgModule({
  declarations: [
    AppComponent,
    PaymentFormComponent,
    CryptoPricesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    QRCodeModule
  ],
  providers: [ApiService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
