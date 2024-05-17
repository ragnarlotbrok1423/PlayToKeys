import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemUploadPage } from './item-upload.page';

describe('ItemUploadPage', () => {
  let component: ItemUploadPage;
  let fixture: ComponentFixture<ItemUploadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemUploadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
