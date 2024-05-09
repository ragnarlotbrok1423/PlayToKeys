import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-textbox-1',
  templateUrl: './textbox-1.component.html',
  styleUrls: ['./textbox-1.component.scss'],
  standalone: true,
})
export class Textbox1Component  implements OnInit {
onInputChange(arg0: any) {
throw new Error('Method not implemented.');
}
textValue: any;

  constructor() { }

  ngOnInit() {}

}
