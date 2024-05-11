import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';

import {IonHeader,IonToolbar,IonTitle, IonContent, IonCard, IonCardContent,IonCardHeader,
  IonCardSubtitle,IonCardTitle, IonButton, IonFab, IonFabButton, IonFabList, IonCol, IonRow, IonGrid} from '@ionic/angular/standalone';

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
      ]
})


export class CarritoPage implements OnInit {

  constructor(private alertController: AlertController) { }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Borra el producto ',
      message: 'Si se Borra Se quitara del carrito ',
      buttons: ['sí', 'No']
    });

    await alert.present();
  }

  comprar() {
    // Agrega aquí la lógica para comprar el producto
    console.log('Producto comprado');
  }

  Menu() {
    // Agrega aquí la lógica para ir al menu
    console.log('ir al menu');
  }
  

  ngOnInit() {
    
    // Aquí puedes inicializar datos o realizar otras tareas cuando se carga el componente
  }
}
  
