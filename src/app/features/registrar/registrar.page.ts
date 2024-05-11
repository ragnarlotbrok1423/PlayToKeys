import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader, IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Textbox1Component } from '../Components/textbox-1/textbox-1.component';
import { ButtonComponent } from '../Components/button/button.component';
import { CuadradoComponent } from '../Components/cuadrado/cuadrado.component';
import { AuthService } from '../../common/services/auth.service';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import {Router} from '@angular/router';

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
    ReactiveFormsModule,
    AngularFireAuthModule,
    IonIcon,

  ],

})
export class RegistrarPage implements OnInit {
  form: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private auth: AuthService,
    public router: Router
  ) {
    this.form = this.formBuilder.group({
      nombre:['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(
          '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')
        ]],

      password:['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9!@#$%^&*_=+-]{8,12}$/g),
      ]],
      zipCode:['',[Validators.required]]
    });
  }

  onSubmit() {
    console.log('Form validity:', this.form.valid);
    console.log('Nombre errors:', this.form.get('nombre').errors);
    console.log('Apellido errors:', this.form.get('apellido').errors);
    console.log('ZipCode errors:', this.form.get('zipCode').errors);
    console.log('Email errors:', this.form.get('email').errors);
    console.log('Password errors:', this.form.get('password').errors);
    console.log(this.form.valid)
    if (this.form.valid){

      const email = this.form.get('email').value;
      const password = this.form.get('password').value;

      this.auth.registrar(email, password)
        .then(() => {
            this.router.navigate(['/loggin']);
        })
        .catch((error) => {
            console.log("No funciona papa"+error);
        });
    }
  }
  ngOnInit() {return 0}
}
