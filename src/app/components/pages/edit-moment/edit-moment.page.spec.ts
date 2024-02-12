import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditMomentPage } from './edit-moment.page';

describe('EditMomentPage', () => {
  let component: EditMomentPage;
  let fixture: ComponentFixture<EditMomentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditMomentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
