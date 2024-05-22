import { Component, OnInit } from '@angular/core';
import { collection } from '@angular/fire/firestore';
import { Key } from 'src/app/common/models/key.interface';
import { CommonModule } from '@angular/common';
import { Firestore } from '@angular/fire/firestore';
import { FirebaseService } from 'src/app/common/services/firebase.service';
import { inject } from '@angular/core';
import { collectionData } from 'rxfire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-key-card',
  templateUrl: './key-card.component.html',
  styleUrls: ['./key-card.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class KeyCardComponent implements OnInit {
  keys: Observable<Key[]>;
  constructor(
    private fireService: FirebaseService,
    private firestore: Firestore
  ) {
    const keyRef = collection(this.firestore, 'keys');
    this.keys = collectionData(keyRef) as Observable<Key[]>;
  }

  ngOnInit() {}
}
