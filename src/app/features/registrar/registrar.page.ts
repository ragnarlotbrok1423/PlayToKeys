import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {AuthService} from "../../common/services/auth.service";
import {
  IonContent,
  IonHeader, IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Textbox1Component } from '../Components/textbox-1/textbox-1.component';
import { ButtonComponent } from '../Components/button/button.component';
import { CuadradoComponent } from '../Components/cuadrado/cuadrado.component';


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
    private authService: AuthService,
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

      ]],
      zipCode:['',[Validators.required]]
    });
  }

  async onSubmit() {
    try {
      const auth:Auth = getAuth();
      console.log('Form validity:', this.form.valid);
      console.log('Nombre errors:', this.form.get('nombre').errors);
      console.log('Apellido errors:', this.form.get('apellido').errors);
      console.log('ZipCode errors:', this.form.get('zipCode').errors);
      console.log('Email errors:', this.form.get('email').errors);
      console.log('Password errors:', this.form.get('password').errors);
      console.log(this.form.valid)
      const email = this.form.get('email').value;
      const password = this.form.get('password').value;
      const nombre = this.form.get('nombre').value;
      const apellido = this.form.get('apellido').value;
      const codigoPostal = this.form.get('zipCode').value;

      const registerCredentials = await createUserWithEmailAndPassword(auth,email, password);
      const userId= registerCredentials.user.uid
      const location = await this.authService.getLocation();
      console.log('User location:', location);

      await this.SetFirestore(userId, nombre, apellido, codigoPostal, location);
      this.router.navigate(['/loggin'])
    } catch (error) {
      console.error('Error registering user:', error);
    }
  }
  async SetFirestore(userId:string, nombre:string, apellido:string, codigoPostal:number, location: GeolocationPosition, permiso:number=0 ){
    try {
      const fire= getFirestore()
      console.log('Firestore instance:', fire);
      const userDocRef=  doc(fire,'users',userId)
      console.log('User document reference:', userDocRef);
      await setDoc(userDocRef,{
        nombre,
        apellido,
        codigoPostal,
        permiso,
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        }
      }).catch((error) => {console.log(error)});

      console.log('User data successfully written to Firestore');
    } catch (error) {
      console.error('Error writing user data to Firestore:', error);
    }

  }
  ngOnInit() {return 0}
}
