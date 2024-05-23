import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonButton,
} from '@ionic/angular/standalone';
import { FirebaseService } from 'src/app/common/services/firebase.service';
import { doc, setDoc, Firestore, collection } from '@angular/fire/firestore';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-metodopago',
  templateUrl: './metodopago.page.html',
  styleUrls: ['./metodopago.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonLabel,
    RouterLink,
  ],
})
export class MetodopagoPage implements OnInit {
  public numTarjeta: string = '';
  public fechaExpiracion: string = '';
  public cvv: string = '';
  public propietario: string = '';

  constructor(
    private firestore: Firestore,
    private firebaseService: FirebaseService
  ) {}

  async confirmPayment() {
    if (this.validateCardPayment()) {
      console.log('Confirmar pago con tarjeta');
      await this.saveOrder();
      this.clearShoppingCart();
    } else {
      console.error('Por favor complete todos los campos de la tarjeta.');
    }
  }

  validateCardPayment(): boolean {
    return (
      this.numTarjeta.trim() !== '' &&
      this.fechaExpiracion.trim() !== '' &&
      this.cvv.trim() !== '' &&
      this.propietario.trim() !== ''
    );
  }

  async saveOrder() {
    const uid = localStorage.getItem('userUID');
    const cart = JSON.parse(localStorage.getItem('shopping_cart') || '[]');

    if (!uid) {
      console.error('User not logged in');
      return;
    }

    const orderData = {
      uid: uid,
      items: cart,
      timestamp: new Date().toISOString(),
    };

    try {
      const orderCollection = collection(this.firestore, 'shopping_cart');
      await setDoc(doc(orderCollection), orderData);
      console.log('Order saved successfully');
    } catch (error) {
      console.error('Error saving order:', error);
    }
  }
  clearShoppingCart() {
    localStorage.setItem('shopping_cart', JSON.stringify([]));
    console.log('Shopping cart cleared');
  }

  ngOnInit() {}
}
