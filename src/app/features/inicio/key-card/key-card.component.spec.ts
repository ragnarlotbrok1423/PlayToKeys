import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { KeyCardComponent } from './key-card.component';

describe('KeyCardComponent', () => {
  let component: KeyCardComponent;
  let fixture: ComponentFixture<KeyCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [KeyCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KeyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
