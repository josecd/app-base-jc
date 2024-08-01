import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCatagsComponent } from './list-catags.component';

describe('ListCatagsComponent', () => {
  let component: ListCatagsComponent;
  let fixture: ComponentFixture<ListCatagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCatagsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCatagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
