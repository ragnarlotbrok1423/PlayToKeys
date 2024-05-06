import { Component, OnInit} from '@angular/core';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { CategoryComponent } from './category/category.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [SearchBarComponent, CategoryComponent, UserProfileComponent]
})
export class HeaderComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
