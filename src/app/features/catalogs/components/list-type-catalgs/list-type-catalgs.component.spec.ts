import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTypeCatalgsComponent } from './list-type-catalgs.component';

describe('ListTypeCatalgsComponent', () => {
  let component: ListTypeCatalgsComponent;
  let fixture: ComponentFixture<ListTypeCatalgsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTypeCatalgsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTypeCatalgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
