import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonApp } from '@ionic/angular/standalone';
import { LogginFormComponent } from './loggin-form/loggin-form.component';
@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.page.html',
  styleUrls: ['./loggin.page.scss'],
  standalone: true,
  imports: [IonApp, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, LogginFormComponent]
})
export class LogginPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
