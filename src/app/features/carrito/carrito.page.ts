import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from 'src/app/common/services/firebase.service';
import { Key } from 'src/app/common/models/key.interface';
import { doc, getDoc, Firestore } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
  IonFab,
  IonFabButton,
  IonFabList,
  IonCol,
  IonRow,
  IonGrid,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: 'carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonContent,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonButton,
    IonFabButton,
    IonFab,
    IonFabList,
    IonCol,
    IonRow,
    IonGrid,
    RouterLink,
  ],
})
export class CarritoPage implements OnInit {
  carItemIds: string[] = [];
  carItems: (Key & { id: string })[] = []; // Combina Key con el id
  totalPrice: number = 0;
  constructor(
    private alertController: AlertController,
    private carService: FirebaseService,
    private firestore: Firestore
  ) {}

  async presentAlert(itemId: string) {
    const alert = await this.alertController.create({
      header: 'Borra el producto',
      message: 'Si se borra, se quitará del carrito',
      buttons: [
        {
          text: 'Sí',
          handler: () => {
            this.removeFromCart(itemId);
          },
        },
        'No',
      ],
    });
    await alert.present();
  }

  removeFromCart(itemId: string) {
    this.carService.removeShopyCar(itemId);
    this.loadItems(); // Carga de nuevo los elementos para actualizar la lista y el precio total
  }

  comprar() {
    console.log('Producto comprado');
  }

  ngOnInit() {
    this.carService.getShopyCar().subscribe((itemIds) => {
      this.carItemIds = itemIds;
      this.loadItems();
    });
  }

  async loadItems() {
    this.carItems = [];
    this.totalPrice = 0; // Asegúrate de que totalPrice se inicializa a 0 cada vez que se llama loadItems
    for (const id of this.carItemIds) {
      const keyDocRef = doc(this.carService.keyCollection, id);
      const keyDocSnap = await getDoc(keyDocRef);
      if (keyDocSnap.exists()) {
        const keyData = keyDocSnap.data() as Key;
        this.carItems.push({ id: keyDocSnap.id, ...keyData });
        if (keyData.price) {
          const price = parseFloat(keyData.price as any);
          if (!isNaN(price)) {
            this.totalPrice += price;
            console.log('Price added:', price, 'Total:', this.totalPrice);
          } else {
            console.error('Invalid price for item:', keyData);
          }
        } else {
          console.log('No price found for item:', keyData);
        }
        // Suma el precio de cada artículo
      }
    }
    console.log('Total Price:', this.totalPrice);
  }
}
