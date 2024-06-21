import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Firestore, collection, doc, getDoc } from '@angular/fire/firestore';
import { collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Key } from 'src/app/common/models/key.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/common/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: true,
})
export class UserProfileComponent implements OnInit {
  userName: string;
  lastName: string;
  constructor(
    private firestore: Firestore,
    private auth: AuthService,
    private router: Router
  ) {}

  async LogOut() {
    try {
      await this.auth.logout();
      localStorage.clear();
      this.router.navigate(['/loggin']); // Redirigir a la página de inicio de sesión
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }
  async ngOnInit() {
    initFlowbite();
    const userId = localStorage.getItem('userUID');
    if (userId) {
      const userDoc = doc(this.firestore, 'users', userId);
      const userSnapshot = await getDoc(userDoc);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        if (userData) {
          this.userName = userData['nombre'];
          this.lastName = userData['apellido'];
        }
      }
    }
  }
}
