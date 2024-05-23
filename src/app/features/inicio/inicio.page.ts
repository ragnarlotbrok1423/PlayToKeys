import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { HeaderComponent } from './header/header.component';
import { KeyCardComponent } from './key-card/key-card.component';
import { OrangeButtonComponent } from './orange-button/orange-button.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    HeaderComponent,
    KeyCardComponent,
    OrangeButtonComponent,
    RouterLink,
  ],
})
export class InicioPage implements OnInit {
  constructor() {}

  async ngOnInit() {}
}
