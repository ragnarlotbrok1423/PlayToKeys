import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { environment } from 'src/environments/environment';

// Initialize Firebase
const app = initializeApp(environment.firebase);


@Injectable({
  providedIn: 'root',
  // Marking AuthService as standalone
  // Use the imported auth directly


})
export class AuthService {
  auth:Auth;
  constructor() {
    this.auth = getAuth(app);
  }

   registrar(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
}
