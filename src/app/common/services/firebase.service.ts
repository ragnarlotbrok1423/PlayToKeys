import { Injectable } from '@angular/core';
import {Firestore, addDoc, query, getDocs, where} from '@angular/fire/firestore';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Key} from'../models/key.interface';
import {collection, collectionData} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: Firestore, private storage:AngularFireStorage) { }
  //aqui se agregan las funciones para realizar get y post desde firestore

  //funcion para agregar una llave
  createKey(key:Key){
    const keyRef= collection(this.firestore,'keys');
    return addDoc(keyRef,key)
  }

  //funcion para obtener las keys
  getKeys() {
    const keysRef = collection(this.firestore, 'keys');
    let q= query(keysRef);
    return getDocs(q).then(querySnapshot => {
      const keys = querySnapshot.docs.map(doc => doc.data());
      return keys;
    });
  }
  getKeysByCategory(filter=''){
    const keysRef = collection(this.firestore, 'keys');
    let q= query(keysRef);
    if(filter){
      q=query(keysRef, where ('category','==',filter))
    }
    return collectionData(q);

  }
}

