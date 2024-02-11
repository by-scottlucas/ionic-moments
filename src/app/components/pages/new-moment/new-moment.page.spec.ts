import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewMomentPage } from './new-moment.page';

describe('NewMomentPage', () => {
  let component: NewMomentPage;
  let fixture: ComponentFixture<NewMomentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewMomentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
