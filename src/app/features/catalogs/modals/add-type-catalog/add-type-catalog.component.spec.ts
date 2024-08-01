import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeCatalogComponent } from './add-type-catalog.component';

describe('AddTypeCatalogComponent', () => {
  let component: AddTypeCatalogComponent;
  let fixture: ComponentFixture<AddTypeCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTypeCatalogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTypeCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
