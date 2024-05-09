import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Textbox1Component } from '../Components/textbox-1/textbox-1.component';
import { ButtonComponent } from '../Components/button/button.component';
import { CuadradoComponent } from '../Components/cuadrado/cuadrado.component';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    Textbox1Component,
    ButtonComponent,
    CuadradoComponent,
  ],
})
export class RegistrarPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
