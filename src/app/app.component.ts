import { Component } from '@angular/core';
import { PaymentFormComponent } from './payment-form/payment-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Test Bitcoin Web Application';
  message = '';

  sendBitcoin(): void {
    this.message = 'Bitcoin sent';
  }
}
