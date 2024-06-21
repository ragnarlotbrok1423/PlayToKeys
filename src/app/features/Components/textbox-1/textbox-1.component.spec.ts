import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Textbox1Component } from './textbox-1.component';
import { FormsModule } from '@angular/forms';

describe('Textbox1Component', () => {
  let component: Textbox1Component;
  let fixture: ComponentFixture<Textbox1Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [Textbox1Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Textbox1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
