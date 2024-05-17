  import { Component, OnInit } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { FormsModule } from '@angular/forms';
  import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

  @Component({
    selector: 'app-metodopago',
    templateUrl: './metodopago.page.html',
    styleUrls: ['./metodopago.page.scss'],
    standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
  })

  export class MetodopagoPage implements OnInit {
    showForm1: boolean = false;
    showForm2: boolean = false;
  
    isHeaderClicked1: boolean = false;
    isHeaderClicked2: boolean = false;
  
    cardNumber: string = '';
    expirationDate: string = '';
    cvv: string = '';
    cardHolder: string = '';
  
    paypalEmail: string = '';
    paypalPassword: string = '';
  
    constructor() {}
  
    togglePaymentForm1() {
      this.isHeaderClicked1 = !this.isHeaderClicked1;
      this.showForm1 = this.isHeaderClicked1;
      this.isHeaderClicked2 = false;
      this.showForm2 = false;
    }
  
    togglePaymentForm2() {
      this.isHeaderClicked2 = !this.isHeaderClicked2;
      this.showForm2 = this.isHeaderClicked2;
      this.isHeaderClicked1 = false;
      this.showForm1 = false;
    }
  
    confirmPayment1() {
      // Lógica para confirmar el pago con tarjeta
      console.log('Confirmar pago con tarjeta');
    }
  
    confirmPayment2() {
      // Lógica para confirmar el pago con Paypal
      console.log('Confirmar pago con Paypal');
    }
  


    ngOnInit() {
    }

  }
