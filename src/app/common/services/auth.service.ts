import { Inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
} from 'firebase/firestore';

import { environment } from 'src/environments/environment';
import { Firestore } from '@angular/fire/firestore';

import { UserI } from '../models/user.interface';
import { User } from 'firebase/auth';
import { FirebaseService } from './firebase.service';
// Initialize Firebase
const app = initializeApp(environment.firebase);
const firestore = getFirestore(app);

@Injectable({
  providedIn: 'root',
  // Marking AuthService as standalone
  // Use the imported auth directly
})
export class AuthService {
  auth: Auth;
  firestore: Firestore;
  authenticated: boolean = false;
  userDetails: User | null = null;

  constructor(private firebaseService: FirebaseService) {
    this.auth = getAuth(app);
    this.firestore = firestore;
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.userDetails = user;
        this.authenticated = true;
      } else {
        this.userDetails = null;
        this.authenticated = false;
      }
    });
  }

  getLocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  }

  get currentUserId(): string {
    return this.authenticated ? this.userDetails?.uid : '';
  }

  registrar(
    email: string,
    password: string,
    nombre: string,
    apellido: string,
    codigoPostal: number
  ) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // User successfully registered
        console.log('User registered:', userCredential);
        const uid = userCredential.user.uid;

        const userData: UserI = {
          uid: uid,
          nombre: nombre,
          apellido: apellido,
          codigoPostal: codigoPostal,
        };

        const userRef = doc(collection(firestore, 'users'), uid);

        // Save additional user data in Firestore
        return setDoc(userRef, userData)
          .then(() => userCredential)
          .catch((error) => {
            // Error occurred while writing data to Firestore
            console.error('Error writing user data to Firestore:', error);
            throw error;
          });
      })
      .catch((error) => {
        // Error occurred while registering user
        console.error('Error registering user:', error);
        throw error;
      });
  }

  async logIn(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }
  async logout() {
    return this.auth.signOut();
  }
}
