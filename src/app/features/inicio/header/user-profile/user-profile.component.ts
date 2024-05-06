import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: true,
})
export class UserProfileComponent  implements OnInit {

  constructor() { }

  ngOnInit() {
    initFlowbite();
  }

}
