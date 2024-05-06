import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    selector: 'app-loggin-form',
    templateUrl: './loggin-form.component.html',
    styleUrls: ['./loggin-form.component.scss'],
    standalone: true,
    imports: [SharedModule]
})
export class LogginFormComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
