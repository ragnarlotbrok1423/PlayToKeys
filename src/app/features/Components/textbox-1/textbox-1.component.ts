import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-textbox-1',
  templateUrl: './textbox-1.component.html',
  styleUrls: ['./textbox-1.component.scss'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Textbox1Component),
      multi: true
    }
  ]
})
export class Textbox1Component  implements OnInit, ControlValueAccessor {
  textValue: any;

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};


  constructor() { }

  ngOnInit() {return 0}

  writeValue(value: any): void {
    this.textValue = value;
  }
  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onInputChange(value: any): void {
    this.textValue = value;
    this.onChange(value);
    this.onTouched();
  }
}
