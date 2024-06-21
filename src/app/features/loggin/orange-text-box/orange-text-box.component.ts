import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-orange-text-box',
  templateUrl: './orange-text-box.component.html',
  styleUrls: ['./orange-text-box.component.scss'],

})
export class OrangeTextBoxComponent  implements OnInit {
  @Input() type: string;

  constructor() {

  }

  ngOnInit() {return 0}

}
