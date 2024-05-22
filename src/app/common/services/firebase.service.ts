import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  getDocs,
  query,
  where,
  DocumentData,
  CollectionReference,
  getFirestore,
} from '@angular/fire/firestore';
import { Key } from '../models/key.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private keyCollection: CollectionReference<DocumentData>;
  constructor(private firestore: Firestore) {
    this.keyCollection = collection(this.firestore, 'keys');
  }

  createKey(key: Key) {
    const fire = getFirestore();
    const keyRef = collection(fire, 'keys');
    return addDoc(keyRef, key);
  }

  getKeys(): Observable<Key[]> {
    const keyRef = collection(this.firestore, 'keys');
    return collectionData(query(keyRef)) as Observable<Key[]>;
  }

  getKeysByCategory(filter = '') {
    const keysRef = collection(this.firestore, 'keys');
    let q = query(keysRef);
    if (filter) {
      q = query(keysRef, where('category', '==', filter));
    }
    return collectionData(q);
  }

  async KeyLength() {
    const keysRef = collection(this.firestore, 'keys');
    const snapshot = await getDocs(keysRef);
    return snapshot.docs.length;
  }
}
