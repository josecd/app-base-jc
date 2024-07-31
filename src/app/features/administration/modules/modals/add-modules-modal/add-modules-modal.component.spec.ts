import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModulesModalComponent } from './add-modules-modal.component';

describe('AddModulesModalComponent', () => {
  let component: AddModulesModalComponent;
  let fixture: ComponentFixture<AddModulesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddModulesModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddModulesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
