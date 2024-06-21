import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonApp,
} from '@ionic/angular/standalone';
import { FormBuilder,ReactiveFormsModule,FormGroup} from "@angular/forms";
import {Validators} from "@angular/forms";
import{Auth, signInWithEmailAndPassword} from '@angular/fire/auth';
import{getAuth} from 'firebase/auth';

import {Router} from '@angular/router';
import {AuthService} from "../../common/services/auth.service";


@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.page.html',
  styleUrls: ['./loggin.page.scss'],
  standalone: true,
  imports: [
    IonApp,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
   ReactiveFormsModule

  ],
})
export class LogginPage implements OnInit {
  form:FormGroup
  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    public router: Router
  ) {
    this.form = this.formBuilder.group({

      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(
          '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')
      ]],

      password:['', [
        Validators.required,

      ]],

    });
  }
  async OnSubmit(){
    try {
      const auth:Auth=getAuth();
      const email= this.form.get('email').value;
      const password= this.form.get('password').value;
      if (this.form?.valid){
        const userRef= await signInWithEmailAndPassword(auth,email,password);
        const useruid= userRef.user.uid;
        localStorage.setItem('userUID',useruid)

        this.router.navigate(['/inicio'])
      }
    }catch (e){
      console.error(e)
    }


  }
  ngOnInit() {return 0}
}
