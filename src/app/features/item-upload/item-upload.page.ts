import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { FirebaseService } from 'src/app/common/services/firebase.service';
import { Key } from 'src/app/common/models/key.interface';

@Component({
  selector: 'app-item-upload',
  templateUrl: './item-upload.page.html',
  styleUrls: ['./item-upload.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterLink,
  ],
})
export class ItemUploadPage implements OnInit {
  public nombre: string;
  public descripcion: string;
  public tags: string;
  public developer: string;
  public precio: number;
  public clave: string;
  public imagen: string;

  constructor(private firebase: FirebaseService) {}

  async UploadKey() {
    try {
      const key: Key = {
        name: this.nombre,
        description: this.descripcion,
        category: this.tags,
        price: this.precio,
        developerName: this.developer,
        key: this.clave,
        image: this.imagen,
      };
      await this.firebase.createKey(key);
    } catch (error) {
      console.error('Error creating key:', error);
    }
  }

  ngOnInit() {
    return 0;
  }
}
