import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  query,
  where,
  CollectionReference,
  DocumentData,
} from '@angular/fire/firestore';
import { Key } from '../models/key.interface';
import { Observable, BehaviorSubject } from 'rxjs';
import { shopping_cart } from '../models/shopyCart';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  public keyCollection: CollectionReference<DocumentData>;
  public shoppingCartCollection: CollectionReference<DocumentData>;
  public shopyCar = new BehaviorSubject<string[]>([]);

  constructor(private firestore: Firestore) {
    this.keyCollection = collection(this.firestore, 'keys');
    this.loadCartFromLocalStorage();
    this.shoppingCartCollection = collection(
      this.firestore,
      'shopping_cart'
    ) as CollectionReference<shopping_cart>;
  }

  createKey(key: Key) {
    return addDoc(this.keyCollection, key);
  }

  getKeys(): Observable<Key[]> {
    const keyRef = collection(this.firestore, 'keys');
    return collectionData(query(keyRef)) as Observable<Key[]>;
  }

  getKeysByCategory(filter = ''): Observable<Key[]> {
    let q = query(this.keyCollection);
    if (filter) {
      q = query(this.keyCollection, where('category', '==', filter));
    }
    return collectionData(q) as Observable<Key[]>;
  }

  getShopyCar(): Observable<string[]> {
    return this.shopyCar.asObservable();
  }

  addShopyCar(itemId: string) {
    const currentItems = this.shopyCar.getValue();
    const updatedItems = [...currentItems, itemId];
    this.shopyCar.next(updatedItems);
    this.saveCartToLocalStorage(updatedItems);
  }

  removeShopyCar(itemId: string) {
    const currentItems = this.shopyCar.getValue();
    const updatedItems = currentItems.filter((id) => id !== itemId);
    this.shopyCar.next(updatedItems);
    this.saveCartToLocalStorage(updatedItems);
  }

  private saveCartToLocalStorage(cart: string[]) {
    localStorage.setItem('shopping_cart', JSON.stringify(cart));
  }

  private loadCartFromLocalStorage() {
    const cart = localStorage.getItem('shopping_cart');
    if (cart) {
      this.shopyCar.next(JSON.parse(cart));
    }
  }
  ShopingCartUpload(save: shopping_cart) {
    return addDoc(this.shoppingCartCollection, save);
  }
}
