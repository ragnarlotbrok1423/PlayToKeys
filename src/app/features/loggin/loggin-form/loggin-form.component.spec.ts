import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LogginFormComponent } from './loggin-form.component';

describe('LogginFormComponent', () => {
  let component: LogginFormComponent;
  let fixture: ComponentFixture<LogginFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LogginFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LogginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
